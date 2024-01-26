document.addEventListener("DOMContentLoaded", function () {
    // Initialization of variables at the beginning of the game
    var playerXScore = 0;
    var playerOScore = 0;
    var currentPlayer = 'X';
    var cells = document.querySelectorAll('.cell');
    var resetButton = document.getElementById('resetButton');

    // Adding event listeners for each cell
    cells.forEach(function (cell) {
        cell.addEventListener('click', function () {
            // Check if the cell is empty and the game is not over
            if (this.textContent === '' && !gameOver()) {
                // Update the cell and class
                this.textContent = currentPlayer;
                this.classList.add(currentPlayer);

                // Check for win conditions, tie, or switch player
                if (checkWin()) {
                    updateScore();
                    document.getElementById('result').textContent = 'Player ' + currentPlayer + ' wins!';
                } else if (checkTie()) {
                    document.getElementById('result').textContent = 'It\'s a tie!';
                } else {
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                    if (currentPlayer === 'O' && !gameOver()) {
                        makeBotMove();
                    }
                }
            }
        });
    });

    // Adding event handler for the game reset button
    resetButton.addEventListener('click', function () {
        // Resetting cell contents and result
        cells.forEach(function (cell) {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        document.getElementById('result').textContent = '';
        currentPlayer = 'X'; // Set player X as the first player
    });

    // Function responsible for the bot's move
    function makeBotMove() {
        var bestMove = getBestMove();
        if (bestMove.index !== -1) {
            cells[bestMove.index].textContent = currentPlayer;
            cells[bestMove.index].classList.add(currentPlayer);

            // Check for win conditions, tie, or switch player
            if (checkWin()) {
                updateScore();
                document.getElementById('result').textContent = 'Player ' + currentPlayer + ' wins!';
            } else if (checkTie()) {
                document.getElementById('result').textContent = 'It\'s a tie!';
            }
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }

    // Function to select the best move for the bot (minimax algorithm)
    function getBestMove() {
        var bestScore = -Infinity;
        var bestMove = { index: -1 };

        for (var i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = 'O';
                var score = minimax(cells, 0, false);
                cells[i].textContent = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove.index = i;
                }
            }
        }

        return bestMove;
    }

    // Minimax algorithm for evaluating moves
    function minimax(board, depth, isMaximizing) {
        if (checkWin()) {
            return isMaximizing ? -1 : 1;
        } else if (checkTie()) {
            return 0;
        }

        var scores = [];
        var currentPlayer = isMaximizing ? 'O' : 'X';

        for (var i = 0; i < board.length; i++) {
            if (board[i].textContent === '') {
                board[i].textContent = currentPlayer;
                var score = minimax(board, depth + 1, !isMaximizing);
                board[i].textContent = '';
                scores.push(score);
            }
        }

        return isMaximizing ? Math.max(...scores) : Math.min(...scores);
    }

    // Update player score
    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore++;
            document.getElementById('playerXScore').textContent = 'Player X: ' + playerXScore;
        } else if (currentPlayer === 'O') {
            playerOScore++;
            document.getElementById('playerOScore').textContent = 'Player O: ' + playerOScore;
        }
    }

    // Check for win conditions
    function checkWin() {
        var winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (var i = 0; i < winPatterns.length; i++) {
            var pattern = winPatterns[i];
            if (cells[pattern[0]].textContent === currentPlayer &&
                cells[pattern[1]].textContent === currentPlayer &&
                cells[pattern[2]].textContent === currentPlayer) {
                return true;
            }
        }

        return false;
    }

    // Check for a tie
    function checkTie() {
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                return false;
            }
        }
        return true;
    }

    // Check if the game is over
    function gameOver() {
        return document.getElementById('result').textContent !== '';
    }
});
