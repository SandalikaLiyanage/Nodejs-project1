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
    const depositAmount = prompt("Enter a deposit amount: ")//prompt like print
    const numberDepositAmount = parseFloat(depositAmount); //convert th deposit amount into int or floating point value
};

deposit();