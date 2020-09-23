const { Command } = require("discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const { servers } = require('../../index');
const { generateImage } = require("../../functions/generateImage");
const { generateCode } = require("../../functions/generateCode");
const { infoLog } = require("../../functions/logging");

module.exports = class DebugVerifyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "debugverify",
            group: "dev",
            memberName: "debugverify",
            description: "Triggers the verification prompt in DMs",
            guildOnly: true
        });
    }

    async run(message) {
        let id = await servers.get(`${message.guild.id}_role`);
        if (!id) return message.reply("<:dnd:753279499885477898> You have not set up a role for this server!");
        let role = message.guild.roles.cache.get(id);
        infoLog(`${message.author.username} joined ${message.guild.name}, starting user verification!`);

        switch (id) {
            case undefined:
                await message.autho.send("<:dnd:753279499885477898> Sorry, this server does not have verification roles set up!\nYou cannot be verified.")
                break;

            default:
                let code = generateCode(6);
                let canvas = generateImage(code);

                let embed = new MessageEmbed()
                    .setTitle(`<:idle:753279249330471063> Welcome to \`${message.guild.name}\``)
                    .setDescription("This server uses verification to keep out robots, Please enter the code below to verify you are not a bot!\nYou have **10** minutes to verify.")
                    .attachFiles(new MessageAttachment(canvas.toBuffer(), "code.png"))
                    .setImage("attachment://code.png")
                    .setColor("ORANGE")
                    .setFooter(`${message.member.guild.name} is powered by Authenticator`, `${message.member.guild.iconURL({ dynamic: true })}`);

                await message.author.send(embed).then(async (msg) => {
                    msg.channel.awaitMessages(() => true, { max: 1, time: 600000, errors: ['time'] }).then(async (response) => {
                        if (response.first().content.toUpperCase() === code) {
                            await message.author.send(`<:online:753279453139828867> That was the correct code! Your access to \`${message.member.guild.name}\` has been granted.`)
                            await message.member.roles.add(role).then(() => {
                                infoLog(`${message.author.username} completed verification in ${message.member.guild}!`);
                            })
                        } else {
                            await message.author.send("<:dnd:753279499885477898> Sorry, but that code is invalid. You have been kicked from the server. If you wish to try again, rejoin the guild.").then(async () => {
                                await message.member.kick(`${message.author.tag} failed verification.`)
                                infoLog(`${message.author.username} failed verification in ${message.member.guild}!`);
                            })
                        }
                    })
                })
                break;
        }
    }
};