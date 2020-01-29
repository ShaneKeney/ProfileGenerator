const inq = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const convertHTMLToPDF = require("pdf-puppeteer");
const htmlTemplate = require('./pdfTemplate');

const options = { printBackground: true }; //config options for the pdf conversion

var developerName = "devName";

var writeToFile = function(pdf) {
    // Write the pdf to the root of the project for view ability
    fs.writeFile(`./developerProfiles/${developerName}.pdf`, pdf, function(res, err) {
        if(err) {
            console.log("Something went wrong!");
        } else {
            console.log("Finished! Your file is located at ./generatedProfile.pdf");
        }
    });
}

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
        developerName = userInput.username; 
        
        const { avatar_url, html_url, name, company, blog, location, bio, public_repos, followers, following } = data;

        const html = htmlTemplate(
            userInput.favoriteColor,
            name,
            avatar_url,
            html_url,
            location,
            bio,
            company,
            public_repos,
            followers,
            null,
            following,
            blog
        );

        convertHTMLToPDF(html, writeToFile, options);
    } catch(err) {
        console.log(err);
    }
}

init();