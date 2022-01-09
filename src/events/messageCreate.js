import milk from '../commands/milk.js';
import { helpEmbed } from '../customEmbed/cutomEmbed.js';
import feed from '../commands/feed.js';
import rank from '../commands/rank.js';
import status from '../commands/status.js';

import settings from '../settings/settings.js';
import { isVaildChannel } from '../validator.js';

const messageCreate = async (message) => {
    if (message.author.bot) return;

    if (message.content.indexOf(settings.prefix) !== 0) return;
		
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
						message.client.channels.cache.get(oldChannel).send(`Trang trại bò đã được di dời đến ${channel.toString()}`);
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

				await rank(message, message.client);
				break;
			}

			case 'anco': {
				if ( !isVaildChannel(message) ) break;

				await feed(message);
				break;
			}
		}
	};

export default messageCreate;