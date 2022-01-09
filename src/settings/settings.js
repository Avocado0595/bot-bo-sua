export default {
	prefix: 'b!',
	milk: {
		cooldown: 30 * 60,
		value: {
			min: 2,
			max: 4,
		},
		max: 16,
	},
	feed: {
		cooldown: 30,
	},
	strength: {
		get: -0.59,
		eat: {
			min: 0.1,
			max: 0.2,
		}
		
	},
	channelListen: '',
};
