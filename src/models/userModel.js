import mongoose from 'mongoose';
const {Schema} = mongoose;
import MilkTank from './milkTankModel.js';
import Cow from './cowModel.js';

const User = new Schema({
	userId: String,
	userTagName: String,
	numberOfCow: {type: Number, default: 1},
	milkTank: [MilkTank],
	cow: Cow,
	lastTimeTakeMilk: Date,
	totalMilk: Number
}, {timestamps: true});

export const UserModel = mongoose.model('user', User);
