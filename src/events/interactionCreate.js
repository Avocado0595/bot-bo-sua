const interactionCreate = async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	if (interaction.commandName === 'g9') {
		await interaction.reply('Ngủ ngon nè! <3');
	}
};

export default interactionCreate;