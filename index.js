const inq = require('inquirer');
const fs = require('fs');
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
            console.log("Finished! Your file is located at ./developerProfiles/{username}.pdf");
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
        
        let { html_url} = data;
        let test = validate(
            userInput.username, 
            { key: 'avatar_url', value: data.avatar_url},  
            { key: 'name', value: data.name }, 
            { key: 'company', value: data.company}, 
            { key: 'blog', value: data.blog}, 
            { key: 'location', value: data.location}, 
            { key: 'bio', value: data.bio}, 
            { key: 'public_repos', value: data.public_repos}, 
            { key: 'followers', value: null}, 
            { key: 'following', value: data.following}
        );

        console.log(test);

        let { avatar_url, name, company, blog, location, bio, public_repos, followers, following } = test;
        
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

const validate = function validate(username, ...args) {
    let returnObject = { };
    for(let i=0; i < args.length; i++) {
        switch(args[i].key) {
            case 'avatar_url':
                (args[i].value) ? returnObject.avatar_url = args[i].value : returnObject.avatar_url = "";
                break;
            case 'name':
                (args[i].value) ? returnObject.name = args[i].value : returnObject.name = username;
                break;
            case 'company':
                (args[i].value) ? returnObject.company = args[i].value : returnObject.company = "N/A";
                break;
            case 'blog':
                (args[i].value) ? returnObject.blog = args[i].value : returnObject.blog = "";
                break;
            case 'location':
                (args[i].value) ? returnObject.location = args[i].value : returnObject.location = "unknown";
                break;
            case 'bio': 
                (args[i].value) ? returnObject.bio = args[i].value : returnObject.bio = "No biography listed.";
                break;
            case 'public_repos':
                (args[i].value) ? returnObject.public_repos = args[i].value : returnObject.public_repos = "0";
                break;
            case 'followers':
                (args[i].value) ? returnObject.followers = args[i].value : returnObject.followers = "0";
                break;
            case 'following':
                (args[i].value) ? returnObject.following = args[i].value : returnObject.following = "0";
                break;
            default:
                break;
        }
    }

    return returnObject;
};

init();