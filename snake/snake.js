var ROWS = 50;
var COLUMNS = 50;
var START_SNAKE_LEN = 5;
var GAME_SPEED = 50;

var timeouts = [];
var playing = false;
var fruit;

function inSnake(pos) {
	var inSnakePart = snake.map(function(part) {
		return part.x == pos.x && part.y == pos.y;
	});

	var inSnake = false;
	inSnake = inSnakePart.reduce(function(acc, crtVal) {
		return acc || crtVal;
	}, inSnake);


	return inSnake;
}

function newFruit() {
	do {
		fruit = {
			x: Math.floor(Math.random() * COLUMNS),
			y: Math.floor(Math.random() * ROWS)
		};
	} while(inSnake(fruit));
}

var snake = [];
var speed;

function lose() {
	playing = false;
	render();
	timeouts.map(clearTimeout);
	timeouts = [];
}

function validPos(pos) {
	var insideBox =
		pos.x >= 0 &&
		pos.y >= 0 &&
		pos.x < COLUMNS &&
		pos.y < ROWS;

	return insideBox && !inSnake(pos);
}

function init() {
	timeouts.map(clearTimeout);
	timeouts = [];

	snake = [];
	speed = {
		x: 1,
		y: 0
	};
	newFruit();

	for (var i = 0; i < START_SNAKE_LEN; i++) {
		snake.push({
			x: Math.floor(COLUMNS / 2) - i,
			y: Math.floor(ROWS / 2)
		})
	}

	playing = true;
}

function integrate() {
	var head = snake[0];

	var dx = speed.x,
		dy = speed.y;

	var newPosition = {
		x: head.x + dx,
		y: head.y + dy
	};

	if (!validPos(newPosition)) {
		lose();
		return;
	}

	if (playing) {
		snake.unshift(newPosition);

		if (inSnake(fruit)) {
			newFruit();
		}
		else {
			snake.pop();
		}
	}

	var to = setTimeout(integrate, GAME_SPEED);
	timeouts.pop();
	timeouts.push(to);
}