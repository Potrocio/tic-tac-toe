'use strict';

const querySelectors = (() => {
    const cells = document.querySelectorAll('.cell');
    const userScore = document.querySelector('.user-score > .score');
    const computerScore = document.querySelector('.computer-score > .score');
    return {cells,userScore,computerScore};
})();


function defaultGameVariables() {
    querySelectors.userScore.textContent = 0;
    querySelectors.computerScore.textContent = 0;
    querySelectors.cells.forEach((cell) => cell.textContent = '');
};

const objectConstructors = (() => {
    const Cell = (position,mark) => {
        return{position,mark};
    }

    const Players = (name,mark) => {
        return{name,mark};
    }

    const WinningPatterns = (cellA,cellB,cellC) => {
        return{cellA,cellB,cellC};
    }

    // const ComputerChoiceOptions
    return{Cell,Players,WinningPatterns};
})();


const constructedObjects = ((cell,player,pattern) => {
    const boardCells = (() => {
        const cellOne = cell(1,'');
        const cellTwo = cell(2,'');
        const cellThree = cell(3,'');
        const cellFour = cell(4,'');
        const cellFive = cell(5,'');
        const cellSix = cell(6,'');
        const cellSeven = cell(7,'');
        const cellEight = cell(8,'');
        const cellNine = cell(9,'');
        return{cellOne,cellTwo,cellThree,cellFour,cellFive,cellSix,cellSeven,cellEight,cellNine};
    })()

    const players = (() => {
        const user = player('user','X');
        const computer = player('computer','O');
        return{user,computer}
    })();

    const winningPatterns = (() => {
        const rowOne = pattern(boardCells.cellOne,boardCells.cellTwo,boardCells.cellThree);
        const rowTwo = pattern(boardCells.cellThree,boardCells.cellFour,boardCells.cellFive);
        const rowThree = pattern(boardCells.cellSix,boardCells.cellSeven,boardCells.cellEight);
        const columnOne = pattern(boardCells.cellOne,boardCells.cellFour,boardCells.cellSeven);
        const columnTwo = pattern(boardCells.cellTwo,boardCells.cellFive,boardCells.cellEight);
        const columnThree = pattern(boardCells.cellThree,boardCells.cellSix,boardCells.cellNine);
        const rowOneDiagonal = pattern(boardCells.cellOne,boardCells.cellFive,boardCells.cellNine);
        const rowThreeDiagonal = pattern(boardCells.cellThree,boardCells.cellFive,boardCells.cellSeven);
        return{rowOne,rowTwo,rowThree,columnOne,columnTwo,columnThree,rowOneDiagonal,rowThreeDiagonal};
    })()

    return{boardCells,players,winningPatterns};
})(objectConstructors.Cell,objectConstructors.Players,objectConstructors.WinningPatterns);

//game events
const gameEvents = (() => {
    const updateGameBoard = (() => {
        querySelectors.cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                if(cell.textContent == '') {
                    cell.textContent = constructedObjects.players.user.mark;
                    console.log(e.target.classList.value)
                    //left off here
                }
            })
        })    
    })();

    const checkWinner = () => {
        for (let object in constructedObjects.winningPatterns) {
            object = constructedObjects.winningPatterns[object]
            console.log(object.cellA,object.cellB,object.cellC)
            if(object.cellA.mark === object.cellB.mark && object.cellB.mark === object.cellC.mark) {
                if(object.cellA.mark !== '') {
                    console.log('the winning pattern is ' +object);
                }
            }
        };
    }

    return{checkWinner//,updateTurn,updateScore,computerTurn,declareWinner
    };
})()

//computer turn