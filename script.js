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
const imageContainer = document.getElementById("image-container");
const gameStateContainer = document.getElementById("game-state-container");
const activeGameContainer = document.getElementById("active-game-container");
const playBtn = document.querySelector(".play-btn");

let imageMap = new Map();
let userScore;
let round;
let imageObj;
let currentDisplayedCount;

function startGame(){
    imageMap = new Map();
    userScore = 0;
    round = 0;
    imageObj = {};
    currentDisplayedCount = 0;
    gameStateContainer.innerHTML = "";
    renderNextGameState();
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

function updateScore(guess){
    if (guess === true && imageObj.answer === currentDisplayedCount){
        userScore++;
    }
    else if (guess === false && imageObj.answer !== currentDisplayedCount){
        userScore++;
    }
}

function renderNextGameState(guess){
    if (round < ROUND_LIMIT){
        if (round > 0){
            console.log("HERE", guess);
            updateScore(guess);
        }

        imageObj = getRandomImage(imageMap);
        imageContainer.innerHTML = `<img id="game-image" src="${imageObj.path}" alt="Image containing multiple objects">`;
        
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

        activeGameContainer.innerHTML = 
            `<p id="number-text"> This image contains <b> ${currentDisplayedCount} </b> ${imageObj.type} </p>
                <div id="btn-container">
                    <button id="yes-btn"> YES </button>
                    <button id="no-btn"> NO </button>
                </div>
            <p id="user-score"> <b> Score: </b> ${userScore}/5 </p>`;

        const noBtn = document.getElementById("no-btn");
        const yesBtn = document.getElementById("yes-btn");
        yesBtn.addEventListener("click", function(){renderNextGameState(true);});
        noBtn.addEventListener("click", function(){renderNextGameState(false);});

        round++;
    }
    else{
        updateScore(guess);
        imageContainer.innerHTML = "";
        activeGameContainer.innerHTML = "";
        gameStateContainer.innerHTML = `<h1 class="game-state" id="game-over-text"> Game Over! </h1>
                                        <p id="final-score-text"> Your final score is: ${userScore}/5 </p>
                                        <button class="play-btn" id="play-again-btn"> PLAY AGAIN </button>`;

        const playAgainBtn = document.querySelector(".play-btn");
        playAgainBtn.addEventListener("click", startGame);
    }
}

playBtn.addEventListener("click", startGame);