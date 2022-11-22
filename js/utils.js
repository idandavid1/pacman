'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function hideShowElement(selectors, shouldOpen = true) {
    for(var i = 0; i < selectors.length; i++){
        const selector = selectors[i]
        const el = document.querySelector(selector)
        shouldOpen ? el.classList.add('hidden') : el.classList.remove('hidden')
    } 
}

function hideElement(selector) {
    const el = document.querySelector(selector)
    console.log('el:', el)
    el.classList.add('hidden')
}

function showElement(selector) {
    const el = document.querySelector(selector)
    console.log(el);
    el.classList.remove('hidden')
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getAllEmptyCell(){
    const emptyCells = []
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            const cell = gBoard[i][j]
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1) continue
            if(cell === EMPTY) emptyCells.push({i, j})
        }
    }

    return emptyCells
}