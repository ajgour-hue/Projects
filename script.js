const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('#restart-btn');
const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

const board = document.querySelector('.board');
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let blocks = [];
let intervalId = null;
let timerIntervalId = null;
let direction = "";
let score = 0 ;
let highScore = localStorage.getItem("highScore") || 0;
let time = `00-00`;
highScoreElement.innerText = highScore;

let snake = [{ x: 1, y: 3 }];


let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
};

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}


// render function
function render() {
    blocks[`${food.x}-${food.y}`].classList.add("food");

    if (direction === "") return;

    let head = { ...snake[0] };

    if (direction === "left") head.y--;
    if (direction === "right") head.y++;
    if (direction === "up") head.x--;
    if (direction === "down") head.x++;

    
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId);

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";

        return;
    }

   
    // fooood logic
    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
        snake.unshift(head);
        
    score += 10 ;
    scoreElement.innerText = score;

if (score > highScore) {
    highScore = score;
 highScoreElement.innerText = highScore;
    localStorage.setItem("highScore", highScore.toString());  
}


    } else {
        snake.forEach(seg => blocks[`${seg.x}-${seg.y}`].classList.remove("fill"));
        snake.unshift(head);
        snake.pop();
    }


    snake.forEach(seg => blocks[`${seg.x}-${seg.y}`].classList.add("fill"));
}

// start ka kaam yaha hai
startButton.addEventListener("click", () => {
    modal.style.display = "none";
    direction = "";
    intervalId = setInterval(render, 300);
});

// restar ka kaam yaha
restartButton.addEventListener("click", () => {

    clearInterval(intervalId);

    
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(s => blocks[`${s.x}-${s.y}`].classList.remove("fill"));

    score = 0 ;
    time = `00-00`;
    scoreElement.innerHTML = score;
    timeElement.innerHTML  = time;
    highScoreElement.innerHTML = highScore;
//    nayi value
    snake = [{ x: 1, y: 3 }];
    direction = "";
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };

    modal.style.display = "none";
    gameOverModal.style.display = "none";

    intervalId = setInterval(render, 300);
});




// ham keyboard se input de rhe h up do ka
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") direction = "up";
    if (event.key === "ArrowDown") direction = "down";
    if (event.key === "ArrowLeft") direction = "left";
    if (event.key === "ArrowRight") direction = "right";
});
