module.exports = async (client, member) => {
    const Keyv = require("keyv");
    const servers = new Keyv(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`)
    const { createCanvas, registerFont } = require("canvas");
    const { generateCode } = require("../functions/generateCode");
    const { infoLog } = require("../functions/logging");
    const { MessageEmbed, MessageAttachment } = require("discord.js");

    let id = await servers.get(`${member.guild.id}_role`);
    let role = member.guild.roles.cache.get(id);
    infoLog(`${member.user.username} joined ${member.guild}, starting user verification!`);

    switch (id) {
        case undefined:
            await member.send("<:dnd:753279499885477898> Sorry, this server does not have verification roles set up!\nYou cannot be verified.")
            break;

        default:
            let code = generateCode(6);
            registerFont("PressStart2P.ttf", { family: "Press Start" })
            const canvas = createCanvas(100, 35);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#FF8C00";
            ctx.font = '15px "Press Start"';
            ctx.fillText(`${code}`, 12, 35);
            let embed = new MessageEmbed()
                .setTitle(`<:idle:753279249330471063> Welcome to \`${member.guild.name}\``)
                .setDescription("This server uses verification to keep out robots, Please enter the code below to verify you are not a bot!\nYou have **10** minutes to verify.")
                .attachFiles(new MessageAttachment(canvas.toBuffer(), "code.png"))
                .setImage("attachment://code.png")
                .setColor("ORANGE")
                .setFooter(`${member.guild.name} is powered by Authenticator`, `${member.guild.iconURL({ dynamic: true })}`);
            await member.send(embed).then(async (msg) => {
                msg.channel.awaitMessages(() => true, { max: 1, time: 600000, errors: ['time'] }).then(async (response) => {
                    if (response.first().content.toUpperCase() === code) {
                        await member.send(`<:online:753279453139828867> That was the correct code! Your access to \`${member.guild.name}\` has been granted.`)
                        await member.roles.add(role).then(() => {
                            infoLog(`${member.user.username} completed verification in ${member.guild}!`);
                        })
                    } else {
                        await member.send("<:dnd:753279499885477898> Sorry, but that code is invalid. You have been kicked from the server. If you wish to try again, rejoin the guild.").then(async () => {
                            await member.kick(`${member.user.tag} failed verification.`)
                            infoLog(`${member.user.username} failed verification in ${member.guild}!`);
                        })
                    }
                }).catch(async () => {
                    await member.send(`<:dnd:753279499885477898> Sorry, you ran out of time to complete verification and was kicked from ***\`${member.guild.name}\`***\nIf you wish to try again, rejoin the guild.`)
                })
            })
            break;
    }
};


