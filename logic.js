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
        const cell1 = cell(1,'','cell one');
        const cell2 = cell(2,'','cell two');
        const cell3 = cell(3,'','cell three');
        const cell4 = cell(4,'','cell four');
        const cell5 = cell(5,'','cell five');
        const cell6 = cell(6,'','cell six');
        const cell7 = cell(7,'','cell seven');
        const cell8 = cell(8,'','cell eight');
        const cell9 = cell(9,'','cell nine');
        return{cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9};
    })()

    const players = (() => {
        const user = player('user','X');
        const computer = player('computer','O');
        return{user,computer}
    })();

    const winningPatterns = (() => {
        const rowOne = pattern(boardCells.cell1,boardCells.cell2,boardCells.cell3);
        const rowTwo = pattern(boardCells.cell4,boardCells.cell5,boardCells.cell6);
        const rowThree = pattern(boardCells.cell7,boardCells.cell8,boardCells.cell9);
        const columnOne = pattern(boardCells.cell1,boardCells.cell4,boardCells.cell7);
        const columnTwo = pattern(boardCells.cell2,boardCells.cell5,boardCells.cell8);
        const columnThree = pattern(boardCells.cell3,boardCells.cell6,boardCells.cell9);
        const rowOneDiagonal = pattern(boardCells.cell1,boardCells.cell5,boardCells.cell9);
        const rowThreeDiagonal = pattern(boardCells.cell3,boardCells.cell5,boardCells.cell7);
        return{rowOne,rowTwo,rowThree,columnOne,columnTwo,columnThree,rowOneDiagonal,rowThreeDiagonal};
    })()

    return{boardCells,players,winningPatterns};
})(objectConstructors.Cell,objectConstructors.Players,objectConstructors.WinningPatterns);

//AI training

let availableCells = ['cell1','cell2','cell3','cell4','cell5','cell6','cell7','cell8','cell9'];
let combinationArray = [];

function checkTrainingWinner() {
    for (let object in constructedObjects.winningPatterns) {
        object = constructedObjects.winningPatterns[object]
        if(object.cellA.mark === object.cellB.mark && object.cellB.mark === object.cellC.mark) {
            if(object.cellA.mark !== '') {
                if(object.cellA.mark == 'X') {
                    let status = 'lose';
                    console.log('X wins')
                    return status;
                } else {
                    let status = 'win';
                    console.log('O wins')
                    return status;
                }; 
            }
        }
    };
};

function checkInterception(stage,marking,combinationIndex) {
    for (let object in constructedObjects.winningPatterns) {
        object = constructedObjects.winningPatterns[object]
        let totalMarks = object.cellA.mark + object.cellB.mark + object.cellC.mark    
        if(totalMarks.length == 2) {
            for(let cell in object) {
                if(object[cell].mark == '') {
                    let objectPosition = 'cell' + object[cell].position;
                    constructedObjects.boardCells[objectPosition].mark = marking;
                    combination[combinationIndex] = object[cell].position;
                    return combinationIndex;
                }
            }
        } else {
            combination[combinationIndex] = constructedObjects.boardCells[stage].position;
            constructedObjects.boardCells[stage].mark = marking;
            return combinationIndex;
        }
    }
}


