require('dotenv').config()
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const servers = new Keyv(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`)
const { errorLog } = require(".../functions/logging");
keyv.on('error', err => errorLog(err));

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
					prompt: '<:dboatsStreaming:500353798838157312> Welcome to the bot setup!\nPlease ping the role you would like to set up for verification.',
					type: 'role',
				},
			],
		});
	}

	async run(message, args) {
		let roleid = args.role.id;
		await servers.set(`${message.guild.id}_role`, roleid).then(async () => {
			return await message.say(`<:dboatsOnline:500353658261733397> Successfully set ${message.guild.roles.cache.get(roleid).name} as your verification role.\n*This will be given to members when they verify, make sure the bots role is above it!*`);
		});
	}
};