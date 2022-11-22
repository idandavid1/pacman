
const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD = '🥩'
const CHERRY = '🍒'
const size = 10
var gAmountFood
var gCherryInterval

const gGame = {
    score: 0,
    isOn: false
}

var gBoard

function onInit() {
    gAmountFood = 0
    gGame.score = 0
    hideShowElement(['.game-over', '.title-game-over-win'])
    gBoard = buildBoard()
    gGhosts = []
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gCherryInterval = setInterval(putCherry, 15000)
    gGame.isOn = true
    gIsPowerFood = false
}

function buildBoard() {
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gAmountFood++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gAmountFood--
            }
        }
    }

    board[1][1] = board[1][8] = POWERFOOD
    board[8][1] = board[8][8] = POWERFOOD
    gAmountFood -= 5 

    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    hideShowElement(['.game-over'], false)
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    if(!checkVictory()) renderCell(gPacman.location, '🪦')
}

function putCherry(){
    const emptyCells = getAllEmptyCell()
    if(emptyCells) return
    const location = emptyCells[getRandomInt(0, emptyCells.length)]
    gBoard[location.i][location.j] = CHERRY
    renderCell(location, CHERRY)
}

// function checkVictory(){
//     for (var i = 0; i < size; i++) {
//         for (var j = 0; j < size; j++) {
//             const cell = gBoard[i][j]
//             if (i === 0 || i === size - 1 || j === 0 || j === size - 1) continue
//             if(cell === FOOD){
//             console.log('{i, j}:', {i, j})
//              return false
//         }
//         }
//     }

//     return true
// }

function checkVictory(){
    console.log('gAmountFood:', gAmountFood)
    return gAmountFood === 0
}