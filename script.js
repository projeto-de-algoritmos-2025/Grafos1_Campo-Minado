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

function generateBombs() {
    let placed = 0;
    while (placed < bombCount) {
        const r = Math.floor(Math.random() * boardSize);
        const c = Math.floor(Math.random() * boardSize);
        if (!board[r][c].bomb) {
            board[r][c].bomb = true;
            placed++;
        }
    }
}

function calculateCounts() {
    const dir = [-1, 0, 1];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c].bomb) continue;
            let count = 0;
            for (let dx of dir) {
                for (let dy of dir) {
                    if (dx === 0 && dy === 0) continue;
                    const nr = r + dx;
                    const nc = c + dy;
                    if (inBounds(nr, nc) && board[nr][nc].bomb) count++;
                }
            }
            board[r][c].count = count;
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        const cellData = board[r][c];


        cell.classList.remove("revealed", "bomb", "marked", "num-1", "num-2", "num-3", "num-4", "num-5", "num-6", "num-7", "num-8");
        cell.textContent = "";


        if (cellData.revealed) {
            cell.classList.add("revealed");

            if (cellData.bomb) {
                cell.classList.add("bomb");
                cell.textContent = "💣";
            } else if (cellData.count > 0) {
                cell.textContent = cellData.count;

                 cell.classList.add(`num-${cellData.count}`);
            }
        } else if (cellData.marked) {
            cell.classList.add("marked");
            cell.textContent = "🚩";
        }

        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
        newCell.dataset.row = r;
        newCell.dataset.col = c;


        newCell.oncontextmenu = (e) => {
            e.preventDefault();
            if (gameOver || cellData.revealed) return;


            if (!cellData.marked && markedCount >= bombCount) {
                 alert(`Você só pode marcar ${bombCount} bombas!`);
                 return;
             }

            cellData.marked = !cellData.marked;


            markedCount += cellData.marked ? 1 : -1;
            markedDisplay.textContent = `Marcadas: ${markedCount}/${bombCount}`;

            renderBoard();
        };

        newCell.onclick = () => {

            if (gameOver || cellData.marked) return;

            if (!startTime && !cellData.revealed) {
                 startTime = Date.now();
                 window.timer = setInterval(updateTimer, 1000);
             }

            if (cellData.revealed) {
                let flagCount = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (inBounds(nr, nc) && !(dr === 0 && dc === 0)) {
                            if (board[nr][nc].marked) flagCount++;
                        }
                    }
                }

                if (flagCount === cellData.count) {
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nr = r + dr;
                            const nc = c + dc;
                            if (inBounds(nr, nc) && !(dr === 0 && dc === 0)) {
                                if (!board[nr][nc].marked && !board[nr][nc].revealed) {
                                    revealCell(nr, nc);
                                }
                            }
                        }
                    }

                     if (!gameOver) {
                        renderBoard();
                        checkVictory();
                    } else {
                         renderBoard();
                    }
                }
            } else {
                 revealCell(r, c);
                 if (!gameOver) {
                     renderBoard();
                     checkVictory();
                 } else {
                    renderBoard();
                 }
            }
        };

    });
}

function bfs(startR, startC) {
    const queue = [[startR, startC]];
    const visited = new Set([`${startR},${startC}`]);

    while (queue.length) {
        const [r, c] = queue.shift();
        const cell = board[r][c];

        if (cell.count === 0) {
             for (let dr = -1; dr <= 1; dr++) {
                 for (let dc = -1; dc <= 1; dc++) {
                     if (dr === 0 && dc === 0) continue;
                     const nr = r + dr;
                     const nc = c + dc;
                     const key = `${nr},${nc}`;

                     if (inBounds(nr, nc) && !visited.has(key)) {
                        const neighborCell = board[nr][nc];
                        if (!neighborCell.marked && !neighborCell.revealed) {
                             visited.add(key);
                            neighborCell.revealed = true;
                            if (!neighborCell.bomb) {
                                revealedCount++;
                            }

                             if (neighborCell.count === 0) {
                                queue.push([nr, nc]);
                             }
                         }
                     }
                 }
             }
        }
    }
}
function revealCell(r, c) {
    if (!inBounds(r, c)) return;
    const cell = board[r][c];
    if (gameOver || cell.revealed || cell.marked) return;

    cell.revealed = true;

    if (cell.bomb) {
        gameOver = true;
        clearInterval(window.timer);
        revealAllBombs();

        return;
    }

    revealedCount++;

    if (cell.count === 0) {
        bfs(r, c);
    }
}

function revealAllBombs() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const cell = board[r][c];
            if (cell.bomb) {
                if(!cell.marked) {
                    cell.revealed = true;
                }
            }
        }
    }
    renderBoard();
}