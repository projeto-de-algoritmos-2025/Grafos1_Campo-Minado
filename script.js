const boardSize = 9;
const bombCount = 10;
let board = [];
let revealedCount = 0;
let gameOver = false;
let startTime = 0;
let elapsedTime = 0;
let markedCount = 0;


const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const timeDisplay = document.getElementById("time-display");
const markedDisplay = document.getElementById("marked-display");
const viewScoresButton = document.getElementById("view-scores-button");
const scoresModal = document.getElementById("scores-modal");
const closeScoresButton = document.getElementById("close-scores-button");
const clearScoresButton = document.getElementById("clear-scores-button");
const scoresList = document.getElementById("scores-list");

resetButton.addEventListener("click", initGame);
viewScoresButton.addEventListener("click", displayScores);
closeScoresButton.addEventListener("click", () => {

    scoresModal.classList.remove("visible");
});
clearScoresButton.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja limpar o histórico de tempos?")) {
        localStorage.removeItem("scores");
        displayScores();
    }
});

