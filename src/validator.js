import settings from './settings/settings.js';

const isVaildChannel = (message) => {
    if ( settings.channelListen === '' ) {
        message.channel.send('Bò đang vô gia cư. Liên hệ Chủ trại bò để bò có nhà');
        return false;
    }
    if (message.channelId !== settings.channelListen) {
        message.client.channels.fetch(settings.channelListen)
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