import { MessageEmbed } from 'discord.js';

const avatarLink =
		'https://cdn.dribbble.com/users/1275/screenshots/2154492/media/7582ab673004df06fbac8dbef7211ad0.png',
	inviteLink =
		'https://discord.com/api/oauth2/authorize?client_id=910123710638333983&permissions=274877974528&scope=bot';

export const helpEmbed = () =>
	new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Bot Bò Sữa')
		.setURL(inviteLink)
		.setAuthor({ name: 'Bot Bò Sữa', iconURL: avatarLink, url: inviteLink })
		.setDescription(
			'Chào mừng đến với Bot Bò Sữa!\nXem danh sách lệnh dưới đây nhé!'
		)
		.setThumbnail(avatarLink)
		.addField('b!help', 'Gọi ra bảng giúp đỡ này')
		.addField('b!vatsua', 'Bắt đầu vắt sữa bò')
		.addField('b!xemkho', 'Xem kho bạn có gì nào?')
		.addField('b!thongke', 'Xem bảng thống kê')
		.addField('b!anco', 'Cho bò ăn để có sữa nhé')
		.addField('Github', 'https://github.com/Avocado0595/bot-bo-sua')
		.setURL('https://github.com/Avocado0595/bot-bo-sua')
		.setTimestamp()
		.setFooter(
			'Bot được tạo ra bởi ThanhXuan',
			'https://cdn.discordapp.com/avatars/526277128992325632/523f5d88ae0c0324c27c28d1fdef27d2.png?size=1024'
		);

export const statsEmbed = (user, userRank, top, page, totalPage) =>
	new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Bảng thống kê (toàn trái đất)')
		.setURL(inviteLink)
		.setAuthor({ name: 'Bot Bò Sữa', iconURL: avatarLink, url: inviteLink })
		.setDescription(top)
		.setThumbnail(avatarLink)
		.addField(
			`Thứ hạng của bạn: ${userRank} - ${
				user ? user.totalMilk : 0
			} lít sữa`,
			`Hãy tiếp tục vắt sữa nhé :"> \nTrang: ${page}/${totalPage} - b!thongke ${'số trang'}`
		)
		.setTimestamp()
		.setFooter(
			'Bot được tạo ra bởi ThanhXuan',
			'https://cdn.discordapp.com/avatars/526277128992325632/1b072787d8ef0a9252b15f0156e2ca86.png?size=1024'
		);
