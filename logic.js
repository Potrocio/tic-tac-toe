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
        const rowOne = pattern(1,2,3);
        const rowTwo = pattern(3,4,5);
        const rowThree = pattern(6,7,8);
        const columnOne = pattern(1,4,7);
        const columnTwo = pattern(2,5,8);
        const columnThree = pattern(3,6,9);
        const rowOneDiagonal = pattern(1,5,9);
        const rowThreeDiagonal = pattern(3,5,7);
        return{rowOne,rowTwo,rowThree,columnOne,columnTwo,columnThree,rowOneDiagonal,rowThreeDiagonal};
    })()

    return{boardCells,players,winningPatterns};
})(objectConstructors.Cell,objectConstructors.Players,objectConstructors.WinningPatterns);

//game events
const gameEvents = (() => {
    const updateGameBoard = (() => {
        querySelectors.cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if(cell.textContent == '') {
                    cell.textContent = constructedObjects.players.user.mark;
                }
            })
        })    
    })();

    const checkWinner = () => {

    }

    return{checkWinner//,updateTurn,updateScore,computerTurn,declareWinner
    };
})()


//computer turn