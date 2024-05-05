const inquirer = require('inquirer');

function promptUser(message, choices = []) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: message,
            choices: choices
        }
    ]);
}

function promptInput(message) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'input',
            message: message
        }
    ]);
}

module.exports = {
    promptUser,
    promptInput
};