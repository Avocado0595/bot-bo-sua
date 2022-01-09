const ready = (client) => {
	console.log(`Logged in as ${client.user.tag}!`);
    
        client.user.setPresence({
            activity: {
                name: 'Trang trại bò 2022',
                type: 'STREAMING',
            },
        });
};

export default ready;