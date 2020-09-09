module.exports = (client) => {
    const { infoLog } = require("../functions/logging");
    setInterval(() => {
        client.user.setActivity(`${client.users.cache.size} other users.`, { type: 'WATCHING' });
    }, 120000);
    infoLog(`${client.user.username} connected to discord!`)
};