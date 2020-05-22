'use strict'
let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
let direction = 'right';
let game = setInterval(initGame, 100);
let food = {
    x: randomPosition(),
    y: randomPosition(),
}


snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

document.addEventListener('keydown', updateDirection);

function randomPosition() {
    return Math.floor(Math.random() * 15 + 1) * box;
}

function createBox(color, x, y, width, height) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function createBg() {
    createBox('lightgreen', 0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        createBox('green', snake[i].x, snake[i].y, box, box);
    }
}

function drawFruit() {
    createBox('red', food.x, food.y, box, box);
}

function initGame() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    delimitedbox();
    createBg();
    createSnake();
    drawFruit();

    for (let i = 2; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(game);
            alert('Game over')
        }
    }

    if (direction === 'right') snakeX += box;
    if (direction === 'left') snakeX -= box;
    if (direction === 'up') snakeY -= box;
    if (direction === 'down') snakeY += box;

    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop();

    } else {
        food.x = randomPosition();
        food.y = randomPosition();
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);
}

function delimitedbox() {
    if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

}

function updateDirection(event) {
    let key = event.key;

    if (key === "ArrowLeft" && direction !== 'right') direction = 'left';
    if (key === "ArrowUp" && direction !== 'down') direction = 'up';
    if (key === "ArrowRight" && direction !== 'left') direction = 'right';
    if (key === "ArrowDown" && direction !== 'up') direction = 'down';
}
