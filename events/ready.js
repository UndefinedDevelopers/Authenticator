module.exports = async (client) => {
    require("dotenv").config()
    const { infoLog } = require("../functions/logging");
    setInterval(() => {
        client.user.setActivity(`${client.users.cache.size} users | ${client.guilds.cache.size} guilds`, { type: "WATCHING" });
    }, 60000);
    infoLog(`${client.user.username} connected to discord!`)
};