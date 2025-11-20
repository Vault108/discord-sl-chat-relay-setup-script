const fs = require('fs');
const { prompt } = require('enquirer');
const logger = require('./modules/Logger.js');

const questions = [
    {
        type: 'input',
        name: 'DISCORD_TOKEN',
        message: 'Discord Bot Token',
        validate: (value) => value.trim() !== '' || 'This field is required.'
    },
    {
        type: 'input',
        name: 'OWNER',
        message: 'Bot Owner Name',
        validate: (value) => value.trim() !== '' || 'This field is required.'
    },
    {
        type: 'input',
        name: 'SL_FIRSTNAME',
        message: 'Second Life First Name',
        validate: (value) => value.trim() !== '' || 'This field is required.'
    },
    {
        type: 'input',
        name: 'SL_LASTNAME',
        message: 'Second Life Last Name (Default is last)',
        validate: (value) => value.trim() !== '' || 'This field is required.'
    },
    {
        type: 'password',
        name: 'SL_PASSWORD',
        message: 'Second Life Password',
        validate: (value) => value.trim() !== '' || 'This field is required.'
    },
    {
        type: 'input',
        name: 'SL_START',
        message: 'Second Life Start Location',
        validate: (value) => value.trim() !== '' || 'This field is required.'
    }
];

prompt(questions)
    .then((answers) => {
        logger.success("Configuration completed successfully!");

        // Log answers to an .env file
        const envContent = Object.entries(answers)
            .map(([key, value]) => `${key.toUpperCase()}=${value}`)
            .join('\n');

        fs.writeFileSync('.env', envContent, 'utf8');
        logger.info('Config saved to .env');
    })
    .catch((error) => {
        logger.error('Prompt canceled or an error occurred:', error);
    });
