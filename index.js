require('dotenv').config()
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { debug, info, error } = require("./functions/logging");

const client = new CommandoClient({
    commandPrefix: 'a?',
    owner: '573909482619273255',
    invite: 'https://discord.gg/5kW97X5',
    unknownCommandResponse: false,
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['user', 'Basic commands'],
        ['admin', 'Administrator commands'],
        ['dev', 'Developer commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready", () => {
    info(`${client.user.username} connected to discord!`)
});

client.on("debug", (data) => {
    debug(data)
})

client.on('error', (data) => {
    error(data);
})

client.login();