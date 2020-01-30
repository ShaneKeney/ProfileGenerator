# GitHub Profile Generator (command line interface)

This is a command line interface that takes a GitHub username and favorite color and then will output a PDF document showing the inputted developer profile user information.

## Project Set Up:

Fork the repo and clone your fork to a local repo using 
```
git clone ...
``` 

In the project directory run 
```
npm install
```
This will download all necessary dependencies from `package.json`

Run the command line application with
```
node index.js
```

## Inputs:

Once run using the above command the program will ask for a GitHub username and favorite color.  

The inputted username should be the username of the developer you wish to make a developer profile pdf for.

The inputted favorite color will decide a color scheme based on set default color schemes.  The following below color schemes are available as coded in `./pdfTemplate.js`.  The following cases are acceptable inputs: `red`, `green`, `pink`, `blue`.  Any input otherwise will use the `default` pdf color scheme.

```
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
```

## Outputs:

Upon finish, the program will `log` finish status and if everything was successful a pdf will be generated in the following location `./developerProfiles`.  Naming convention for each pdf will be as follows: `{username}.pdf`.
