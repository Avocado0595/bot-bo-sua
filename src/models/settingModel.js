import mongoose from 'mongoose';
const { Schema } = mongoose;

import settingsDefault from '../settings/settings';

const settings = new Schema(
	{
        _id: mongoose.Schema.Types.ObjectId,
		guildId: String,
        guildName: String,
        prefix: {type: String, default: settingsDefault.prefix},
        milk: {
            cooldown : {type: Number, defalut: settingsDefault.milk.cooldown},
            value: {
                min: {type: Number, default: settingsDefault.milk.value.min},
                max: {type: Number, default: settingsDefault.milk.value.max},
            },
            max: {type: Number, default: settingsDefault.milk.max},
        },
        feed: {
            cooldown: {type: Number, default: settingsDefault.feed.cooldown },
        },
        strength: {
            get: {type: Number, default: settingsDefault.strength.get},
            eat: {
                min: {type: Number, defalut: settingsDefault.strength.eat.min},
                max: {type: Number, defalut: settingsDefault.strength.eat.max},
            },
        },
        channelListen: {type: String, defalut: settingsDefault.channelListen},
	},
);

export const settingsDefaultModel = mongoose.model('settings', settings);
