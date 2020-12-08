/*----- constants -----*/
const players = {
    "1": "red",
    "-1": "yellow",
    "0": "white",
}

const winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  

/*----- app's state (variables) -----*/
let turn, winner, columns;

let board = [
    [0, 0, 0, 0, 0, 0], //column 0
    [0, 0, 0, 0, 0, 0], //column 1
    [0, 0, 0, 0, 0, 0], //column 2
    [0, 0, 0, 0, 0, 0], //column 3
    [0, 0, 0, 0, 0, 0], //column 4
    [0, 0, 0, 0, 0, 0], //column 5
    [0, 0, 0, 0, 0, 0], //column 6
]

/*----- cached element references -----*/
let column0 = document.querySelectorAll("#col0 > div");
let column1 = document.querySelectorAll("#col1 > div");
let column2 = document.querySelectorAll("#col2 > div");
let column3 = document.querySelectorAll("#col3 > div");
let column4 = document.querySelectorAll("#col4 > div");
let column5 = document.querySelectorAll("#col5 > div");
let column6 = document.querySelectorAll("#col6 > div");

let buttons = document.querySelectorAll(".button");

let turnCounter = document.getElementById("turnWinner");
let restart = document.getElementById("restart");

columns = [
    column0,
    column1,
    column2,
    column3,
    column4,
    column5,
    column6
];




/*----- event listeners -----*/
// board.forEach(square => square.addEventListener("click", handleClick));
restart.addEventListener("click", initalise);
buttons.forEach(button => button.addEventListener("click", handleClick)); 




/*----- functions -----*/

initalise();

function initalise() {
    turn = 1;
    winner = 0;
    for(i= 0; i < board.length; i++) {
        for(n = 0; n < board[i].length; n++) {
            board[i][n] = 0;
        }
    }
    render();
}

function handleClick(event) {
    currentColumn = event.target.innerHTML;
    if(currentColumn == "Column 0") {
        checkColumn(board[0]);
        winner = checkWinner();
        turn *= -1;
        render();
    }
    else if(currentColumn == "Column 1") {
        checkColumn(board[1]);
        winner = checkWinner();
        turn *= -1;
        render();
    }
    else if(currentColumn == "Column 2") {
        checkColumn(board[2]);
        winner = checkWinner();
        turn *= -1;
        render();
    }
    else if(currentColumn == "Column 3") {
        checkColumn(board[3]);
        winner = checkWinner();
        turn *= -1;
        render();
    }
    else if(currentColumn == "Column 4") {
        checkColumn(board[4]);
        winner = checkWinner();
        turn *= -1;
        render();
    }
    else if(currentColumn == "Column 5") {
        checkColumn(board[5]);
        winner = checkWinner();
        turn *= -1;
        render();
    }
    else if(currentColumn == "Column 6") {
        checkColumn(board[6]);
        winner = checkWinner();
        turn *= -1;
        render();
    }
    
}

function checkColumn(array) {
    for(i = array.length-1; i >= 0; i--) {
        if(array[i] === 0) {
            array[i]= turn;
            return;
        }
    }
}


function checkWinner() {
    for(i = 1; i < board.length-1; i++) {
        for(n = 1; n < board[i].length-1; n++) {
            if(board[i][n] === board[i-1][n-1] && board[i][n] !== 0) { //top left 
                return turn;
            }
            else if(board[i][n] === board[i][n-1] && board[i][n] !== 0) { //top middle 
                return turn;
            }
            else if(board[i][n] === board[i+1][n-1] && board[i][n] !== 0) { //top right 
                return turn;
            }
            else if(board[i][n] === board[i-1][n] && board[i][n] !== 0) { //left 
                return turn;
            }
            else if(board[i][n] === board[i+1][n] && board[i][n] !== 0) { //right 
                return turn;
            }
            else if(board[i][n] === board[i-1][n+1] && board[i][n] !== 0) { //bottom left 
                return turn;
            }
            else if(board[i][n] === board[i][n+1] && board[i][n] !== 0) { //bottom middle 
                return turn;
            }
            else if(board[i][n] === board[i+1][n+1] && board[i][n] !== 0) { //bottom right 
                return turn;
            }
        }
    }
    for(i = 0; i < board.length-1; i++) {
        if(board[i][0] === board[i+1][0] && board[i+1][0] !== 0) { // top row
            return turn;
        }
        else if (board[i][5] === board[i+1][5] && board[i+1][5] !== 0) { //bottom row
            return turn;
        }
    }
    for(n = 0; n < board.length-1; n++) {
        if(board[0][n] === board[0][n+1] && board[0][n+1] !== 0) { // left most row
            return turn;
        }
        else if (board[6][n] === board[6][n+1] && board[6][n+1] !== 0) { //bottom row
            return turn;
        }
    }
    return 0;
}


function render() {
    if(winner !== 0) {
        turnCounter.innerHTML = (players[winner] + " won!");
    }
    else {
        turnCounter.innerHTML = (players[turn] + "'s turn");
    }
    for(i = 0; i < board.length; i++) {
        for(n = board[i].length-1; n >= 0; n--) {
            if(board[i][n] === 1 && board[i][n] !== 0) {
                columns[i][n].style.backgroundColor = players[1];
            }
            else if (board[i][n] === -1 && board[i][n] !== 0) {
                columns[i][n].style.backgroundColor = players[-1];
            }
            else { 
                columns[i][n].style.backgroundColor = players[0]; 
            }
        }
    }
}