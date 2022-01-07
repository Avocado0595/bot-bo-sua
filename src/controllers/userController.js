import { UserModel } from "../models/userModel.js";
import config from "../config/config.js";
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

export const getTopNUser = async (n, client) => {
  const userList = await UserModel.find()
    .sort({ totalMilk: -1 })
    .skip((n - 1) * 10)
    .limit(10);
  let statBoard = "";
  for (let i = 0; i < userList.length; i++) {
    const userTag = await client.users
      .fetch(userList[i].userId)
      .catch(console.error);
    statBoard += `${(n - 1) * 10 + i + 1}. ${userTag.tag} - ${
      userList[i].totalMilk
    } lít sữa\n`;
  }
  return statBoard;
};

export const getUserRank = async (userId) => {
  const userList = await UserModel.find().sort({ totalMilk: -1 });
  let rank = userList.length;
  for (let i = 0; i < userList.length; i++) {
    if (userId === userList[i].userId) {
      rank = i + 1;
    }
  }
  return rank;
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
        new Date(element.takingTime).getDay() == new Date(date).getDay() &&
        new Date(element.takingTime).getMonth() == new Date(date).getMonth() &&
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
    strangeDec = user.cow.strength - diffHour * config.decStrengthVal,
    newStrength = strangeDec >= 0 ? Math.round(strangeDec * 100) / 100 : 0;
  await UserModel.findByIdAndUpdate(
    user._id,
    { $set: { "cow.strength": newStrength } },
    { new: true }
  );
  return newStrength;
};

export const incStrength = async (user) => {
  const randNew =
      Math.round((user.cow.strength + (Math.random() * 2 + 4)) * 100) / 100,
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
        "cow.strength": updatedCow.strength,
        "cow.lastFeedingTime": new Date(),
      },
    },
    { new: true }
  );
  return newStrength;
};
