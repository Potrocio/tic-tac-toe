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

//AI training

let availableCells = ['cellOne','cellTwo','cellThree','cellFour','cellFive','cellSix','cellSeven','cellEight','cellNine'];
let combinationArray = [];
for(let cell in availableCells) {

    function resetBoardCells() {
        for(let object in constructedObjects.boardCells) {
            let objectToBeEdited = constructedObjects.boardCells[object];
            objectToBeEdited.mark = '';
        };    
    }

    resetBoardCells();
    let combination = '000000000';
    let currentPosition = constructedObjects.boardCells[availableCells[cell]].position;

    constructedObjects.boardCells[availableCells[cell]].mark = 'X';
    combination[0] = currentPosition;


    let availableCells2 = availableCells.filter((item) => {
        if(item !== availableCells[cell]) {
            return true;
        }
    })

    for(let cell in availableCells2) {
        let currentPosition = constructedObjects.boardCells[availableCells2[cell]].position;
        combination[1] = currentPosition;
        constructedObjects.boardCells[availableCells2[cell]].mark = 'O';
        let availableCells3 = availableCells2.filter((item) => {
            if(item !== availableCells2[cell]) {
                return true;
            }
        })
        // console.log(combination,constructedObjects.boardCells)

        for(let cell in availableCells3) {
            let currentPosition = constructedObjects.boardCells[availableCells3[cell]].position;
            combination[2] = currentPosition;
            constructedObjects.boardCells[availableCells3[cell]].mark = 'X';
            let availableCells4 = availableCells3.filter((item) => {
                if(item !== availableCells3[cell]) {
                    return true;
                }
            })
            for(let cell in availableCells4) {
                let currentPosition = constructedObjects.boardCells[availableCells4[cell]].position;
                combination[3] = currentPosition;
                constructedObjects.boardCells[availableCells4[cell]].mark = 'O';
                let availableCells5 = availableCells4.filter((item) => {
                    if(item !== availableCells4[cell]) {
                        return true;
                    }
                })
                for(let cell in availableCells5) {
                    let currentPosition = constructedObjects.boardCells[availableCells5[cell]].position;
                    combination[4] = currentPosition;
                    constructedObjects.boardCells[availableCells5[cell]].mark = 'X';
                    let availableCells6 = availableCells5.filter((item) => {
                        if(item !== availableCells5[cell]) {
                            return true;
                        }
                    })
                    for(let cell in availableCells6) {
                        let currentPosition = constructedObjects.boardCells[availableCells6[cell]].position;
                        combination[5] = currentPosition;
                        constructedObjects.boardCells[availableCells6[cell]].mark = 'O';
                        let availableCells7 = availableCells6.filter((item) => {
                            if(item !== availableCells6[cell]) {
                                return true;
                            }
                        })
                        for(let cell in availableCells7) {
                            let currentPosition = constructedObjects.boardCells[availableCells7[cell]].position;
                            combination[6] = currentPosition;
                            constructedObjects.boardCells[availableCells7[cell]].mark = 'X';
                            let availableCells8 = availableCells7.filter((item) => {
                                if(item !== availableCells7[cell]) {
                                    return true;
                                }
                            })
                            for(let cell in availableCells8) {
                                let currentPosition = constructedObjects.boardCells[availableCells8[cell]].position;
                                combination[7] = currentPosition;
                                constructedObjects.boardCells[availableCells8[cell]].mark = 'O';
                                let availableCells9 = availableCells8.filter((item) => {
                                    if(item !== availableCells8[cell]) {
                                        return true;
                                    }
                                })
                                for(let cell in availableCells9) {
                                    let currentPosition = constructedObjects.boardCells[availableCells9[cell]].position;
                                    combination[8] = currentPosition;
                                    constructedObjects.boardCells[availableCells9[cell]].mark = 'X';
                                    combinationArray.push(combination);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
}

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
    
})();

// const computerTurn = () => {

// }