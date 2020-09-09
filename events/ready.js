module.exports = async (client) => {
    require('dotenv').config()
    const Sequelize = require('sequelize');
    const { infoLog } = require("../functions/logging");

    const Servers = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    });
    
    const servers = Servers.define('servers', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
    });

    await servers.sync();
    setInterval(() => {
        client.user.setActivity(`${client.users.cache.size} other users.`, { type: 'WATCHING' });
    }, 120000);
    infoLog(`${client.user.username} connected to discord!`)
};