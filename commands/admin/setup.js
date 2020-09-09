
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
					prompt: 'Please ping the role you would like to set up for verification!',
					type: 'string',
				},
			],
		});
	}

	async run(message, args) {
		let role = args.role;
		if (args.role.startsWith('<@') && args.role.endsWith('>')) {
			role = args.role.slice(2, -1);
			return await message.say(`SERVER ID ${message.guild.id}\nROLE ID: ${role}`);
		}
	}
};