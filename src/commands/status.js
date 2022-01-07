import { getTotalMilk, getTotalMilkByDay, getUser } from '../controllers/userController.js';

const status = async message=>{
	const user = await getUser(message.author.id);
	if(user){
		const totalMilk = await getTotalMilk(user),
			totalMilkToday = await getTotalMilkByDay(user, new Date());
		message.reply(`**${message.author.tag.split('#')[0]}** đang có ${user.numberOfCow} con bò với ${user.cow.strength}% năng lượng.\nTổng cộng: ${totalMilk} lít sữa trong kho\nHôm nay: ${totalMilkToday} lít sữa`); 
	} else{
		message.reply('Bạn chưa vắt sữa! Hãy **b!vatsua** để có sữa, rồi xem kho nhé :">');  
	}
};

export default status;
