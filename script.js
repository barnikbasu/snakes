// --- NEW: SOUND EFFECTS ---
const eatSound = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
const deadSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
const moveSound = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');

// 1. Inside the direction(event) function:
function direction(event) {
    let oldD = d;
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
    
    // Play move sound if direction actually changed
    if (oldD !== d) moveSound.play(); 
}

// 2. Inside the draw() function where the snake eats food:
if(snakeX == food.x && snakeY == food.y) {
    score++;
    eatSound.play(); // Play eat sound
    scoreElement.innerHTML = score;
    // ... (rest of your food logic)
}

// 3. Inside the draw() function where the Game Over happens:
if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
    clearInterval(gameLoop);
    deadSound.play(); // Play dead sound
    
    // Slight delay before alert so the sound can play
    setTimeout(() => {
        alert("Game Over! Score: " + score);
        location.reload();
    }, 100);
}
