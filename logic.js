'use strict';

const querySelectors = (() => {
    const cells = document.querySelectorAll('.cell');
    const userScore = document.querySelector('.user-score > .score');
    const computerScore = document.querySelector('.computer-score > .score');
    const messageBoard = document.querySelector('.message');
    return {cells,userScore,computerScore,messageBoard};
})();

function defaultGameVariables() {
    querySelectors.userScore.textContent = 0;
    querySelectors.computerScore.textContent = 0;
    querySelectors.cells.forEach((cell) => cell.textContent = '');
    for(let object in constructedObjects.boardCells) {
        let objectToBeEdited = constructedObjects.boardCells[object];
        objectToBeEdited.mark = '';
    };
};

const objectConstructors = (() => {
    const Cell = (position,mark,className) => {
        return{position,mark,className};
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
        const cellOne = cell(1,'','cell one');
        const cellTwo = cell(2,'','cell two');
        const cellThree = cell(3,'','cell three');
        const cellFour = cell(4,'','cell four');
        const cellFive = cell(5,'','cell five');
        const cellSix = cell(6,'','cell six');
        const cellSeven = cell(7,'','cell seven');
        const cellEight = cell(8,'','cell eight');
        const cellNine = cell(9,'','cell nine');
        return{cellOne,cellTwo,cellThree,cellFour,cellFive,cellSix,cellSeven,cellEight,cellNine};
    })()

    const players = (() => {
        const user = player('user','X');
        const computer = player('computer','O');
        return{user,computer}
    })();

    const winningPatterns = (() => {
        const rowOne = pattern(boardCells.cellOne,boardCells.cellTwo,boardCells.cellThree);
        const rowTwo = pattern(boardCells.cellFour,boardCells.cellFive,boardCells.cellSix);
        const rowThree = pattern(boardCells.cellSeven,boardCells.cellEight,boardCells.cellNine);
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
    let gameEnded = false;
    const updateGameBoard = (() => {
        querySelectors.cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                if(cell.textContent == '' && gameEnded == false) {
                    cell.textContent = constructedObjects.players.user.mark;
                    for(let object in constructedObjects.boardCells) {
                        if(constructedObjects.boardCells[object].className == e.target.classList.value)  {
                            let objectToBeEdited = constructedObjects.boardCells[object];
                            objectToBeEdited.mark = 'X';
                        }
                    };
                    checkWinner();
                }
            })
        })    
    })();

    const checkWinner = () => {
        for (let object in constructedObjects.winningPatterns) {
            object = constructedObjects.winningPatterns[object]
            if(object.cellA.mark === object.cellB.mark && object.cellB.mark === object.cellC.mark) {
                if(object.cellA.mark !== '') {
                    if(object.cellA.mark == 'X') {
                        declareWinner('User!');
                        gameEnded = true;
                        let currentScore = querySelectors.userScore.textContent;
                        querySelectors.userScore.textContent = Number(currentScore) + 1;
                        nextRound();
                        break;
                    } else {
                        declareWinner('computer!');
                        gameEnded = true;
                        let currentScore = querySelectors.computerScore.textContent;
                        querySelectors.computerScore.textContent = Number(currentScore) + 1;
                        nextRound();
                        break;
                    };
                    
                }
            } else {
                // computerTurn()
            }
        };
    };

    const declareWinner = (player) => {
        querySelectors.messageBoard.textContent = 'The winner is ' + player;
    };

    const nextRound = () => {
        const nextRoundButton = document.createElement('button');
        nextRoundButton.classList.add('next-round');
        nextRoundButton.textContent = 'Next round';
        querySelectors.messageBoard.appendChild(nextRoundButton);
        nextRoundButton.addEventListener('click', () => {
            querySelectors.cells.forEach((cell) => cell.textContent = '');
            for(let object in constructedObjects.boardCells) {
                let objectToBeEdited = constructedObjects.boardCells[object];
                objectToBeEdited.mark = '';
            };
            querySelectors.messageBoard.textContent = '';
        });
        gameEnded = false;
    };
    
    
    return{//,computerTurn,
};
})();

//computer turn