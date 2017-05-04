var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var WIDTH = 600;
var HEIGHT = 600;

var BOX_WIDTH = WIDTH / ROWS;
var BOX_HEIGHT = HEIGHT / COLUMNS;

function transformX(x) {
	return WIDTH * x / COLUMNS;
}

function transformY(y) {
	return HEIGHT * (1 - (y + 1) / ROWS);
}

function renderSnake() {
	for (var i = 0; i < snake.length; i++) {
		var x = snake[i].x,
			y = snake[i].y;

		var xx = transformX(x);
		var yy = transformY(y);


		if (playing) {
			ctx.fillStyle = 'blue';
		} else {
			ctx.fillStyle = 'red';
		}
		ctx.fillRect(xx, yy, BOX_WIDTH, BOX_HEIGHT);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(xx, yy, BOX_WIDTH, BOX_HEIGHT);
	}
}

function renderFruit() {
	var xx = transformX(fruit.x),
		yy = transformY(fruit.y);

	ctx.fillStyle = 'green';
	ctx.fillRect(xx, yy, BOX_WIDTH, BOX_HEIGHT);
	ctx.strokeStyle = 'black';
	ctx.strokeRect(xx, yy, BOX_WIDTH, BOX_HEIGHT);
}

function renderText() {
	var canvas = document.getElementById('text');
	var ctx = canvas.getContext('2d');

	if (!playing) {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.font = '20px Georgia';
		ctx.fillStyle = 'green';
		ctx.fillText('Score: ' + snake.length, 10, 30);
		ctx.fillText('Press Enter to play!', 10, 60);
	} else {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.font = '20px Georgia';
		ctx.fillStyle = 'green';
		ctx.fillText('Score: ' + snake.length, 10, 30);
	}
}

function render() {
	timeouts.pop();
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	renderSnake();
	renderFruit();
	renderText();

	if (playing) {
		var to = setTimeout(render, GAME_SPEED);
		timeouts.push(to);
	}
}

renderText();