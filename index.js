require("dotenv").config()
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const requireAll = require("require-all");
const { infoLog, errorLog } = require("./functions/logging");
const Keyv = require("keyv");
const servers = new Keyv(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`)
servers.on('error', err => {
    errorLog(err);
});
exports.servers = servers;

const client = new CommandoClient({
    commandPrefix: process.env.PREFIX,
    owner: "573909482619273255",
    invite: "https://discord.gg/5kW97X5",
    nonCommandEditable: true,
    disableMentions: 'all',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["user", "Basic commands"],
        ["admin", "Administrator commands"],
        ["dev", "Developer commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, "commands"));

const files = requireAll({
    dirname: `${__dirname}/events`,
    filter: /^(?!-)(.+)\.js$/
});

for (const name in files) {
    const event = files[name];
    client.on(name, event.bind(null, client));
    infoLog(`Event loaded: ${name}`);
}

client.login();