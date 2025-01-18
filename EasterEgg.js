// Initial game setup
let gameContainer = document.getElementById('game-container');
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let scoreElement = document.getElementById('score');

let gameOver = false;
let score = 0;
let isJumping = false;
let lastObstacleTime = 0;
let obstacleInterval = Math.random() * 1000 + 1000;

// Create the player
let player = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    color: 'green',
    velocityY: 0,
    gravity: 0.2,
    jumpForce: -7
};

// Create obstacles
let obstacles = [];

function createObstacle() {
    let height = Math.floor(Math.random() * 30) + 20;
    let obstacle = {
        x: canvas.width,
        y: canvas.height - height,
        width: 20,
        height: height,
        color: 'red'
    };
    obstacles.push(obstacle);
}

// Update game elements
function updateGame() {
    if (gameOver) {
        alert("Game Over! Your score: " + score);
        resetGame();
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player physics
    if (isJumping) {
        player.velocityY = player.jumpForce;
        isJumping = false;
    }

    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Prevent falling below the ground
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
    }

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move and draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.x -= 2; // Adjust speed for smoother gameplay

        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Check for collision
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameOver = true;
        }

        // Remove obstacles that have gone off screen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            score += 10;
            scoreElement.textContent = "Score: " + score;
        }
    }

    // Add new obstacles periodically
    if (Date.now() - lastObstacleTime > obstacleInterval) {
        createObstacle();
        lastObstacleTime = Date.now();
        obstacleInterval = Math.random() * 1000 + 1000; // Recalculate the interval
    }

    // Repeat the update
    if (!gameOver) {
        requestAnimationFrame(updateGame);
    }
}

// Start game loop
function startGame() {
    gameOver = false;
    score = 0;
    scoreElement.textContent = "Score: " + score;
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    obstacles = [];
    lastObstacleTime = Date.now();
    gameContainer.classList.remove('hidden');
    updateGame();
}

// Reset game state
function resetGame() {
    gameContainer.classList.add('hidden');
    gameOver = true;
}

// Trigger game on secret action (e.g., clicking the name)
document.querySelector('h1').addEventListener('click', function () {
    startGame(); // Start the game when the name is clicked
});

// Close the game when the close button is clicked
document.getElementById('close-game').addEventListener('click', function () {
    resetGame();
});

// Jump on spacebar press
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && player.y === canvas.height - player.height) {
        isJumping = true;
    }
});