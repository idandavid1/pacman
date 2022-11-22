'use strict'

const PACMAN = '<img src="img/pacmen.png">'
var gPacman
var gIsPowerFood = false

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    else if (nextCell === GHOST) {
        if (gIsPowerFood) {
            killGhost(nextLocation)
        } else gameOver()

    }

    else if (nextCell === FOOD){
        updateScore(1)
        gAmountFood--
        if(checkVictory()){
            hideShowElement(['.title-game-over-win'], false)
            gameOver()
        }
    } 

    else if (nextCell === POWERFOOD) {
        if(gIsPowerFood) return
        gIsPowerFood = true
        becomeKillGhost()
        setTimeout(function () {
            gIsPowerFood = false
            returnGhost()
        }, 5000)
    }

    else if (nextCell === CHERRY) updateScore(10)


    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    renderCell(nextLocation, getNextValue(nextLocation))
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation

}

function getNextValue(nextLocation) {
    if (gPacman.location.i - nextLocation.i === 1) return `<span class="up">${PACMAN}</span>`
    if (gPacman.location.i - nextLocation.i === -1) return `<span class="down">${PACMAN}</span>`
    if (gPacman.location.j - nextLocation.j === 1) return `<span class="left">${PACMAN}</span>`
    return PACMAN
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}