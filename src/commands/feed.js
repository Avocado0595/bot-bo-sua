import { incStrength, getUser } from '../controllers/userController.js';
import config from '../config/config.js';

const feed = async (message) => {
	const user = await getUser(message.author.id);
	if (user) {
		const diffTime = user.cow.lastFeedingTime - new Date(),
			diffSecond = Math.abs(Math.ceil(diffTime / 1000)),
			timeLeft = config.coolDownFeeding - diffSecond;
		if(timeLeft<=0){
		const randNew = await incStrength(user);
		message.reply(
			`Bạn vừa buff cho bò lên ${randNew}% sức mạnh :">\nHãy thường xuyên cho bò ăn nhé!`
		);}
		else{
			if(user.cow.strength < 100)
			message.reply(
				`Bò đang nhai mà @.@ !\nChờ ${timeLeft} giây nữa rồi cho ăn tiếp nhé!`
			);
			else
			message.reply(
				`Bò no rồi, không cần ăn nữa đâu!`
			);
		}
		
	} else {
		message.reply('Bạn vừa vào trang trại, có thể b!vatsua ngay nhé !');
	}
};

export default feed;
