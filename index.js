(function () {

  'use strict';

  //DOM Cach
  var board = document.getElementById('board');
  var cells = document.querySelectorAll('.cell');
  var startBtn = document.getElementById('startBtn');
  var resetBtn = document.getElementById('resetBtn');
  var startPrompt = document.getElementById('startPrompt');
  var gamePrompt = document.getElementById('gamePrompt');
  var gamePromptHeader = document.getElementById('gamePromptHeader');
  var scoreItemX = document.getElementById('scorePlayerX');
  var scoreItemO = document.getElementById('scorePlayerO');
  var playerOne = document.getElementById('playerOne');
  var playerTwo = document.getElementById('playerTwo');
  var span = document.querySelector('span');


  // Game State Object
  var game = {
    state: 'X',
    winner: null,
    scorePlayerX: 0,
    scorePlayerO: 0,
    namePlayerOne: '',
    namePlayerTwo: '',
    moveCount: 0
  }


  function startGame() {
    startPrompt.style.display = 'none'
    gamePrompt.style.display = 'flex'

    game.namePlayerOne = playerOne.value;
    game.namePlayerTwo = playerTwo.value;

    span.innerHTML = game.namePlayerOne;

    scoreItemX.innerHTML = game.namePlayerOne + ': O';
    scoreItemO.innerHTML = game.namePlayerTwo + ': O';
  }

  //Game Logic

  function msg(msg) {
    gamePromptHeader.innerHTML = msg;
  }

  function changeGamePrompt() {
    if (game.moveCount === 9) {
      msg('Draw')
    } else if (game.winner === null) {
      var name = (game.state === 'X') ? game.namePlayerOne : game.namePlayerTwo;
      msg('It is <span class="active">' + name + '</span>s turn');
    } else if (game.winner !== null) {
      msg('<span class="active">' + game.winner + '</span> wins');
    }
  }

  function switchTurn(e) {
    if (e.target.innerHTML !== '') {
      return false;
    } else if (game.state === 'X' && game.winner === null) {
      e.target.innerHTML = 'X';
      checkWinner();
      game.state = 'O'
    } else if (game.state === 'O' && game.winner === null) {
      e.target.innerHTML = 'O';
      checkWinner();
      game.state = 'X'
    }

    changeGamePrompt();
  }

  function score() {
    (game.winner === game.namePlayerOne && game.winner !== null) ? game.scorePlayerX += 1 : game.scorePlayerO += 1;
    scoreItemX.innerHTML = game.namePlayerOne + ': ' + game.scorePlayerX;
    scoreItemO.innerHTML = game.namePlayerTwo + ': ' + game.scorePlayerO;
  }

  //Winning Logic
  function checkSquare(num) {
    return document.getElementById(num).innerHTML;
  }

  function checkRow(a, b, c, move) {
    if (checkSquare(a) === move && checkSquare(b) === move && checkSquare(c) === move) {
      return true;
    } else {
      return false;
    }
  }

  function checkWinner() {
    game.moveCount = game.moveCount + 1
    if (
      checkRow(1, 2, 3, game.state) ||
      checkRow(4, 5, 6, game.state) ||
      checkRow(7, 8, 9, game.state) ||
      checkRow(1, 4, 7, game.state) ||
      checkRow(2, 5, 8, game.state) ||
      checkRow(3, 6, 9, game.state) ||
      checkRow(1, 5, 9, game.state) ||
      checkRow(3, 5, 7, game.state)) {
      game.winner = (game.state === 'X') ? game.namePlayerOne : game.namePlayerTwo;
      score();
    }
  }

  //Start New Game
  function resetGame() {
    var name = (game.state === 'X') ? game.namePlayerOne : game.namePlayerTwo;
    game.winner = null;
    game.moveCount = 0;
    msg('It is <span class="active">' + name + '</span>s turn');
    cells.forEach(function (i) {
      i.innerHTML = '';
    });
  }

  //Event Listeners
  board.addEventListener('click', switchTurn);
  startBtn.addEventListener('click', startGame)
  resetBtn.addEventListener('click', resetGame);

})();
