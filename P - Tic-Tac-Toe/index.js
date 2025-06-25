// all BOX Elements
let b1El = document.getElementById("b1");
let b2El = document.getElementById("b2");
let b3El = document.getElementById("b3");
let b4El = document.getElementById("b4");
let b5El = document.getElementById("b5");
let b6El = document.getElementById("b6");
let b7El = document.getElementById("b7");
let b8El = document.getElementById("b8");
let b9El = document.getElementById("b9");

let currentPlayer = "X"; // starting player
let gameActive = true;   // game status - false when game ends 

// Function to check for a winner
function checkWinner() {

    // case - WIN

    // Check rows - 1/2/3 - 4/5/6 - 7/8/9
    if (b1El.textContent === currentPlayer && b2El.textContent === currentPlayer && b3El.textContent === currentPlayer) {
        return true;
    }
    if (b4El.textContent === currentPlayer && b5El.textContent === currentPlayer && b6El.textContent === currentPlayer) {
        return true;
    }
    if (b7El.textContent === currentPlayer && b8El.textContent === currentPlayer && b9El.textContent === currentPlayer) {
        return true;
    }

    // Check columns - 1/4/7 - 2/5/8 - 3/6/9
    if (b1El.textContent === currentPlayer && b4El.textContent === currentPlayer && b7El.textContent === currentPlayer) {
        return true;
    }
    if (b2El.textContent === currentPlayer && b5El.textContent === currentPlayer && b8El.textContent === currentPlayer) {
        return true;
    }
    if (b3El.textContent === currentPlayer && b6El.textContent === currentPlayer && b9El.textContent === currentPlayer) {
        return true;
    }

    // Check diagonals - 1/5/9 - 3/5/7
    if (b1El.textContent === currentPlayer && b5El.textContent === currentPlayer && b9El.textContent === currentPlayer) {
        return true;
    }
    if (b3El.textContent === currentPlayer && b5El.textContent === currentPlayer && b7El.textContent === currentPlayer) {
        return true;
    }

    return false; // No winner
}

// case - DRAW MATCH

function checkDraw() {

    if (
        b1El.textContent !== "" &&
        b2El.textContent !== "" &&
        b3El.textContent !== "" &&
        b4El.textContent !== "" &&
        b5El.textContent !== "" &&
        b6El.textContent !== "" &&
        b7El.textContent !== "" &&
        b8El.textContent !== "" &&
        b9El.textContent !== "") {

            return true;
        
    }

    return false;
}

// click event
// box - box elements

function handleClick(box) {
    if (gameActive && box.textContent === "") {  // when game is active and the box value is empty

        // the following data will be added in the value of the box

        box.textContent = currentPlayer;
        box.style.fontSize = "70px";
        box.style.textAlign = "center";
        box.style.padding = "40px";
        box.style.fontWeight = "lighter";

        if (checkWinner()) {     // winning case

            alert(currentPlayer + " wins!");
            gameActive = false;  // game ends

        } else if (checkDraw()) {  // draw case

            alert("It's a draw!");
            gameActive = false;  // game ends

        } else {

            // Switch player
            if (currentPlayer === "X") {

                currentPlayer = "O";

            } else {

                currentPlayer = "X";

            }

        }
    }
}

// Add event listeners to each box
b1El.addEventListener("click", function () {
    handleClick(b1El);
});

b2El.addEventListener("click", function () {
    handleClick(b2El);
});

b3El.addEventListener("click", function () {
    handleClick(b3El);
});

b4El.addEventListener("click", function () {
    handleClick(b4El);
});

b5El.addEventListener("click", function () {
    handleClick(b5El);
});

b6El.addEventListener("click", function () {
    handleClick(b6El);
});

b7El.addEventListener("click", function () {
    handleClick(b7El);
});

b8El.addEventListener("click", function () {
    handleClick(b8El);
});

b9El.addEventListener("click", function () {
    handleClick(b9El);
});

// Reset button logic
let resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function () {

    b1El.textContent = "";
    b2El.textContent = "";
    b3El.textContent = "";
    b4El.textContent = "";
    b5El.textContent = "";
    b6El.textContent = "";
    b7El.textContent = "";
    b8El.textContent = "";
    b9El.textContent = "";

    // Reset style

    let allBoxes = [b1El, b2El, b3El, b4El, b5El, b6El, b7El, b8El, b9El];

    for (let i = 0; i < allBoxes.length; i++) {

        allBoxes[i].style.fontSize = "";
        allBoxes[i].style.textAlign = "";
        allBoxes[i].style.paddingTop = "";
        allBoxes[i].style.fontWeight = "";

    }

    currentPlayer = "X";

    gameActive = true;

});













