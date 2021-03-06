/*----- constants -----*/
const players = {
    "1": "Red",
    "-1": "Yellow",
    "0": "white",
}


/*----- app's state (variables) -----*/
let turn, winner, columns, moves;

let board = [
    [0, 0, 0, 0, 0, 0], //column 0
    [0, 0, 0, 0, 0, 0], //column 1
    [0, 0, 0, 0, 0, 0], //column 2
    [0, 0, 0, 0, 0, 0], //column 3
    [0, 0, 0, 0, 0, 0], //column 4
    [0, 0, 0, 0, 0, 0], //column 5
    [0, 0, 0, 0, 0, 0], //column 6
]

let scores = {
    "1": 0,
    "-1": 0,
}

/*----- sounds -----*/

let coinDrop = new Audio('coindrop.wav');
let winSound = new Audio('party.mp3');
winSound.volume = 0.1;



/*----- cached element references -----*/
let column0 = document.querySelectorAll("#col0 > div");
let column1 = document.querySelectorAll("#col1 > div");
let column2 = document.querySelectorAll("#col2 > div");
let column3 = document.querySelectorAll("#col3 > div");
let column4 = document.querySelectorAll("#col4 > div");
let column5 = document.querySelectorAll("#col5 > div");
let column6 = document.querySelectorAll("#col6 > div");

let buttons = document.querySelectorAll(".button");

let turnWinner = document.getElementById("turnWinner");
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
    moves = 0;
    for (i = 0; i < board.length; i++) {
        for (n = 0; n < board[i].length; n++) {
            board[i][n] = 0;
        }
    }
    render();
}

function handleClick(event) {
    if (turn === 1) {
        currentColumn = event.target;
        if (currentColumn.classList.contains("btn0")) {
            checkColumn(board[0]);
            render();
        }
        else if (currentColumn.classList.contains("btn1")) {
            checkColumn(board[1]);
            render();
        }
        else if (currentColumn.classList.contains("btn2")) {
            checkColumn(board[2]);
            render();
        }
        else if (currentColumn.classList.contains("btn3")) {
            checkColumn(board[3]);
            render();
        }
        else if (currentColumn.classList.contains("btn4")) {
            checkColumn(board[4]);
            render();
        }
        else if (currentColumn.classList.contains("btn5")) {
            checkColumn(board[5]);
            render();
        }
        else if (currentColumn.classList.contains("btn6")) {
            checkColumn(board[6]);
            render();
        }
    }
    if(turn === -1) {
        smartAI();
        render();
    }
}

function smartAI() {
    while(turn === -1) {
        // for (col = 0; col < 7; col++) { //check vertical
        //     for (row = 0; row < 6; row++) {
        //         if(board[col][row] === 1 && col !== 6){
        //             col += 1; 
        //         }
        //         else if (board[col][row] === -1) {
        //             checkColumn(board[col]);
        //             return;
        //         }
        //         else if(row == 5 && col == 6){
        //             checkColumn(board[getRandomInt(7)]);
        //             return;
        //         } 
        //     } 
        // }
        checkColumn(board[getRandomInt(7)]);
        if(winner !== 0){
            break;
        }

    }
}

function checkColumn(array) {
    for (i = array.length - 1; i >= 0; i--) {
        if (array[i] === 0 && winner === 0) {
            array[i] = turn;
            winner = checkWinner();
            turn *= -1;
            moves += 1;
            return;
        }
    }
}


function checkWinner() {
    if(winner === 0) {
        for (col = 0; col < 7; col++) { //check vertical
            for (row = 0; row < 3; row++) {
                if (checkFour(board[col][row], board[col][row + 1], board[col][row + 2], board[col][row + 3])) {
                    winSound.play();
                    scores[turn] += 1;
                    return turn;
                }
            }
        }
        for (col = 0; col < 4; col++) { //check horizontal 
            for (row = 0; row < 6; row++) {
                if (checkFour(board[col][row], board[col + 1][row], board[col + 2][row], board[col + 3][row])) {
                    winSound.play();
                    scores[turn] += 1;
                    return turn;
                }
            }
        }
        for (col = 0; col < 4; col++) { //check dia-right 
            for (row = 0; row < 3; row++) {
                if (checkFour(board[col][row], board[col + 1][row + 1], board[col + 2][row + 2], board[col + 3][row + 3])) {
                    winSound.play();
                    scores[turn] += 1;
                    return turn;
                }
            }
        }
        for (col = 0; col < 4; col++) { //check dia-left 
            for (row = 3; row < 6; row++) {
                if (checkFour(board[col][row], board[col + 1][row - 1], board[col + 2][row - 2], board[col + 3][row - 3])) {
                    winSound.play();
                    scores[turn] += 1;
                    return turn;
                }
            }
        }
    return 0;
    }
}

function checkFour(sq1, sq2, sq3, sq4) {
    return ((sq1 !== 0) && (sq1 == sq2) && (sq1 == sq3) && (sq1 == sq4));
}

function render() {
    if (winner !== 0) {
        turnWinner.innerHTML = (players[winner] + " wins!");
    } else if (winner === 0 && moves === 42) {
        turnWinner.innerHTML = "It's a Tie!"
    } else {
        turnWinner.innerHTML = (players[turn] + "'s turn");
    }
    for (i = 0; i < board.length; i++) {
        for (n = board[i].length - 1; n >= 0; n--) {
            if (board[i][n] === 1 && board[i][n] !== 0) {
                columns[i][n].style.backgroundColor = players[1];
                coinDrop.play();
            }
            else if (board[i][n] === -1 && board[i][n] !== 0) {
                columns[i][n].style.backgroundColor = players[-1];
                coinDrop.play();
            }
            else {
                columns[i][n].style.backgroundColor = players[0];
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  