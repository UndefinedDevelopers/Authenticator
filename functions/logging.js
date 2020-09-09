const chalk = require('chalk');

function debug(data) {
    console.log(chalk.gray(`[DEBUG]: ${data}`));
};
exports.debug = debug;

function info(data) {
    console.log(chalk.green(`[INFO]: ${data}`));
};
exports.info = info;

function error(data) {
    console.log(chalk.red(`[ERROR]: ${data}`));
};
exports.error = error;
