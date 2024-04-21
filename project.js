//collect user input
//1. deposit some money
//2. determine no of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again

//1. deposit some money
 //user will enter a certain amount(using the package we made)
 //import that package of getting user inputs
const prompt = require("prompt-sync")(); //this () at the end,will give you access to the func where we get user inputs
const deposit = () =>{
   while(true) {
        const depositAmount = prompt("Enter a deposit amount: ")//prompt like print
        const numberDepositAmount = parseFloat(depositAmount); //convert the deposit amount into int or floating point value

        if (isNaN(numberDepositAmount)|| numberDepositAmount<=0){ //isNaN-this func say "is not a number?"
            console.log("Invalid deposit amount, try again.")
        }else{
            return numberDepositAmount;
        }
    }
};

//2. determine no of lines to bet on
const getNumberOfLines = () =>{
    while(true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ")//prompt like print
        const numberOfLines = parseFloat(lines); //convert the lines into int or floating point value

        if (isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines > 3){ //isNaN-this func say "is not a number?"
            console.log("Invalid number of lines, try again.")
        }else{
            return numberOfLines;
        }
    }
}
 //must define before i call the funcs
const depositAmount=deposit();
const numberOfLines=getNumberOfLines();