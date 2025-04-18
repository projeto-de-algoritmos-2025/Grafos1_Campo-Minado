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

function initGame() {
    board = Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => ({
            bomb: false,
            revealed: false,
            marked: false,
            count: 0,
        }))
    );
    revealedCount = 0;
    markedCount = 0;
    gameOver = false;

    generateBombs();
    calculateCounts();
    renderBoard();


    startTime = 0;
    elapsedTime = 0;
    timeDisplay.textContent = "Tempo: 0s";

    markedDisplay.textContent = `Bombas: 0/${bombCount}`;
    clearInterval(window.timer);
    scoresModal.classList.remove("visible");
}
