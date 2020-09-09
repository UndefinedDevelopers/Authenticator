module.exports = (client) => {
    const { infoLog } = require("../functions/logging");
    client.user.setActivity(`${client.users.cache.size} other users.`, { type: 'WATCHING' });
    infoLog(`${client.user.username} connected to discord!`)
};