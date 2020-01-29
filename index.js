const inq = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const convertHTMLToPDF = require("pdf-puppeteer");

const options = { printBackground: true }; //config options for the pdf conversion

var writeToFile = function(pdf) {
    // Write the pdf to the root of the project for view ability
    fs.writeFile('./generatedProfile.pdf', pdf, function(res, err) {
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

        console.log(data);

        convertHTMLToPDF(html, writeToFile, options);
    } catch(err) {
        console.log(err);
    }
}

const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Profile Generator</title>

        <!-- Custom or override css -->
        <!-- <link rel="stylesheet" href="./styles/index.css" /> -->
        <link rel="stylesheet" href="./styles/font-imports.css" />

        <!-- Add icon library -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <style>
            html, body {
                margin: 0px;
            }

            body {
                height: 100vh;
            }

            .fullPage {
                display: flex;
                background-color: #879cdf;
                height: 100vh;
                width: 100vw;
                margin: 0px;
                padding: 0px;
                justify-content: center;
            }

            .separator {
                background-color: #e9edee;
                height: 33vh;
                width: 100%;
                top: 33%;
                position: absolute;
            }

            .header {
                position: relative;
                display: flex;
                margin-top: 50px;
                height: 33vh;
                width: 85vw;
                background-color: #ff8374;
                border-radius: 1.0em;
                align-items: center;
                flex-direction: column;
            }

            .profileImageContainer {
                height: 150px;
                width: 150px;
                background-color: yellow;
                border-radius: 75px;
                top: -40px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0px;
                padding: 0px;
            }

            .profileImage {
                position: relative;
                background-color: lightgray;
                height: 140px;
                width: 140px;
                border-radius: 70px;
            }

            .headerInfo {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 20px;
                align-items: center;

            }

            h1, h2, h3, h4 {
                margin: 0px;
                margin-bottom: 10px;
                padding: 0px;
                font-family: 'Montserrat';
                color: white;
            }

            h1 {
                font-family: 'Montserrat-Medium';
            }

            .socialStatusHandles {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

            .socialStatusItem {
                margin-right: 20px;
                margin-bottom: 0px;
            }

            .icon {
                margin-right: 5px;
            }
        </style>
    </head>
    <body>
        <div class="fullPage">
            <!-- Format separator for pdf doc -->
            <div class="separator"></div>

            <div class="header">
                <div class="profileImageContainer">
                    <div class="profileImage"></div>
                </div>

                <div class="headerInfo">
                    <h1 class="greeting">Hi!</h1>
                    <h1 class="name">My name is Shane Keney</h1>
                    <h3 class="workplace">Currently @ Spikeball Inc.</h3>

                    <div class="socialStatusHandles">
                        <h4 class="socialStatusItem"><i class="fa fa-location-arrow icon fa-lg"></i>Richmond, VA</h4>
                        <h4 class="socialStatusItem"><i class="fa fa-github icon fa-lg"></i>GitHub</h4>
                        <h4 class="socialStatusItem"><i class="fa fa-rss icon fa-lg"></i>Blog</h4>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
`;

init();