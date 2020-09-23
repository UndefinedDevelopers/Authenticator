const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: "say",
			group: "admin",
			memberName: "say",
            description: "Mind Control.",
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like me to say?',
                    type: 'string',
                    default: 'You did not specify anything for me to say!'
                },
            ]
		});
	}

	async run(message, { text }) {
        return await message.channel.send(`${text}`);
	}
};