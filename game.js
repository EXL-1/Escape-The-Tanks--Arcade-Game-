/* Sound Effects */

var gameAudio = [];
gameAudio[0] = new Audio('Sound-Effects/Game-Main-Music.mp3');
gameAudio[1] = new Audio('Sound-Effects/Count-Down.mp3');
gameAudio[2] = new Audio('Sound-Effects/Tank-Shot.mp3');
gameAudio[3] = new Audio('Sound-Effects/Tank-Shot-2.mp3');
gameAudio[4] = new Audio('Sound-Effects/Bomb-Explosion.mp3');
gameAudio[5] = new Audio('Sound-Effects/Game-Over.mp3');
gameAudio[6] = new Audio('Sound-Effects/Game Over-Music.mp3');
gameAudio[7] = new Audio('Sound-Effects/Level-Clear.mp3');
gameAudio[8] = new Audio('Sound-Effects/Lose-Life.mp3');


/* Global Variables */


var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var tagged = false;
var removelife = false;
var lastPressed = false;
var timeout = 0;
var lives = 0;
var TankSpawningspeed = 0;
var max = 0;
var score = 0;
var points = 0;
var levels = [];
levels[0] = 'Level 1';
levels[1] = 'Level 2';
levels[2] = 'Level 3';

var tanknumber = []
tanknumber[0] = 'three'
tanknumber[1] = 'four'



// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

/* Key bind release */

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	/* Player facing position */
	player.className = 'character stand ' + lastPressed;


	// cheat commands

	// - 0 on keyboard
	if (event.keyCode == 48) {
		lives = 0;
		console.log('Game Over Cheat command was executed!');
	}
	// - 9 on keyboard
	if (event.keyCode == 57) {
		tagged = true;
		console.log('Remove Life Cheat command was executed!');
		// - 8 on keyboard 
	}
	if (event.keyCode == 56) {
		addHealth();
		lives = lives + 1;
		console.log('Add Life Cheat command was executed!');
		// - 7 on keyboard
	}
	if (event.keyCode == 55) {
		tankPositions();
		console.log('Move Tank postions + etc Cheat command was executed!');
		// - 4 on keyboard 
	}
	if (event.keyCode == 52) {
		Level1();
		console.log('Set Level to lvl 1 Cheat Command was executed!');
	}
	// - 5 on keyboard 
	if (event.keyCode == 53) {
		Level2();
		console.log('Set Level to lvl 2 Cheat Command was executed!');
		// - 6 on keybord 
	}
	if (event.keyCode == 54) {
		Level3();
		console.log('Set Level to lvl 3 Cheat Command was executed!');
		// - 3 on keybord
	}
	if (event.keyCode == 51) {
		cactusPositions();
		console.log('Change Cactus positions Cheat Command was executed!');
	}
	// - 2 on keybord
	if (event.keyCode == 50) {
		wipeData();
		console.log('Wipe ScoreBoard data was executed!');
	}
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

/* Player movement / Collision Detection /and Animation walking in said direction */

function move() {
	var player = document.getElementById('player');
	var position_P_Left = player.offsetLeft;
	var position_P_Top = player.offsetTop;

	/* Down Movement*/
	if (downPressed == true) {
		var newTop = position_P_Top + 1;
		var obstacle = document.elementFromPoint(position_P_Left, newTop + 46);

		containsObstacle1(obstacle, newTop);
		player.className = 'character walk down';
	}

	/* Up Movement */
	if (upPressed == true) {
		var newTop = position_P_Top - 1;
		var obstacle = document.elementFromPoint(position_P_Left, newTop);

		containsObstacle1(obstacle, newTop);
		player.className = 'character walk up';
	}

	/* Left Movement */
	if (leftPressed == true) {
		var newLeft = position_P_Left - 1;
		var obstacle = document.elementFromPoint(newLeft, position_P_Top);

		containsObstacle2(obstacle, newLeft);
		player.className = 'character walk left';
	}

	/* Right Movement */
	if (rightPressed == true) {
		var newLeft = position_P_Left + 1;
		var obstacle = document.elementFromPoint(newLeft + 32, position_P_Top);

		containsObstacle2(obstacle, newLeft);
		player.className = 'character walk right';
	}



}

