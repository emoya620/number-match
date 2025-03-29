// Hardcoded array of images for our game
const images = [
    {path: "images/gameImages/image1.jpg", type: "bell peppers", answer: 8},
    {path: "images/gameImages/image2.jpg", type: "zebras", answer: 3},
    {path: "images/gameImages/image3.jpg", type: "candles", answer: 6},
    {path: "images/gameImages/image4.jpg", type: "donuts", answer: 9},
    {path: "images/gameImages/image5.jpg", type: "carrots", answer: 7},
    {path: "images/gameImages/image6.jpg", type: "chickens", answer: 4},
    {path: "images/gameImages/image7.jpg", type: "ice cream cones", answer: 8},
    {path: "images/gameImages/image8.jpg", type: "polar bears", answer: 3},
    {path: "images/gameImages/image9.jpg", type: "pencils", answer: 12},
    {path: "images/gameImages/image10.jpg", type: "bananas", answer: 6}
]

const ROUND_LIMIT = 5;
const timerContainer = document.getElementById("timer-container");
const imageContainer = document.getElementById("image-container");
const gameStateContainer = document.getElementById("game-state-container");
const activeGameContainer = document.getElementById("active-game-container");
const playBtn = document.querySelector(".play-btn");

let imageMap = new Map();
let userScore;
let round;
let timerInterval;
let imageObj;
let currentDisplayedCount;

// Function for starting a new game
function startGame(){
    imageMap = new Map();
    userScore = 0;
    round = 0;
    imageObj = {};
    currentDisplayedCount = 0;
    gameStateContainer.innerHTML = "";
    renderNextGameState();
}

// Function for statring a game timer for a new round
function startTimer(){
    let time = 3;
    timerContainer.innerHTML = `<p id="timer-el"> <b> Timer: </b> ${time}s </p>`;

    timerInterval = setInterval(() => {
        time--;
        timerContainer.innerHTML = `<p id="timer-el"> <b> Timer: </b> ${time}s </p>`;

        if (time <= 0){
            clearInterval(timerInterval);
            renderNextGameState()
        }
    }, 1000)
}

// Function that randomly selects an image from the images array that hasn't been selected before
function getRandomImage(seen) {
    let randomIndex = Math.floor(Math.random() * images.length);
    while(seen.has(randomIndex)){
        randomIndex = Math.floor(Math.random() * images.length);
    }
    seen.set(randomIndex, true);
    return images[randomIndex];
}

// Function that updates user's score based on their guess and displayed count
function updateScore(guess){
    if (guess === true && imageObj.answer === currentDisplayedCount){
        userScore++;
    }
    else if (guess === false && imageObj.answer !== currentDisplayedCount){
        userScore++;
    }
}

// Function that renders the next state of a game
function renderNextGameState(guess){
    clearInterval(timerInterval);
    
    if (round < ROUND_LIMIT){
        // Update score if the user previously made a guess
        if (round > 0 && guess !== null){
            updateScore(guess);
        }

        // Generate a random image for the next game state
        imageObj = getRandomImage(imageMap);
        imageContainer.innerHTML = `<img id="game-image" src="${imageObj.path}" alt="Image containing multiple objects">`;
        
        // Generate a random count of objects for the current image
        let randomizer = Math.floor(Math.random() * 3);
        if (randomizer === 0){
            currentDisplayedCount = imageObj.answer;
        }
        else if (randomizer === 1){
            currentDisplayedCount = imageObj.answer - 1;
        }
        else{
            currentDisplayedCount = imageObj.answer + 1;
        }

        // Display information related to current game state
        activeGameContainer.innerHTML = 
            `<p id="number-text"> This image contains <b> ${currentDisplayedCount} </b> ${imageObj.type} </p>
                <div id="btn-container">
                    <button id="yes-btn"> YES </button>
                    <button id="no-btn"> NO </button>
                </div>
            <p id="user-score"> <b> Score: </b> ${userScore}/5 </p>`;

        // Add event listeners to the newly created buttons
        const noBtn = document.getElementById("no-btn");
        const yesBtn = document.getElementById("yes-btn");
        yesBtn.addEventListener("click", function(){renderNextGameState(true);});
        noBtn.addEventListener("click", function(){renderNextGameState(false);});

        startTimer();
        round++;
    }
    else{
        // Once the game has concluded, render the end of game information
        updateScore(guess);
        timerContainer.innerHTML = "";
        imageContainer.innerHTML = "";
        activeGameContainer.innerHTML = "";
        gameStateContainer.innerHTML = `<h1 class="game-state" id="game-over-text"> Game Over! </h1>
                                        <p id="final-score-text"> Your final score is: ${userScore}/5 </p>
                                        <button class="play-btn" id="play-again-btn"> PLAY AGAIN </button>`;

        const playAgainBtn = document.querySelector(".play-btn");
        playAgainBtn.addEventListener("click", startGame);
    }
}

// Event listeners
playBtn.addEventListener("click", startGame);