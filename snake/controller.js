document.onkeydown = function(e) {
	var keys = {
		38: 'up',
		40: 'down',
		37: 'left',
		39: 'right',
		13: 'enter'
	};
	var dx = 0, dy = 0;

	switch (keys[e.keyCode]) {
		case 'up':
			dy = 1;
			break;
		case 'down':
			dy = -1;
			break;
		case 'left':
			dx = -1;
			break;
		case 'right':
			dx = 1;
			break;
		case 'enter':
			init();
			render();
			integrate();
			return;
		default:
			return;
	}

	if (playing) {
		if (dx * speed.x != 0 ||
			dy * speed.y != 0) {
			return;
		}

		speed = {
			x: dx,
			y: dy
		};
	}
};