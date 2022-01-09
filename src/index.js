import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';

import connect from './database/database.js';
import * as events from './events/events.js';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

dotenv.config();
connect();

for (let event in events) {
	console.log(`[Discord] Event ${event} loadded`);
	client.on(event, events[event]);
}

client.login(process.env.TOKEN);
