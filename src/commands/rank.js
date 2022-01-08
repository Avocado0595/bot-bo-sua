import {
	getTopNUser,
	getUser,
	getUserRank,
} from '../controllers/userController.js';
import { statsEmbed } from '../customEmbed/cutomEmbed.js';

const rank = async (message, client) => {
	const user = await getUser(message.author.id),
		stat = await getTopNUser(message.author.id,1, client);
	const {statBoard, userRank} = stat;
	message.channel.send({ embeds: [statsEmbed(user, userRank, statBoard)] });
};

export default rank;
