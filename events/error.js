module.exports = (_client, error) => {
    const { errorLog } = require("../functions/logging");
    errorLog(error);
};