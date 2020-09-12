
const { Command } = require("discord.js-commando");

module.exports = class SupportCommand extends Command {
	constructor(client) {
		super(client, {
			name: "support",
			group: "user",
			memberName: "support",
			description: "Sends you the support discord invite",
		});
	}

	async run(message) {
        return await message.reply("Having trouble with our bot? Join the support server!\nhttps://discord.gg/5kW97X5");
	}
};