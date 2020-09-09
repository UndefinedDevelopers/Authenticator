require('dotenv').config()
const Keyv = require('keyv');
const { Command } = require('discord.js-commando');
const { createCanvas, registerFont } = require('canvas');
const servers = new Keyv(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`)

module.exports = class DebugVerifyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'debugverify',
            group: 'dev',
            memberName: 'debugverify',
            description: 'Triggers the verification prompt in DMs',
            ownerOnly: true
        });
    }

    async run(message, args) {
        await message.say("This command is unfinished.")
        // registerFont("PressStart2P.ttf"), { family: 'Press Start' } // TODO: Move font to separate fonts directory
        // const canvas = createCanvas(750, 165);
        // const ctx = canvas.getContext('2d');
        // const img = new Image();
        // img.onload = () => ctx.drawImage(img, 0, 0);
        // img.onerror = err => { throw err };
        // img.src = 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Dark-Gray-Photos-Free-Download.png';
        // ctx.fillStyle = "#FF8C00";
        // ctx.font = '15px "Press Start"';
        // ctx.fillText(`This is a test`, 13, 35);
        // const buffer = canvas.toBuffer("image/png");
        // await message.author.send('', { files: [buffer] })
        // let roleid = servers.get(`${message.guild.id}_role`);
        // await message.author.send(roleid);
    }
};