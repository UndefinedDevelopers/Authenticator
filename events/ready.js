module.exports = (client) => {
    const { infoLog } = require("../functions/logging");
    infoLog(`${client.user.username} connected to discord!`)
};