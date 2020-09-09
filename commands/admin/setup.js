
const { Command } = require('discord.js-commando');

module.exports = class SetupCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'setup',
			group: 'admin',
			memberName: 'setup',
			description: 'Setups the bot',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
			args: [
				{
					key: 'role',
					prompt: 'Placeholder code.',
					type: 'string',
				},
			],
		});
	}

	async run(message) {
		return await message.say('Placeholder code.');
	}
};