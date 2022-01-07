import { incStrength, getUser } from "../controllers/userController.js";

const feed =async(message)=>{
    const user = await getUser(message.author.id);
        if(user){
            const randNew = await incStrength(user);
            message.reply(`Bạn vừa cung cấp cho bò ${randNew}% sức mạnh :">\nHãy thường xuyên cho bò ăn nhé!`);
        }
        else{
            message.reply(`Bạn vừa vào trang trại, có thể b!vatsua ngay nhé !`);
        }
}

export default feed;