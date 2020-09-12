const Keyv = require("keyv");
const { Command } = require("discord.js-commando");
let { MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, registerFont } = require("canvas");
const servers = new Keyv(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`)

module.exports = class DebugVerifyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "debugverify",
            group: "dev",
            memberName: "debugverify",
            description: "Triggers the verification prompt in DMs",
            ownerOnly: true,
            guildOnly: true
        });
    }

    async run(message) {
        function getRandomString(length) { var s = ""; do { s += Math.random().toString(36).substr(2) } while (s.length < length); return s = s.substr(0, length) }
        let code = getRandomString(6)
        registerFont("PressStart2P.ttf", { family: "Press Start" })
        const canvas = createCanvas(100, 35);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF8C00";
        ctx.font = '15px "Press Start"';
        ctx.fillText(`${code.toUpperCase()}`, 12, 35);
        let embed = new MessageEmbed()
            .setTitle(`Welcome to \`${message.guild.name}\``)
            .setDescription("This server uses verification to keep out robots, Please enter the code below to verify you are not a bot!")
            .attachFiles(new MessageAttachment(canvas.toBuffer(), "code.png"))
            .setImage("attachment://code.png")
            .setColor("ORANGE")
            .setFooter(`${message.guild.name} is powered by Authenticator`, `${message.guild.iconURL({ dynamic: true })}`);
        await message.author.send(embed)
        let roleid = await servers.get(`${message.guild.id}_role`);
        await message.author.send(roleid);
    }
};