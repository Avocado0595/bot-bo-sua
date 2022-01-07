import {
  getTopNUser,
  getUser,
  getUserRank,
} from "../controllers/userController.js";
import { statsEmbed } from "../customEmbed/cutomEmbed.js";

const rank = async (message, client) => {
  const top = await getTopNUser(1, client),
    user = await getUser(message.author.id),
    userRank = await getUserRank(message.author.id);
  message.channel.send({ embeds: [statsEmbed(user, userRank, top)] });
};

export default rank;
