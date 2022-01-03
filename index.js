
require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MilkTank = new Schema({
  milk: {type: Number , default:0},
  takingTime: Date,
})

const User = new Schema({
  userId: String,
  userName: String,
  numberOfCow: {type: Number, default: 1},
  milkTank: [MilkTank],
  lastTimeTakeMilk: Date
}, {timestamps: true});



const connect = async()=>{
  try{
      await mongoose.connect('mongodb://localhost:27017/dairycow');
      console.log("connect database successfully!");
  }
  catch(e){
      console.log(`Error: ${e}`);
  };
};
const UserModel = mongoose.model('user', User);
const getUser = async (userId)=>{
    const result = await UserModel.findOne({userId: userId});
    return result;
}

const addUser = async(user)=>{
  const newUser = new UserModel(user);
  newUser.save();
}

const updateUser = async(id, updateUser)=>{
  await UserModel.findByIdAndUpdate({_id:id}, updateUser, {new: true});
}

const getTotalMilk = async(user)=>{
  let total = 0;
  if(user){
    const milkTank = user.milkTank;
    
    milkTank.forEach(element => {
      total+=element.milk;
    });
  }
  return total;
}
const getTotalMilkByDay = async(user, date)=>{
  let total = 0;
  if(user){
    const milkTank = user.milkTank;
    milkTank.forEach(element => {
      if(new Date(element.takingTime).getDay() == new Date(date).getDay() &&
      new Date(element.takingTime).getMonth() == new Date(date).getMonth() &&
      new Date(element.takingTime).getFullYear() == new Date(date).getFullYear())
        total+=element.milk;
    });
  }
  return total;
}
const inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=910123710638333983&permissions=274877974528&scope=bot';
const avatarLink = 'https://cdn.dribbble.com/users/1275/screenshots/2154492/media/7582ab673004df06fbac8dbef7211ad0.png';
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Bot Bò Sữa')
	.setURL(inviteLink)
	.setAuthor({ name: 'Bot Bò Sữa', iconURL: avatarLink, url: inviteLink })
	.setDescription('Chào mừng đến với Bot Bò Sữa!\nXem danh sách lệnh dưới đây nhé!')
	.setThumbnail(avatarLink)
  .addField('b!help','Gọi ra bảng giúp đỡ này')
  .addField('b!vatsua','Tiến hành vắt sữa')
  .addField('b!xemkho','Xem kho bạn có gì nào?')
  .addField('b!thongke','Xem bảng thống kê')
	.setTimestamp()
	.setFooter('Bot được tạo ra bởi ThanhXuan', 'https://cdn.discordapp.com/avatars/526277128992325632/1b072787d8ef0a9252b15f0156e2ca86.png?size=1024');

connect();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('messageCreate',(async message=>{

  if(message.content.indexOf("b!")===0){
    const command = message.content.split("!");
    switch(command[1]){
      case "help":
        {          
          message.channel.send({ embeds: [exampleEmbed] });
          break;
        }

      case "vatsua":{
        const user = await getUser(message.author.id);
        const milk = Math.round((Math.random()+3)*100)/100;
        if(user){//user tồn tại
          const diffTime = user.lastTimeTakeMilk - new Date();//thời gian cooldown
          const diffSecond = Math.abs(Math.ceil(diffTime / (1000)));//thời gian cooldown
          if(diffSecond < 60){
            message.reply(`**${message.author.tag.split("#")[0]}** bạn vừa vắt sữa chưa đầy 1 phút @.@! 1 phút nữa vắt tiếp nhé :"> !`);  
          }
          else{
            const totalMilk = await getTotalMilk(user);
            if(totalMilk < 16){
              message.reply(`**${message.author.tag.split("#")[0]}** vừa vắt được ${milk} lít sữa bò!`);  
              const editUser = {numberOfCow: user.numberOfCow,userId: message.author.id, lastTimeTakeMilk: new Date(), 
              milkTank: [...user.milkTank,{milk:milk, takingTime: new Date()}] };
              await updateUser(user._id, editUser);
            }
            else{
              message.reply(`**${message.author.tag.split("#")[0]}** bạn vừa vắt hết sữa hôm nay rồi @.@! Hôm sau quay lại nhé :"> !`);  
            }
          }
        }
        else{
          const newUser = {userId: message.author.id, lastTimeTakeMilk: new Date(), milkTank: [{milk:milk, takingTime: new Date() }]};
          await addUser(newUser);
          message.reply(`Lần đầu tiên, **${message.author.tag.split("#")[0]}** vừa vắt được ${milk} lít sữa bò!`);
        }
        break;
      }

      case "xemkho":{
        const user = await getUser(message.author.id);
        if(user){
          const totalMilk = await getTotalMilk(user);
          const totalMilkToday = await getTotalMilkByDay(user, new Date());
          message.reply(`**${message.author.tag.split("#")[0]}** đang có ${user.numberOfCow} con bò .\nTổng cộng: ${totalMilk} lít sữa trong kho\nHôm nay: ${totalMilkToday} lít sữa`); 
        }
        else{
          message.reply('Bạn chưa vắt sữa! Hãy **b!vatsua** để có sữa nhé :">');  
        }
      }
    }

    if(command[1] == "thongke"){
      message.reply("Tính năng này đang thêm =)))")
    }
  }
}))
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  if (interaction.commandName === 'g9') {
    await interaction.reply('Ngủ ngon nè! <3');
  }

});

client.login(process.env.TOKEN);