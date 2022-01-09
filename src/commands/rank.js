import { getTopNUser, getUser } from '../controllers/userController.js';
import { statsEmbed } from '../customEmbed/cutomEmbed.js';

const rank = async (message, client, page) => {
	const user = await getUser(message.author.id);
	const { statBoard, userRank, totalPage } = await getTopNUser(
		message.author.id,
		page,
		client
	);
	message.channel.send({
		embeds: [
			statsEmbed(
				user,
				userRank,
				statBoard,
				page <= totalPage ? page : totalPage,
				totalPage
			),
		],
	});
};

export default rank;
