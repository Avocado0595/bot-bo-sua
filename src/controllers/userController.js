import { UserModel } from '../models/userModel.js';
import settings from '../settings/settings.js';
export const getUser = async (userId) => {
	const result = await UserModel.findOne({ userId });
	return result;
};

export const addUser = async (user) => {
	const newUser = new UserModel(user);
	newUser.save();
};

export const updateUser = async ( id, updateUser) => {
	await UserModel.findByIdAndUpdate({ _id: id }, updateUser, { new: true });
};

export const getTopNUser = async (userId, n, client) => {
	const sortedUserList = await UserModel.find()
		.sort({ totalMilk: -1 });
		// .skip((n - 1) * 10)
		// .limit(10);
	const userRank = await getUserRank(userId, sortedUserList);
	const statRank = sortedUserList.splice(n-1,10);
	let statBoard = '';


	let fetchList = [];
	for (let i = 0; i < statRank.length; i++) {
		fetchList.push(client.users
			.fetch(statRank[i].userId)
			.catch(console.error));
		}
	const statList = await Promise.all(fetchList);
	for(let i =0; i<statList.length; i++){
		statBoard += `${(n - 1) * 10 + i + 1}. ${statList[i].tag} - ${
			statRank[i].totalMilk
		} lít sữa\n`;
	}
	return {statBoard, userRank};
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
	return Math.round(total * 100) / 100;
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
	return Math.round(total * 100) / 100;
};

export const decStrength = async (user) => {
	const diffTime = new Date() - user.cow.lastFeedingTime,
		diffHour = Math.abs(Math.ceil(diffTime / 1000)) / 3600,
		strangeDec = user.cow.strength - diffHour * settings.decStrengthVal,
		newStrength = strangeDec >= 0 ? Math.round(strangeDec * 100) / 100 : 0;
	await UserModel.findByIdAndUpdate(
		user._id,
		{ $set: { 'cow.strength': newStrength } },
		{ new: true }
	);
	return newStrength;
};

export const incStrength = async (user) => {
	const randNew =
			Math.round((user.cow.strength + (Math.random() * (settings.incStrengthMax-settings.incStrengthMin) + settings.incStrengthMin)) * 100) /
			100,
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
	return newStrength;
};
