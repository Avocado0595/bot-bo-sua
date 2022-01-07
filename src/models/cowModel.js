import mongoose from 'mongoose';
const { Schema } = mongoose,
	Cow = new Schema({
		strength: { type: Number, default: 100.0 },
		dateOfBirth: { type: Date, default: new Date() },
		lastFeedingTime: { type: Date, default: new Date() },
	});

export default Cow;
