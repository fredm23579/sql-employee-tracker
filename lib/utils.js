// Import the inquirer package for user input
const inquirer = require('inquirer');

/**
 * Function to prompt the user with a list of choices
 * @param {string} message - The message to display to the user
 * @param {array} choices - The list of choices to display to the user
 * @returns {Promise<object>} - A promise that resolves to the user's choice
 */
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

/**
 * Function to prompt the user for input
 * @param {string} message - The message to display to the user
 * @returns {Promise<object>} - A promise that resolves to the user's input
 */
function promptInput(message) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'input',
            message: message
        }
    ]);
}

// Export the promptUser and promptInput functions
module.exports = {
    promptUser,
    promptInput
};
