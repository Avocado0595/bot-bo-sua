import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MilkTank = new Schema({
    milk: {type: Number , default:0},
    takingTime: Date,
})

export default MilkTank;