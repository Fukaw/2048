"use strict";
var currentPlayer = 1;
var lastStartingPlayer = 2;

function checkDraw(grid) {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "") {
				return (false);
			}
		}
	}
	return (true);
}

function checkRows(grid) {
	var rows = grid.children;
	var winner = 0;
	var aligned = 0;
	
	for (var i = 0; i < grid.length; i++) {
		aligned = 0;
		for (var j = 0; j < grid[i].length; j++) {
			if (grid && grid[i] && grid[i][j]) {
				if (grid[i][j] === winner) {
					aligned++;
				} else if (grid[i][j]) {
					winner = grid[i][j];
					aligned = 1;
				}
			}
			if (aligned >= 3) {
				return (winner);
			}
		}
	}
	return (0);
}

function checkColumns(grid) {
	var rows = grid.children;
	var winner = 0;
	var aligned = 0;
	var lines = grid.length;
	var columns = 0;
	
	for (var i = 0; i < grid.length; i++) {
		if (grid[i].length > columns) {
			columns = grid[i].length;
		}
	}
	for (var j = 0; j < columns; j++) {
		aligned = 0;
		for (var i = 0; i < lines; i++) {
			if (grid && grid[i] && grid[i][j]) {
				if (grid[i][j] === winner) {
					aligned++;
				} else if (grid[i][j]) {
					winner = grid[i][j];
					aligned = 1;
				}
			}
			if (aligned >= 3) {
				return (winner);
			}
		}
	}
	return (0);
}

function checkDiags(grid) {
	var rows = grid.children;
	var winner = 0;
	var aligned = 0;
	
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			aligned = 0;
			for (var offset = 0; offset < grid[i].length; offset++) {
				if (grid && grid[i + offset] && grid[i + offset][j + offset]) {
					if (grid[i + offset][j + offset] === winner) {
						aligned++;
					} else {
						winner = grid[i + offset][j + offset];
						aligned = 1;
					}
				}
				if (aligned >= 3) {
					return (winner);
				}
			}
			aligned = 0;
			for (var offset = 0; offset < grid[i].length; offset++) {
				if (grid && grid[i + offset] && grid[i + offset][j - offset]) {
					if (grid[i + offset][j - offset] === winner) {
						aligned++;
					} else {
						winner = grid[i + offset][j - offset];
						aligned = 1;
					}
				}
				if (aligned >= 3) {
					return (winner);
				}
			}
		}
	}
	return (0);
}

function getGame() {
	var game = document.getElementsByClassName("game");
	
	if (game.length != 1) {
		console.error("Error while loading game ! Wrong number of game tag");
		currentPlayer = 0;
		return (null);
	}
	return (game[0]);
}

function getGrid() {
	var game = getGame();
	if (game !== null) {
		var rows = game.getElementsByClassName("grid")[0].children;
		var columns;
		var grid = new Array(rows.length);
	
		for (var i = 0; i < rows.length; i++) {
			columns = rows[i].children;
			grid[i] = new Array(columns.length);
			for (var j = 0; j < columns.length; j++) {
				grid[i][j] = columns[j].getAttribute('data-value');
			}
		}
		return (grid);
	}
	return (null);
}

function checkGameState() {
	var grid = getGrid();
	var winner = 0;
	var playerTurn;
	
	if (grid !== null) {
		playerTurn = getGame().getElementsByClassName("player-turn")[0];
		if (checkDraw(grid) === true) {
			currentPlayer = 0;
			playerTurn.innerHTML = ">It's a draw !<<br />Reseting the game...";
		}
		winner = checkColumns(grid);
		if (winner > 0) {
			currentPlayer = 0;
			playerTurn.innerHTML = ">Player " + winner + " win !<<br />Reseting the game...";
		}
		winner = checkRows(grid);
		if (winner > 0) {
			currentPlayer = 0;
			playerTurn.innerHTML = ">Player " + winner + " win !<<br />Reseting the game...";
		}
		winner = checkDiags(grid);
		if (winner > 0) {
			currentPlayer = 0;
			playerTurn.innerHTML = ">Player " + winner + " win !<<br />Reseting the game...";
		}
	}
}

function changePlayerTurn() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else if (currentPlayer === 2) {
        currentPlayer = 1;
    }
	getGame().getElementsByClassName("player-turn")[0].innerHTML = ">Player " + currentPlayer + ", it's your turn<<br />Play !";
}

function resetGame() {
	if (getGame() !== null) {
		var rows = getGame().getElementsByClassName("grid")[0].children;
		var columns;
	
		for (var i = 0; i < rows.length; i++) {
			columns = rows[i].children;
			for (var j = 0; j < columns.length; j++) {
				columns[j].setAttribute('data-value', '');
			}
		}
		currentPlayer = lastStartingPlayer;
		changePlayerTurn();
		lastStartingPlayer = currentPlayer;
	}
}

function setValue(square) {
	if (currentPlayer > 0 && square.dataset.value === "") {
		square.setAttribute('data-value', currentPlayer);
		changePlayerTurn();
		checkGameState();
		if (currentPlayer == 0) {
			setTimeout(function() { resetGame(); }, 3000);
		}
	}
}