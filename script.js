// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Select elements from the DOM
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

// Create a new paragraph element for restarting the game
const p = document.createElement('p');

let prevGuess = []; // Stores previous guesses
let numGuess = 1; // Counts the number of attempts
let playGame = true; // Controls game state

// Add event listener to the submit button
if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault(); // Prevents page refresh on form submit
        const guess = parseInt(userInput.value); // Convert input to number
        validateGuess(guess);
    });
}

// Function to validate the user's guess
function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a valid number between 1 and 100');
    } else {
        prevGuess.push(guess); // Store guess in array
        if (numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game Over! The correct number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

// Function to check the user's guess
function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`🎉 Congratulations! You guessed the right number!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`📉 Your guess is too LOW!`);
    } else {
        displayMessage(`📈 Your guess is too HIGH!`);
    }
}

// Function to update previous guesses and remaining attempts
function displayGuess(guess) {
    userInput.value = ''; // Clear input field
    guessSlot.innerHTML += `${guess}, `; // Display guessed numbers
    numGuess++;
    remaining.innerHTML = `${10 - numGuess}`; // Update remaining attempts
}

// Function to display messages
function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// Function to end the game and offer restart
function endGame() {
    userInput.value = ''; // Clear input field
    userInput.setAttribute('disabled', ''); // Disable input field
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false; // Disable gameplay
    newGame();
}

// Function to restart the game
function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `10`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
