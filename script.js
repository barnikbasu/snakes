const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");

const box = 20;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreElement.innerHTML = highScore;

let gameSpeed = 150; // Starting speed (ms)
let gameLoop;

let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let d;

// Control Listeners (Keyboard)
document.addEventListener("keydown", direction);

// Control Listeners (Mobile Buttons)
document.getElementById("up").addEventListener("click", () => { if(d != "DOWN") d = "UP" });
document.getElementById("down").addEventListener("click", () => { if(d != "UP") d = "DOWN" });
document.getElementById("left").addEventListener("click", () => { if(d != "RIGHT") d = "LEFT" });
document.getElementById("right").addEventListener("click", () => { if(d != "LEFT") d = "RIGHT" });

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#4CAF50" : "#8BC34A";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#FF5252";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        scoreElement.innerHTML = score;
        
        // --- FEATURE: DIFFICULTY ---
        // Speed up every 5 points, but don't go faster than 50ms
        if (score % 5 === 0 && gameSpeed > 50) {
            gameSpeed -= 10;
            clearInterval(gameLoop);
            gameLoop = setInterval(draw, gameSpeed);
        }

        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(gameLoop);
        
        // --- FEATURE: HIGH SCORE ---
        if (score > highScore) {
            localStorage.setItem("snakeHighScore", score);
            alert("New High Score: " + score);
        } else {
            alert("Game Over! Score: " + score);
        }
        
        location.reload();
    }

    snake.unshift(newHead);
}

// Start the game
gameLoop = setInterval(draw, gameSpeed);
