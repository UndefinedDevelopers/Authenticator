const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const servers = new Keyv(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`)

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
					prompt: '<:idle:753279249330471063> Welcome to the bot setup!\nPlease ping the role you would like to set up for verification.',
					type: 'role',
				},
			],
		});
	}

	async run(message, args) {
		let roleid = args.role.id;
		await servers.set(`${message.guild.id}_role`, roleid).then(async () => {
			return await message.say(`<:online:753279453139828867> Successfully set **${message.guild.roles.cache.get(roleid).name}** as your verification role.\nThis will be given to members when they verify.\n*Make sure the bots role is above it!*`);
		});
	}
};