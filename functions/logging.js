const chalk = require("chalk");

function debugLog(data) {
    console.log(chalk.gray(`[DEBUG]: ${data}`));
};
exports.debugLog = debugLog;

function infoLog(data) {
    console.log(chalk.green(`[INFO]: ${data}`));
};
exports.infoLog = infoLog;

function errorLog(data) {
    console.log(chalk.red(`[ERROR]: ${data}`));
};
exports.errorLog = errorLog;