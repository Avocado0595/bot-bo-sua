import { UserModel } from '../models/userModel.js';
import randomRange from '../helpers/randomRange.js';
import roundDouble from '../helpers/roundDouble.js';
import config from '../config/config.js';
export const getUser = async (userId) => {
	const result = await UserModel.findOne({ userId });
	return result;
};

export const addUser = async (user) => {
	const newUser = new UserModel(user);
	newUser.save();
};

export const updateUser = async (id, updateUser) => {
	await UserModel.findByIdAndUpdate({ _id: id }, updateUser, { new: true });
};

export const getTopNUser = async (userId, page, client) => {
	const userPerPage = 10;
	const sortedUserList = await UserModel.find().sort({ totalMilk: -1 });
	const totalPage = Math.round(sortedUserList.length / userPerPage);
	const n = page > totalPage ? totalPage : page;
	const userRank = await getUserRank(userId, sortedUserList);
	const statRank = sortedUserList.slice((n - 1)*userPerPage,n*userPerPage);
	let statBoard = '';
	let fetchList = [];
	for (let i = 0; i < statRank.length; i++) {
		fetchList.push(
			client.users.fetch(statRank[i].userId).catch(console.error)
		);
	}
	const statList = await Promise.all(fetchList);
	for (let i = 0; i < statList.length; i++) {
		statBoard += `${(n - 1) * userPerPage + i + 1}. ${statList[i].tag} - ${
			statRank[i].totalMilk
		} lít sữa\n`;
	}
	return { statBoard, userRank, totalPage };
};

export const getUserRank = async (userId, sortedUserList) => {
	for (let i = 0; i < sortedUserList.length; i++) {
		if (userId === sortedUserList[i].userId) {
			return i + 1;
		}
	}
	return sortedUserList.length;
};
export const getTotalMilk = async (user) => {
	let total = 0;
	if (user) {
		const { milkTank } = user;
		milkTank.forEach((element) => {
			total += element.milk;
		});
	}
	return roundDouble(total);
};
export const getTotalMilkByDay = async (user, date) => {
	let total = 0;
	if (user) {
		const { milkTank } = user;
		milkTank.forEach((element) => {
			if (
				new Date(element.takingTime).getDay() ==
					new Date(date).getDay() &&
				new Date(element.takingTime).getMonth() ==
					new Date(date).getMonth() &&
				new Date(element.takingTime).getFullYear() ==
					new Date(date).getFullYear()
			)
				total += element.milk;
		});
	}
	return roundDouble(total);
};

export const decStrength = async (user) => {
	const diffTime = new Date() - user.cow.lastFeedingTime,
		diffHour = Math.abs(Math.ceil(diffTime / 1000)) / 3600,
		strangeDec = user.cow.strength - diffHour * config.decStrengthVal,
		newStrength = strangeDec >= 0 ? roundDouble(strangeDec) : 0;
	await UserModel.findByIdAndUpdate(
		user._id,
		{ $set: { 'cow.strength': newStrength } },
		{ new: true }
	);
	return roundDouble(newStrength);
};

export const incStrength = async (user) => {
	const randNew = roundDouble(
			user.cow.strength +
				randomRange(config.incStrengthMax, config.incStrengthMin)
		),
		newStrength = randNew <= 100 ? randNew : 100,
		updatedCow = {
			...user.cow,
			strength: newStrength,
			lastFeedingTime: new Date(),
		};
	await UserModel.findByIdAndUpdate(
		user._id,
		{
			$set: {
				'cow.strength': updatedCow.strength,
				'cow.lastFeedingTime': new Date(),
			},
		},
		{ new: true }
	);
	return roundDouble(newStrength);
};
