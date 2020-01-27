const inq = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

function promptUser() {
    return inq.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "favoriteColor",
            message: "What is your favorite color?"
        },
    ]);
}

async function init() {
    try {
        const userInput = await promptUser();

        let queryUrl = `https://api.github.com/users/${userInput.username}`;
        const { data } = await axios.get(queryUrl);

        console.log(data);
    } catch(err) {
        console.log(err);
    }
}

init();