loop1:
    for(let cell in availableCells) {

        function resetBoardCells() {
            for(let object in constructedObjects.boardCells) {
                let objectToBeEdited = constructedObjects.boardCells[object];
                objectToBeEdited.mark = '';
            };    
        }

        resetBoardCells();
        var combination = [0,0,0,0,0,0,0,0,0];
        // let currentPosition = constructedObjects.boardCells[availableCells[cell]].position;

        // constructedObjects.boardCells[availableCells[cell]].mark = 'X';
        checkInterception(availableCells[cell],'X',0)

        // combination[0] = currentPosition;


        let availableCells2 = availableCells.filter((item) => {
            if(item !== availableCells[cell]) {
                return true;
            }
        })
loop2:
        for(let cell in availableCells2) {
            let currentPosition = constructedObjects.boardCells[availableCells2[cell]].position;
            // combination[1] = currentPosition;
            // constructedObjects.boardCells[availableCells2[cell]].mark = 'O';
            checkInterception(availableCells2[cell],'O',1)

            let availableCells3 = availableCells2.filter((item) => {
                if(item !== availableCells2[cell]) {
                    return true;
                }
            })
            // console.log(combination,constructedObjects.boardCells)
loop3:
            for(let cell in availableCells3) {
                let currentPosition = constructedObjects.boardCells[availableCells3[cell]].position;
                // combination[2] = currentPosition;
                // constructedObjects.boardCells[availableCells3[cell]].mark = 'X';
                checkInterception(availableCells3[cell],'X',2)

                let availableCells4 = availableCells3.filter((item) => {
                    if(item !== availableCells3[cell]) {
                        return true;
                    }
                })
loop4:
                for(let cell in availableCells4) {
                    let currentPosition = constructedObjects.boardCells[availableCells4[cell]].position;
                    // combination[3] = currentPosition;
                    // constructedObjects.boardCells[availableCells4[cell]].mark = 'O';
                    checkInterception(availableCells4[cell],'O',3)
                    let availableCells5 = availableCells4.filter((item) => {
                        if(item !== availableCells4[cell]) {
                            return true;
                        }
                    })
loop5:
                    for(let cell in availableCells5) {
                        let currentPosition = constructedObjects.boardCells[availableCells5[cell]].position;
                        // combination[4] = currentPosition;
                        // constructedObjects.boardCells[availableCells5[cell]].mark = 'X';
                        checkInterception(availableCells5[cell],'X',4)
                        let availableCells6 = availableCells5.filter((item) => {
                            if(item !== availableCells5[cell]) {
                                return true;
                            }
                        })
loop6:
                        for(let cell in availableCells6) {
                            let currentPosition = constructedObjects.boardCells[availableCells6[cell]].position;
                            // combination[5] = currentPosition;
                            // constructedObjects.boardCells[availableCells6[cell]].mark = 'O';
                            checkInterception(availableCells6[cell],'O',5)

                            let availableCells7 = availableCells6.filter((item) => {
                                if(item !== availableCells6[cell]) {
                                    return true;
                                }
                            })
loop7:
                            for(let cell in availableCells7) {
                                let currentPosition = constructedObjects.boardCells[availableCells7[cell]].position;
                                // combination[6] = currentPosition;
                                // constructedObjects.boardCells[availableCells7[cell]].mark = 'X';
                                checkInterception(availableCells7[cell],'X',6)

                                let availableCells8 = availableCells7.filter((item) => {
                                    if(item !== availableCells7[cell]) {
                                        return true;
                                    }
                                })
loop8:
                                for(let cell in availableCells8) {
                                    let currentPosition = constructedObjects.boardCells[availableCells8[cell]].position;
                                    // combination[7] = currentPosition;
                                    // constructedObjects.boardCells[availableCells8[cell]].mark = 'O';
                                    checkInterception(availableCells8[cell],'O',7)

                                    let availableCells9 = availableCells8.filter((item) => {
                                        if(item !== availableCells8[cell]) {
                                            return true;
                                        }
                                    })
loop9:
                                    for(let cell in availableCells9) {
                                        let currentPosition = constructedObjects.boardCells[availableCells9[cell]].position;
                                        // combination[8] = currentPosition;
                                        // constructedObjects.boardCells[availableCells9[cell]].mark = 'X';
                                        checkInterception(availableCells9[cell],'X',8)

                                        let finalCombination = ''
                                        let finalBoardCells = ''
                                        for(let i=0 ; i < combination.length; i++) {
                                            finalCombination += combination[i]
                                            finalBoardCells += constructedObjects.boardCells['cell'+ (i+1)].mark;
                                        }
                                        console.log(finalBoardCells,finalCombination)
                                        combinationArray.push([finalCombination]);
                                        if(combinationArray.length == 100) {
                                            break loop1;
                                        }
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