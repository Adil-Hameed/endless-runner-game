const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    color: 'white'
};

let obstacles = [];
let stars = [];
let level = 1;
let score = 0;
let obstacleSpeed = 2; // Start with slower obstacle speed
let obstacleSpawnDelay = 1500; // Initial delay between obstacles (in ms)
let lastObstacleTime = 0;
let obstaclesPassed = 0; // Tracks how many obstacles the player has passed

// Create stars for background decoration
function createStars() {
    for (let i = 0; i < 50; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
        });
    }
}

// Draw stars
function drawStars() {
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
}

// Draw the player (spaceship)
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Move the player
function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Boundary detection
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Create an obstacle
function createObstacle() {
    const obstacle = {
        x: Math.random() * canvas.width,
        y: -50, // Start above the screen
        width: 50,
        height: 50,
        speed: obstacleSpeed // Speed is dynamic
    };
    obstacles.push(obstacle);
}

// Draw obstacles
function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Move obstacles
function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacle.speed;

        // Remove obstacle if it goes off the screen
        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1); // Remove obstacle
            score += 1; // Increase score by 1 for each obstacle passed
            obstaclesPassed += 1; // Track passed obstacles
        }

        // Collision detection between player and obstacles
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameOver();
        }
    });
}

// Display score and level
function displayScore() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 20, 40);
    ctx.fillText(`Level: ${level}`, 20, 70);
}

// Game over function
function gameOver() {
    alert('Game Over! Your score: ' + score);
    resetGame();
}

// Reset the game
function resetGame() {
    player.x = canvas.width / 2;
    player.y = canvas.height - 100;
    score = 0;
    level = 1;
    obstacleSpeed = 2; // Reset obstacle speed
    obstacles = [];
    obstaclesPassed = 0;
    createObstacle(); // Start with one obstacle
}

// Increase difficulty after every few obstacles
function increaseDifficulty() {
    if (obstaclesPassed > 0 && obstaclesPassed % 10 === 0) { // Gradually increase every 10 obstacles
        obstacleSpeed += 0.2; // Small increase in speed
        obstacleSpawnDelay = Math.max(obstacleSpawnDelay - 100, 500); // Reduce delay, but keep minimum at 500ms
        level++; // Increase the level
        obstaclesPassed = 0; // Reset the count for the next difficulty increment
    }
}

// Clear the canvas for the next frame
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Gradual obstacle generation based on time
function generateObstacles(timestamp) {
    if (timestamp - lastObstacleTime > obstacleSpawnDelay) {
        createObstacle();
        lastObstacleTime = timestamp;
    }
}

// Main update function to render the game
function update(timestamp) {
    clearCanvas();
    drawStars();
    drawPlayer();
    drawObstacles();
    displayScore(); // Show the scoreboard

    movePlayer();
    moveObstacles();
    increaseDifficulty(); // Gradually increase difficulty

    generateObstacles(timestamp); // Generate new obstacles over time

    requestAnimationFrame(update);
}

// Start the game by initializing obstacles, stars, and starting the update loop
function startGame() {
    createStars();
    createObstacle();
    requestAnimationFrame(update); // Pass timestamp to the update loop
}

// Event listeners for player movement (arrow keys)
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown') {
        player.dy = player.speed;
    }
});

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        player.dx = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
});

// Start the game loop
startGame();
