//collect user input
//1. deposit some money
//2. determine no of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again


//user will enter a certain amount(using the package we made)
//import that package(json) of getting user inputs
const prompt = require("prompt-sync")(); //this () at the end,will give you access to the func where we get user inputs

//define number of rows ,columns(reels) and symbols(frequency and value of each) in the slot machine
//let's make global variables for that. They normally go in the top of the program bcs easy to see and change
const ROWS = 3; //const variables are in capital
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2, //SYMBOLS_COUNT["A"] ->2
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}

//1. deposit some money
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
};

//3. collect a bet amount(basd on the balance of the user)
const getBet = (balance,lines)=>{ //bet is distributed among multiple lines
    while(true) {
        const bet = prompt("Enter the total bet per line: ")//prompt like print
        const numberBet = parseFloat(bet); //convert the bet amount into int or floating point value

        if (isNaN(numberBet)|| numberBet<=0 || numberBet > balance/lines){ //isNaN-this func say "is not a number?"
            console.log("Invalid bet, try again.")
        }else{
            return numberBet;
        }
    }
};

//4. spin the slot machine
const spin =()=>{
    //generate the reels or the columns
    // fist add those symbols and thier count to a list or a array and randomly select from it while removing the one that chose
    const symbols=[];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count ;i++){
            symbols.push(symbol);
        }
    }
    
    const reels=[];//arrays inside of an array(each array represents a column in our slot machine)
    for(let i=0;i<COLS; i++){//each reel or colun
        reels.push([]);
        const reelSymbols=[...symbols];//we need a copy of the array we made as we remove symboles after choosing
        for (let j=0;j<ROWS;j++){//row in each column
            const randomIndex=Math.floor(Math.random() *reelSymbols.length);//randomly select elements  (Math.floor- round-down to the nearest whole number)
            const selectedSymbol= reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);//we remove that symbol (1 by 1)so we don't select it again
        }
    }
    return reels;
};

//Our reels are initially looks like this
//   C1        C2       C3
//[[A,B,C], [D,D,D], [A,A,A]]
// So we need to transpose our array to be vertical
//[A D A]
//[B D A]
//[C D A]
const transpose =(reels)=>{
    const rows = [];

    for(let i=0; i <ROWS; i++){
        rows.push([])
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

//show the slot machine reels to the user in a styled way
//A | B | C
const printRows =(rows)=>{
    for (const row of rows){
        let rowString = "";
        for( const [i, symbol] of row.entries()) {
            rowString+=symbol
            if(i!= row.length-1){
                rowString+=" | "
            }
        }
        console.log(rowString)
    }
};

//5. check if the user won
const getWinnings=(rows, bet, lines) => {
    let winnings=0;

    for (let row=0; row < lines; row++){ // if the line is 1 , we only going to look at the row 1, if lines is 3, then we look for all the rows
        const symbols = rows[row];
        let allSame= true;

        for (const symbol of symbols){
            if(symbol != symbols[0]){// we gonna compare with the fisrt symbol always
                allSame=false;
                break;// finish iterating
            }
        }

        if(allSame){
            winnings+= bet* SYMBOL_VALUES[symbols[0]]// in this case we know all symbols are the same ,so we can consider the 1st symbol
        }
    }
    return winnings;
}

//must define before i call the funcs
let balance=deposit();//starting balance is equal to the amount they deposited (let-agjust the value of the variable , not like const)
const numberOfLines=getNumberOfLines();
const bet=getBet(balance, numberOfLines);
const reels=spin();
const rows=transpose(reels);
printRows(rows);
const winnings=getWinnings(rows,bet,numberOfLines)
console.log("You won, $" + winnings.toString())