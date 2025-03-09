const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("startButton");
const gameOverText = document.getElementById("gameOver");
let score = 0;
let basketX = gameArea.clientWidth / 2 - basket.clientWidth / 2;
const basketSpeed = 20;
let gameInterval;
let gameOver = false;

document.addEventListener("keydown", (e) => {
    if (!gameOver) {
        if (e.key === "ArrowLeft" && basketX > 0) {
            basketX -= basketSpeed;
        } else if (e.key === "ArrowRight" && basketX < gameArea.clientWidth - basket.clientWidth) {
            basketX += basketSpeed;
        }
        basket.style.left = basketX + "px";
    }
});

function createFallingObject() {
    if (gameOver) return;
    
    const obj = document.createElement("div");
    obj.classList.add("fallingObject");
    obj.style.left = Math.random() * (gameArea.clientWidth - 40) + "px";
    gameArea.appendChild(obj);
    
    let fallInterval = setInterval(() => {
        obj.style.top = (parseInt(obj.style.top) || 0) + 5 + "px";
        
        const objBottom = obj.offsetTop + obj.clientHeight;
        const objLeft = obj.offsetLeft;
        const objRight = objLeft + obj.clientWidth;
        const basketTop = basket.offsetTop;
        const basketLeft = basketX;
        const basketRight = basketLeft + basket.clientWidth;

        if (objBottom >= basketTop && objLeft < basketRight && objRight > basketLeft) {
            clearInterval(fallInterval);
            score++;
            scoreDisplay.textContent = score;
            obj.remove();
        } else if (objBottom >= gameArea.clientHeight) {
            clearInterval(fallInterval);
            endGame();
            obj.remove();
        }
    }, 50);
}

function endGame() {
    clearInterval(gameInterval);
    gameOver = true;
    gameOverText.style.display = "block";
    document.querySelectorAll(".fallingObject").forEach(obj => obj.remove());
}

startButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = score;
    gameOver = false;
    gameOverText.style.display = "none";
    gameInterval = setInterval(createFallingObject, 1000);
});