function containsObstacle1(obstacle, movementDirection) {
	var player = document.getElementById('player');
	if (obstacle.classList.contains('cactus') == false) {
		player.style.top = movementDirection + 'px';
	}

}
// JS classlist combine tank and cactus 
// issues with movement 
function containsObstacle2(obstacle, movementDirection) {
	var player = document.getElementById('player');
	if (obstacle.classList.contains('cactus') == false) {
		player.style.left = movementDirection + 'px';
	}

}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

/* Keybind press down */

function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

/* Load Function / Click to Start the game */

function myLoadFunction() {
	var level = document.getElementsByClassName('level')[0];
	level.style.display = 'none';

	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', startGame);

	var gameOverButton = document.getElementsByClassName('gameover')[0];
	gameOverButton.style.display = 'none';

	var playAgainButton = document.getElementsByClassName('playagain')[0];
	playAgainButton.style.display = 'none';

	var yourscore = document.getElementsByClassName('yourscore')[0];
	yourscore.style.display = 'none';

	var highscore = document.getElementsByClassName('highscores')[0];
	highscore.style.display = 'none';

	hideCountDown();
	playAgainButton.addEventListener('click', playAgain);
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// Click to start the game / All movement and functions start. 
function startGame() {
	var beginGame = true;

	while (beginGame == true) {
		hideStartButton();
		initiateCountDown();
		lives = lives + 3;
		var currentGame = true;
		if (currentGame == true) {
			beginGame = false;


			startActions();
			var tankspawns = setInterval(tankPositions, max);

			var IntervalCheck = setInterval(function () {
				if (tagged == true) {
					ifTagged();
					// immune period 
					setTimeout(function () {
						tagged = false;
					}, 2000)

				}
				if (removelife == true) {
					lives = lives - 1;
					removeHealth(lives);
					removelife = false;
				}
				if (lives == 0) {
					gameOver(IntervalCheck, tankspawns);
				}
				scoreCounter();
				console.log('Current lives = ' + lives + ' Max Speed = ' + max);
			}, 5000)

			currentGame = false;
			// do you want to play again if so beginGame = true
		}
	}

}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

function cactusPositions() {
	var cactus = document.getElementsByClassName('cactus');

	for (var i = 0; i < cactus.length; i++) {
		var random1 = Math.floor(Math.random() * 70);
		var random2 = Math.floor(Math.random() * 100);
		cactus[i].style.top = random1 + 'vh';
		cactus[i].style.left = random2 + 'vh';
	}
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

function startActions() {
	startMoving();
	Level1();
	setTimeout(function () {
		gameAudio[0].play();
	}, 3000)
	setTimeout(Level2, 60000)
	setTimeout(Level3, 150000);
	return [max, points];
}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

function tankPositions() {
	var tank = document.getElementsByClassName('tank');
	tankAudioShot();
	for (var i = 0; i < tank.length; i++) {
		var random = Math.floor(Math.random() * 100);
		tank[i].style.top = random + 'vh';

		var bomb = document.createElement('div');
		bomb.classList = 'bomb';
		var body = document.getElementsByTagName('body')[0];
		body.append(bomb);

		bomb.style.top = tank[i].offsetTop + 10 + 'px'
		bomb.style.left = tank[i].offsetLeft + 'px'
		moveBombs(bomb);


	}
	hitByExplosion();
	return tagged;
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// sort out tmmrw arrays and random
function moveBombs(bomb) {

	var left = bomb.offsetLeft;
	var top = bomb.offsetTop;
	var randomspeed = Math.ceil(Math.random() * 3);
	var randomnumber = Math.random() * 0.2;
	var randomposition = Math.ceil(Math.random() * 1000);

	var timer = setInterval(function () {
		left = left - randomspeed;
		top = top - randomnumber;
		if (randomposition < bomb.offsetLeft) {
			bomb.style.left = left + 'px';
			if (randomnumber > 0.15) {
				bomb.style.top = top + 'px';
			}
		}
		else {
			bomb.classList = 'explosion';
			gameAudio[4].play();
			clearInterval(timer);
			setTimeout(function () {
				bomb.parentNode.removeChild(bomb);
				score = score + points;
			}, 3000);
		}
	}, 10)

}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// change

function hitByExplosion() {

	var notHit = true;
	var player = document.getElementById('player');
	var topLeft = document.elementFromPoint(player.offsetLeft, player.offsetTop);
	var topRight = document.elementFromPoint(player.offsetLeft + 32, player.offsetTop);
	var downLeft = document.elementFromPoint(player.offsetLeft, player.offsetTop - 46);
	var downRight = document.elementFromPoint(player.offsetLeft - 32, player.offsetTop - 46);

	while (notHit == true) {
		var hitDetection = true;
		notHit = false;
		if (tagged == false) {
			if (hitDetection == true) {
				console.log('Script sequence for hitbyExplosion has started!')
				var timerDetection = setInterval(function () {
					if (topLeft.classList.contains('explosion') == true) {
						player.classList = 'character hit left';
						player.classList = 'character hit up';
						hitDetection = false;

					}
					if (topRight.classList.contains('explosion') == true) {
						player.classList = 'character hit right';
						player.classList = 'character hit up';
						hitDetection = false;

					}

					if (downLeft.classList.contains('explosion') == true) {
						player.classList = 'character hit left';
						player.classList = 'character hit down';
						hitDetection = false;

					}
					if (downRight.classList.contains('explosion') == true) {
						player.classList = 'character hit right';
						player.classList = 'character hit down';
						hitDetection = false;

					}
				}, 10);
				setTimeout(function () {
					if (hitDetection == false) {
						tagged = true;
						clearInterval(timerDetection);
						console.log('The player was hit!');
						return tagged;
					}
				}, 1500);

			}
		}
	}
	return tagged;
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
function ifTagged() {

	console.log('If Tagged was executed!');
	//tagged = false;
	removelife = true;
	return removelife;


}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

function removeHealth(lives) {
	var health = document.getElementsByClassName('health')[0];
	var li = health.getElementsByTagName('li')[0];
	health.removeChild(li)
	gameAudio[8].play();
	var yourhealth = document.getElementsByClassName('middletext')[0];

	setTimeout(function () {
		yourhealth.firstChild.nodeValue = 'You have been Hit! Lives Remaining: ' + lives;
		yourhealth.style.width = 25 + 'vw';
		yourhealth.style.left = 48 + '%';
		showMiddleText();
	}, 1000);
	setTimeout(function () {
		yourhealth.style.left = 50 + '%';
		yourhealth.style.width = 20 + 'vw';
		hideCountDown();
	}, 4000);

}
function addHealth() {
	var health = document.getElementsByClassName('health')[0];
	var li = document.createElement('li');
	health.appendChild(li);
}

function startMoving() {
	document.addEventListener('keyup', keyup)
	document.addEventListener('keydown', keydown);
	timeout = setInterval(move, 10);
}

function stopMoving() {
	clearInterval(timeout);
	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);

}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
function hideStartButton() {
	var start = document.getElementsByClassName('start')[0];
	console.log('game has started')
	start.style.display = 'none'
}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
function gameOver(IntervalCheck, tankspawns) {
	var player = document.getElementById('player');
	player.classList = 'character stand down dead';
	gameAudio[5].play();
	gameAudio[0].pause();
	stopMoving();
	clearInterval(IntervalCheck);
	clearInterval(tankspawns);
	playAgain();
	setTimeout(function () {
		var gameOverButton = document.getElementsByClassName('gameover')[0];
		gameOverButton.style.display = 'block';
		gameOverButton.firstChild.nodeValue = 'Game Over!';
		yourFinalScore();
	}, 5000);

}

function playAgain() {
	setTimeout(function () {
		var playAgainButton = document.getElementsByClassName('playagain')[0];
		playAgainButton.style.display = 'block';
		playAgainButton.addEventListener('click', reloadPage);
	}, 5000)
}

function reloadPage() {
	window.location.reload();
}

function Level1() {
	var level = document.getElementsByClassName('level')[0];
	var levelnotify = document.getElementsByClassName('middletext')[0];

	setTimeout(function () {
		levelnotify.firstChild.nodeValue = 'Game Started : ' + levels[0];
		showMiddleText();
		cactusPositions();
	}, 3000);
	setTimeout(function () {
		hideCountDown();
	}, 4000);

	level.style.display = 'block';
	level.firstChild.nodeValue = levels[0];
	max = 4000;
	points = 1;
	console.log('Level 1 is intiated + number ' + max);
	return [max, points];
}

function Level2() {
	var level = document.getElementsByClassName('level')[0];
	var levelnotify = document.getElementsByClassName('middletext')[0];

	setTimeout(function () {
		levelnotify.firstChild.nodeValue = levels[1];
		showMiddleText();
		gameAudio[7].play();
		cactusPositions();
		additionalTank();
	}, 2000);
	setTimeout(function () {
		hideCountDown();
	}, 4000);
	level.firstChild.nodeValue = levels[1];
	max = 3500;
	points = 2;
	console.log('Level 2 is intiated + number ' + max);
	return [max, points];
}

function Level3() {
	var level = document.getElementsByClassName('level')[0];
	var levelnotify = document.getElementsByClassName('middletext')[0];

	setTimeout(function () {
		levelnotify.firstChild.nodeValue = levels[2];
		showMiddleText();
		gameAudio[7].play();
		cactusPositions();
		additionalTank();
	}, 2000);
	setTimeout(function () {
		hideCountDown();
	}, 4000);

	level.firstChild.nodeValue = levels[2];
	max = 3000;
	points = 3;
	console.log('Level 3 is intiated + number ' + max);
	return [max, points];
}

function wipeData() {
	localStorage.clear();
}

function scoreCounter() {
	var scoreboard = document.getElementsByClassName('score')[0];
	scoreboard.firstChild.nodeValue = 'Score : ' + score;
}

function yourFinalScore() {
	gameAudio[6].play();
	var username = prompt('Your Username :', 'Username');
	localStorage.setItem(username, score);
	var yourscore = document.getElementsByClassName('yourscore')[0];
	yourscore.style.display = 'block';
	var li1 = yourscore.getElementsByTagName('li')[0];
	var li2 = yourscore.getElementsByTagName('li')[1];
	li1.firstChild.nodeValue = 'Username : ' + username;
	li2.firstChild.nodeValue = 'Your Final Score : ' + score;
}

function hideCountDown() {
	var middletext = document.getElementsByClassName('middletext')[0];
	middletext.style.display = 'none';
}
function showMiddleText() {
	var middletext = document.getElementsByClassName('middletext')[0];
	middletext.style.display = 'block';
}
function initiateCountDown() {
	var countdown = document.getElementsByClassName('middletext')[0];
	countdown.style.display = 'block';
	gameAudio[1].play();
	setTimeout(function () {
		countdown.firstChild.nodeValue = '2';
	}, 1000);
	setTimeout(function () {
		countdown.firstChild.nodeValue = '1';
	}, 2000);
	setTimeout(function () {
		hideCountDown();
	}, 5000);
}

function highScores() {
	var highscore = document.getElementsByClassName('highscores')[0];
	highscore.style.display = 'block';
}

function tankAudioShot() {
	var randomMusic = Math.ceil(Math.random() * 3);
	console.log(randomMusic)
	if (randomMusic == 2) {
		gameAudio[2].play();
	}
	else {
		gameAudio[3].play();
	}
}

function additionalTank() {
	var tank = document.createElement('div');
		tank.classList = 'tank ' + tanknumber[0];
		var body = document.getElementsByTagName('body')[0];
		body.append(tank);
}

document.addEventListener('DOMContentLoaded', myLoadFunction);

