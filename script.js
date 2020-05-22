let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = 'right';

let game = setInterval(initGame, 100);

document.addEventListener('keydown', update);

function createBg() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function initGame() {

    if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

    createBg();
    createSnake();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'right') snakeX += box;
    if (direction === 'left') snakeX -= box;
    if (direction === 'up') snakeY -= box;
    if (direction === 'down') snakeY += box;

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);
}

function update(event) {
    let key = event.key;

    if (key === "ArrowLeft" && direction !== 'right') direction = 'left';
    if (key === "ArrowUp" && direction !== 'down') direction = 'up';
    if (key === "ArrowRight" && direction !== 'left') direction = 'right';
    if (key === "ArrowDown" && direction !== 'up') direction = 'down';
}
