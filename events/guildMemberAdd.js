module.exports = async (client, member) => {
    const { infoLog } = require("../functions/logging");
    const { generateImage } = require("../functions/generateImage");
    const { generateCode } = require("../functions/generateCode");

    const { MessageEmbed, MessageAttachment } = require("discord.js");
    const { servers } = require('../index.js');

    let id = await servers.get(`${member.guild.id}_role`);
    let role = member.guild.roles.cache.get(id);
    let code = generateCode(6);
    let canvas = generateImage(code);

    infoLog(`${member.user.username} joined ${member.guild}, starting user verification!`);

    switch (id) {
        case undefined:
            // await member.send("<:dnd:753279499885477898> Sorry, this server does not have verification roles set up!\nYou cannot be verified.")
            break;

        default:
            if (member.user.bot) {
                await member.roles.add(role);
                infoLog(`${member.user.tag} bypassed verification in ${member.guild}!`);
                break;
            }

            let embed = new MessageEmbed()
                .setTitle(`<:idle:753279249330471063> Welcome to \`${member.guild.name}\``)
                .setDescription("This server uses verification to keep out robots, Please enter the code below to verify you are not a bot!\nYou have **10** minutes to verify.")
                .attachFiles(new MessageAttachment(canvas.toBuffer(), "code.png"))
                .setImage("attachment://code.png")
                .setColor("ORANGE");
            if (member.guild.iconURL()) {
                embed.setFooter(`${member.guild.name} is powered by Authenticator`, `${member.guild.iconURL({ dynamic: true })}`);
            } else return embed.setFooter(`${member.guild.name} is powered by Authenticator`);;
            await member.send(embed).then(async (msg) => {
                msg.channel.awaitMessages(() => true, { max: 1, time: 600000, errors: ['time'] }).then(async (response) => {
                    if (response.first().content.toUpperCase() === code) {
                        await member.send(`<:online:753279453139828867> That was the correct code! Your access to \`${member.guild.name}\` has been granted.`)
                        await member.roles.add(role).then(() => {
                            infoLog(`${member.user.tag} completed verification in ${member.guild}!`);
                        })
                    } else {
                        await member.send("<:dnd:753279499885477898> Sorry, but that code is invalid. You have been kicked from the server. If you wish to try again, rejoin the guild.").then(async () => {
                            await member.kick(`${member.user.tag} failed verification.`)
                            infoLog(`${member.user.tag} failed verification in ${member.guild}!`);
                        })
                    }
                })
            })
            break;
    }
};