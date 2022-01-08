import config from './config/config.js';

const isVaildChannel = (message) => {
    if ( config.channelListen === '' ) {
        message.channel.send('Bò đang vô gia cư. Liên hệ Chủ trại bò để bò có nhà');
        return false;
    }
    if (message.channelId !== config.channelListen) {
        message.client.channels.fetch(config.channelListen)
            .then((channel) => {
                message.channel.send(`Đây không phải địa phận của trang trại bò\nHãy đến ${channel.toString()}`);
            })
            .catch(console.error);
        return false;
    }
    return true;
};

export {
    isVaildChannel,
};