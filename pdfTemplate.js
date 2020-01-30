const colorScheme = function(color) {
    let colorSchema = { };
    switch(color) {
        case 'red':
            colorSchema.wrapperBackground = "#DE9967",
            colorSchema. headerBackground = "#870603",
            colorSchema.headerColor = "white",
            colorSchema.photoBorderColor = "white"  
            break;      
        case 'green':
            colorSchema.wrapperBackground = "#E6E1C3",
            colorSchema. headerBackground = "#C1C72C",
            colorSchema.headerColor = "black",
            colorSchema.photoBorderColor = "black" 
            break;
        case 'blue':
            colorSchema.wrapperBackground = "#5F64D3",
            colorSchema. headerBackground = "#26175A",
            colorSchema.headerColor = "white",
            colorSchema.photoBorderColor = "#73448C" 
            break;
        case 'pink':
            colorSchema.wrapperBackground = "#879CDF",
            colorSchema. headerBackground = "#FF8374",
            colorSchema.headerColor = "white",
            colorSchema.photoBorderColor = "#FEE24C" 
            break;
        default:
            colorSchema.wrapperBackground = "#879cdf",
            colorSchema. headerBackground = "#ff8374",
            colorSchema.headerColor = "white",
            colorSchema.photoBorderColor = "yellow" 
    }

    return colorSchema;
}

const htmlTemplate = function(
    favoriteColor,
    developerName, 
    profileImageURL, 
    gitHubURL, 
    location, 
    bio, 
    company, 
    publicRepoNumber, 
    numberOfFollowers, 
    numberOfStars, 
    followingNumber,
    blogURL
    ) {

    let color = colorScheme(favoriteColor);
    
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Profile Generator</title>
    
        
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
                    background-color: ${color.wrapperBackground};
                    height: 100vh;
                    width: 100vw;
                    margin: 0px;
                    padding: 0px;
                    align-items: center;
                    flex-direction: column;
                }
        
                .separator {
                    background-color: #e9edee;
                    height: 50vh;
                    width: 100%;
                    top: 30%;
                    position: absolute;
                }
        
                .header {
                    position: relative;
                    display: flex;
                    margin-top: 50px;
                    height: 33vh;
                    width: 85vw;
                    background-color: ${color.headerBackground};
                    border-radius: 1.0em;
                    align-items: center;
                    flex-direction: column;
                }
        
                .profileInfo {
                    position: relative;
                    display: flex;
                    height: 39vh;
                    width: 85vw;
                    align-items: center;
                    flex-direction: column;
                }
        
                .profileImageContainer {
                    height: 150px;
                    width: 150px;
                    background-color: ${color.photoBorderColor};
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
                    height: 140px;
                    width: 140px;
                    border-radius: 70px;
                    background-image: url("${profileImageURL}");
                    background-size: cover;
                }
        
                .headerInfo {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    bottom: 60px;
                    align-items: center;
                }
        
                h1, h2, h3, h4, a {
                    margin: 0px;
                    margin-bottom: 10px;
                    padding: 0px;
                    font-family: 'Montserrat';
                    color: ${color.headerColor};
                    text-decoration: none;
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
        
                #bio {
                    color: black;
                    margin-top: 20px;
                    text-align: center;
                }
        
                .container {
                    height: 60%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }
        
                .row {
                    flex-grow: 1;
                    display: flex;
                    width: 100%;
                    justify-content: space-between
                }
        
                .item {
                    height: 95%;
                    width: 33%;
                    background-color: ${color.headerBackground};
                    flex-direction: column;
                    display: flex;
                    border-radius: 1.0em;
                    justify-content: center;
                    align-items: center;
                }
        
                #repo, #githubStars {
                    margin-left: 15%;
                }
        
                #githubStars {
                    margin-top: 5px;
                }
        
                #followers, #following {
                    margin-right: 15%;
                }
        
                #following {
                    margin-top: 5px;;
                }
        
                .itemText {
                    font-family: 'Montserrat-Bold';
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
                        <h1 class="name">My name is ${developerName}</h1>
                        <h3 class="workplace">Currently @ ${company}</h3>
        
                        <div class="socialStatusHandles">
                            <h4 class="socialStatusItem"><i class="fa fa-location-arrow icon fa-lg"></i>${location}</h4>
                            <a href= "${gitHubURL}" class="socialStatusItem"><i class="fa fa-github icon fa-lg"></i>GitHub</a>
                            <a href="${blogURL}" class="socialStatusItem"><i class="fa fa-rss icon fa-lg"></i>Blog</a>
                        </div>
                    </div>
                </div>
        
                <div class="profileInfo">
                        <div class="container">
                            <h1 id="bio">${bio}</h1>
                            <div class="row">
                                <div class="item" id="repo">
                                    <h2 class="itemText">Public Repositories</h2>
                                    <h3 class="itemText">${publicRepoNumber}</h3>
                                </div>
                                <div class="item" id="followers">
                                    <h2 class="itemText">Followers</h2>
                                    <h3 class="itemText">${numberOfFollowers}</h3>
                                </div>
                            </div>
                        </div>
        
                        <div class="row">
                            <div class="item" id="githubStars">
                                <h2 class="itemText">GitHub Stars</h2>
                                <h3 class="itemText">${numberOfStars}</h3>
                            </div>
                            <div class="item" id="following">
                                <h2 class="itemText">Following</h2>
                                <h3 class="itemText">${followingNumber}</h3>
                            </div>
                        </div>
                </div>
            </div>
        </body>
        </html>
    `;

    return html;
}

module.exports = htmlTemplate;