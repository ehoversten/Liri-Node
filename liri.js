// for (i = 4; i < process.argv.length; i++) {
//     var bandName = bandName + process.argv[i] + "+";
// }

// if (!process.argv[3]) {
//     var bandName = "Backstreet+Boys";
// }


var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
            type: "input",
            message: "What is your name?",
            name: "username"
        },
        // Here we create a basic password-protected text prompt.
        {
            type: "password",
            message: "Set your password",
            name: "password"
        },
        // Here we give the user a list to choose from.
        {
            type: "list",
            message: "Which Bourbon do you choose?",
            choices: ["Jack Daniels", "Four Roses", "Bookers"],
            name: "bourbon"
        },
        // Here we ask the user to confirm.
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
    .then(function (inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.confirm) {
            console.log("\nWelcome " + inquirerResponse.username);
            console.log("Your " + inquirerResponse.bourbon + " is ready to drink!\n");
        }
        else {
            console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
        }
    });
