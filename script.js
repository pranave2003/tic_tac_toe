const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const statusDiv = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to check for a winner
const checkWinner = () => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      showWinnerPopup(`Player ${currentPlayer} Wins! 🎉`);
      return;
    }
  }

  if (!boardState.includes(null)) {
    gameActive = false;
    showWinnerPopup("It's a Tie! 🤝");
  }
};

// Function to show a winner popup
const showWinnerPopup = (message) => {
  setTimeout(() => {
    alert(message);
    restartGame();
  }, 300); // Slight delay for better user experience
};

// Handle cell clicks
const handleCellClick = (event) => {
  const cell = event.target;
  const index = cell.dataset.index;

  if (!boardState[index] && gameActive) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
};

// Restart the game
const restartGame = () => {
  boardState = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => (cell.textContent = ''));
  statusDiv.textContent = "Player X's Turn";
};

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
