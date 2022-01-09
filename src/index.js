import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import connect from './database/database.js';
import milk from './commands/milk.js';
import { helpEmbed } from './customEmbed/cutomEmbed.js';
import feed from './commands/feed.js';
import rank from './commands/rank.js';
import status from './commands/status.js';

import settings from './settings/settings.js';
import { isVaildChannel } from './validator.js';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

dotenv.config();
connect();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
client.on('messageCreate', async (message) => {
	if (message.content.indexOf(settings.prefix) === 0) {
		
		const command = message.content.split('!');
		switch (command[1]) {
			case 'help': {
				if ( !isVaildChannel(message) ) break;
				
				message.channel.send({ embeds: [helpEmbed()] });
				break;
			}

			case 'motrangtrai': {
				if ( settings.channelListen !== '' ) {
					const oldChannel = settings.channelListen; 			
					message.client.channels.fetch(message.channelId)
					.then((channel) => {
						client.channels.cache.get(oldChannel).send(`Trang trại bò đã được di dời đến ${channel.toString()}`);
					})
					.catch(console.error);
				}
				settings.channelListen = message.channelId;

				message.channel.send(`Chủ trang trại đã biến ${(message.channel.isThread() ? 'thread' : 'channel')} này thành trại bò`);
				break;
			}

			case 'vatsua': {
				if ( !isVaildChannel(message) ) break;

				await milk(message);
				break;
			}

			case 'xemkho': {
				if ( !isVaildChannel(message) ) break;

				await status(message);
				break;
			}

			case 'thongke': {
				if ( !isVaildChannel(message) ) break;

				await rank(message, client);
				break;
			}

			case 'anco': {
				if ( !isVaildChannel(message) ) break;

				await feed(message);
				break;
			}
		}
	}
});
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	if (interaction.commandName === 'g9') {
		await interaction.reply('Ngủ ngon nè! <3');
	}
});

client.login(process.env.TOKEN);
