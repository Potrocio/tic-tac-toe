'use strict';

let finalBoardCells = 'placeholder'

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

    const AvailableSpace = (availableCells) => {
        return{availableCells};
    }

    return{Cell,Players,WinningPatterns,AvailableSpace};
})();

const constructedObjects = ((cell,player,pattern,available) => {
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

    const availableSpace = (() => {
        const roundOne = available(['cell1','cell2','cell3','cell4','cell5','cell6','cell7','cell8','cell9']);
        const roundTwo = available('');
        const roundThree = available('');
        const roundFour = available('');
        const roundFive = available('');
        const roundSix = available('');
        const roundSeven = available('');
        const roundEight = available('');
        const roundNine = available('');
        return { roundOne,roundTwo,roundThree,roundFour,roundFive,roundSix,roundSeven,roundEight,roundNine}

    })();

    return{boardCells,players,winningPatterns,availableSpace};
})(objectConstructors.Cell,objectConstructors.Players,objectConstructors.WinningPatterns,objectConstructors.AvailableSpace);

//AI training

let combinationArray = [];
let roundOne = constructedObjects.availableSpace.roundOne.availableCells;


function checkTrainingWinner(winningPatterns) {
    for (let object in winningPatterns) {
        let winningPattern = object;
        object = winningPatterns[object]
        // console.log('cell1 = ' +object.cellA,'cell2 = '+object.cellB,'cell3 = '+object.cellC)
        if(object.cellA === object.cellB && object.cellB === object.cellC) {
            if(object.cellA !== undefined) {
                if(object.cellA == 'X') {
                    combination[9] = 'lose';
                    // console.log('X wins' , winningPattern)
                    return;

                } else {
                    combination[9] = 'win';
                    // console.log('O wins', winningPattern)
                    return;
                }; 
            }
        } else {
            combination[9] = 'tie';
        }
    };
};

function checkInterception(stage,marking,combinationIndex,currentRound,nextRound) {
    var cycleFinished = false;
    for (let object in constructedObjects.winningPatterns) {
        object = constructedObjects.winningPatterns[object];
        let totalMarks = object.cellA.mark + object.cellB.mark + object.cellC.mark;
        if(cycleFinished === false) {
            if(totalMarks.length === 2 && totalMarks[0] == totalMarks[1]) {
                for(let cell in object) {
                    if(object[cell].mark == ''){
                        let objectPosition = 'cell' + object[cell].position;
                        constructedObjects.boardCells[objectPosition].mark = marking;
                        combination[combinationIndex] = object[cell].position;
                        if(nextRound){
                            constructedObjects.availableSpace[nextRound].availableCells = currentRound.filter((item) => {
                                if(item !== objectPosition) {
                                    return true;
                                }
                            })
                        }
                        cycleFinished = true;
                    }
                }
            }
        }
        
    }

    if (cycleFinished == false) {
        combination[combinationIndex] = constructedObjects.boardCells[stage].position;
        constructedObjects.boardCells[stage].mark = marking;
        if(nextRound) {
            constructedObjects.availableSpace[nextRound].availableCells = currentRound.filter((item) => {
                if(item !== stage) {
                    return true;
                }
            })
        } 
    }
    // for (let number in constructedObjects.boardCells) {
    //     console.log(number,constructedObjects.boardCells[number].mark, constructedObjects.boardCells[number].position)
    // }
    // let testing = '';
    // for (let number in combination) {
    //     testing += combination[number];
    // }
    // console.log(testing,combinationIndex+1)
    // return combination;
}

function clearRemainingSpaces(availableCells, combinationIndex) {
    for (let cell in availableCells) {
        constructedObjects.boardCells[availableCells[cell]].mark = '';
    }
    let combinationsToDelete = 9 - combinationIndex;
    for (let i = combinationIndex; i < combinationsToDelete; i++) {
        combination[i] = 0
    }
}

loop1:
    for(let cell in roundOne) {

        function resetBoardCells() {
            for(let object in constructedObjects.boardCells) {
                let objectToBeEdited = constructedObjects.boardCells[object];
                objectToBeEdited.mark = '';
            };    
        }

        resetBoardCells();
        var combination = [0,0,0,0,0,0,0,0,0,''];

        checkInterception(roundOne[cell],'X',0,roundOne,'roundTwo')

loop2:
        for(let cell in constructedObjects.availableSpace.roundTwo.availableCells) {
            clearRemainingSpaces(constructedObjects.availableSpace.roundTwo.availableCells,1);
            checkInterception(constructedObjects.availableSpace.roundTwo.availableCells[cell],'O',1,constructedObjects.availableSpace.roundTwo.availableCells, 'roundThree')

loop3:
            for(let cell in constructedObjects.availableSpace.roundThree.availableCells) {
                clearRemainingSpaces(constructedObjects.availableSpace.roundThree.availableCells,2);
                checkInterception(constructedObjects.availableSpace.roundThree.availableCells[cell],'X',2,constructedObjects.availableSpace.roundThree.availableCells, 'roundFour')

loop4:
                for(let cell in constructedObjects.availableSpace.roundFour.availableCells) {
                    clearRemainingSpaces(constructedObjects.availableSpace.roundFour.availableCells,3);
                    checkInterception(constructedObjects.availableSpace.roundFour.availableCells[cell],'O',3,constructedObjects.availableSpace.roundFour.availableCells, 'roundFive')

loop5:
                    for(let cell in constructedObjects.availableSpace.roundFive.availableCells) {
                        clearRemainingSpaces(constructedObjects.availableSpace.roundFive.availableCells,4);
                        checkInterception(constructedObjects.availableSpace.roundFive.availableCells[cell],'X',4,constructedObjects.availableSpace.roundFive.availableCells,'roundSix')

loop6:
                        for(let cell in constructedObjects.availableSpace.roundSix.availableCells) {
                            clearRemainingSpaces(constructedObjects.availableSpace.roundSix.availableCells,5);
                            checkInterception(constructedObjects.availableSpace.roundSix.availableCells[cell],'O',5,constructedObjects.availableSpace.roundSix.availableCells,'roundSeven')

loop7:
                            for(let cell in constructedObjects.availableSpace.roundSeven.availableCells) {
                                clearRemainingSpaces(constructedObjects.availableSpace.roundSeven.availableCells,6);
                                checkInterception(constructedObjects.availableSpace.roundSeven.availableCells[cell],'X',6,constructedObjects.availableSpace.roundSeven.availableCells,'roundEight')

loop8:
                                for(let cell in constructedObjects.availableSpace.roundEight.availableCells) {
                                    clearRemainingSpaces(constructedObjects.availableSpace.roundEight.availableCells,7);
                                    checkInterception(constructedObjects.availableSpace.roundEight.availableCells[cell],'O',7,constructedObjects.availableSpace.roundEight.availableCells,'roundNine')

loop9:
                                    for(let cell in constructedObjects.availableSpace.roundNine.availableCells) {
                                        checkInterception(constructedObjects.availableSpace.roundNine.availableCells[cell],'X',8,constructedObjects.availableSpace.roundNine.availableCells)

                                        let finalCombination = ''
                                        let finalBoardCells = '';
                                        
                                        for(let i=0 ; i < 9 ; i++) {
                                            finalBoardCells += constructedObjects.boardCells['cell'+ (i+1)].mark;
                                        }
                                        
                                        let winningTrainingPatterns = {
                                            rowOne : objectConstructors.WinningPatterns(finalBoardCells[0],finalBoardCells[1],finalBoardCells[2]),
                                            rowTwo : objectConstructors.WinningPatterns(finalBoardCells[3],finalBoardCells[4],finalBoardCells[5]),
                                            rowThree : objectConstructors.WinningPatterns(finalBoardCells[6],finalBoardCells[7],finalBoardCells[8]),
                                            columnOne : objectConstructors.WinningPatterns(finalBoardCells[0],finalBoardCells[3],finalBoardCells[6]),
                                            columnTwo : objectConstructors.WinningPatterns(finalBoardCells[1],finalBoardCells[4],finalBoardCells[7]),
                                            columnThree : objectConstructors.WinningPatterns(finalBoardCells[2],finalBoardCells[5],finalBoardCells[8]),
                                            rowOneDiagonal : objectConstructors.WinningPatterns(finalBoardCells[0],finalBoardCells[4],finalBoardCells[8]),
                                            rowThreeDiagonal : objectConstructors.WinningPatterns(finalBoardCells[2],finalBoardCells[4],finalBoardCells[6]),
                                        };

                                        checkTrainingWinner(winningTrainingPatterns);
                                        for(let i=0 ; i < combination.length; i++) {
                                            finalCombination += combination[i]
                                        }
                                        
                                        // console.log('final round',finalBoardCells,finalCombination)
                                        combinationArray.push([finalCombination]);
                                        combination[9] = '';

                                        // if(combinationArray.length == 1) {
                                        //     break loop1;
                                        // }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }

defaultGameVariables();
let previousItem = '';

combinationArray = combinationArray.sort()

combinationArray = combinationArray.filter((item) => {
    if(item[0] != previousItem) {
        previousItem = item;
        return true;
    }
})

let winningCombinations = combinationArray.filter((item) => {
    if(item[0][9] == 'w') {
        return true;
    };
})

let tyingCombinations = combinationArray.filter((item) => {
    if(item[0][9] == 't') {
        return true;
    };
})

let losingCombinations = combinationArray.filter((item) => {
    if(item[0][9] == 'l') {
        return true;
    };
})


//game events
const gameEvents = (() => {
    let turnCounter = 0;
    let gameEnded = false;
    let yourTurn = true;
    let currentCombination = '';
    const updateGameBoard = (() => {

        querySelectors.cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                if(cell.textContent == '' && gameEnded == false && yourTurn == true) {
                    turnCounter += 1;
                    gameEvents.currentCombination += e.target.id;
                    cell.textContent = constructedObjects.players.user.mark;
                    for(let object in constructedObjects.boardCells) {
                        if(constructedObjects.boardCells[object].className == e.target.classList.value)  {
                            let objectToBeEdited = constructedObjects.boardCells[object];
                            objectToBeEdited.mark = 'X';
                        }
                    };
                    yourTurn = false;
                    console.log('click works')

                    checkWinner();
                    if(gameEnded == false && turnCounter != 5) {
                        computerTurn();
                        yourTurn = true;
                    } else { 
                        nextRound();
                        yourTurn = true;
                    }
                }
            })
        })
    return{currentCombination}
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
            }
        };
    };

    const declareWinner = (player,tie) => {
        if (tie) {
            querySelectors.messageBoard.textContent = "It's a tie!";

        } else {
            querySelectors.messageBoard.textContent = 'The winner is ' + player;
        }
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
            gameEnded = false;
            gameEvents.currentCombination = '';
            turnCounter = 0;
        });
    };
    return{currentCombination,updateGameBoard,checkWinner,declareWinner}
})();

//make sure that availableWinningCombinations is an array of combinations which combinations do not have losing chances.
//you can do this testing the currentCombination next number and seeing how many losing combinations there are.
function nextAvailableChoices(){
    let choices = [1,2,3,4,5,6,7,8,9]
    choices = choices.filter((item) => {
        return !gameEvents.currentCombination.includes(item);
    })
    // console.log(choices)
    choiceStatistics(choices)
    // console.log(choices)
}

let bestOdds = {
    highestWinningChoice : '',
    highestTyingChoice : '',
    lowestLosingChoice : '',
    zeroLosingChoices : [],
}

function choiceStatistics(choices) {
    let highestWinningCombination = 0;
    let highestTyingCombination = 0;
    let lowestLosingCombination = 10000;
    bestOdds.zeroLosingChoices = [];
    bestOdds.highestWinningChoice = '',
    bestOdds.highestTyingChoice = '',
    bestOdds.lowestLosingChoice = '',



    // console.log(choices)
    choices.forEach((number) => {
        let choice = number;
        let combinationWithChoice = gameEvents.currentCombination + choice;
        let availableWinningCombinations = winningCombinations.filter((item) => {
            if(item[0][0] == combinationWithChoice[0] && item[0].includes(combinationWithChoice)) {
                return true
            }
        })

        let availableLosingCombinations = losingCombinations.filter((item) => {
            if(item[0][0] == combinationWithChoice[0] && item[0].includes(combinationWithChoice)) {
                return true
            }
        })

        let availableTyingCombinations = tyingCombinations.filter((item) => {
            if(item[0][0] == combinationWithChoice[0] && item[0].includes(combinationWithChoice)) {
                return true
            }
        })

        if(availableWinningCombinations.length > highestWinningCombination) {
            highestWinningCombination = availableWinningCombinations.length
            bestOdds.highestWinningChoice = choice;
        }

        if(availableTyingCombinations.length > highestTyingCombination) {
            highestTyingCombination = availableTyingCombinations.length
            bestOdds.highestTyingChoice = choice;
        }

        if(availableLosingCombinations.length < lowestLosingCombination) {
            lowestLosingCombination = availableLosingCombinations.length
            bestOdds.lowestLosingChoice = choice;
        }

        if(availableLosingCombinations.length == 0) {
            bestOdds.zeroLosingChoices.push(choice)
        }
        

        // console.log('choice '+ choice, 'win: ', availableWinningCombinations.length, '  lose :', availableLosingCombinations.length, '  tie: ', availableTyingCombinations.length);
        // console.log('highest win choice',bestOdds.highestWinningChoice,'highest tie choice',bestOdds.highestTyingChoice,'lowest lose choice',bestOdds.lowestLosingChoice)
        // console.log(bestOdds.zeroLosingChoices)
        // if(availableLosingCombinations)

        // let winningOdds = Math.trunc(availableWinningCombinations.length/(availableLosingCombinations.length + availableTyingCombinations.length) * 100);
        // let losingOdds = Math.trunc(availableLosingCombinations.length/(availableTyingCombinations.length + availableWinningCombinations.length) * 100)
        // let tyingOdds = Math.trunc(availableTyingCombinations.length/(availableLosingCombinations.length + availableWinningCombinations.length) * 100)
        // if(winningOdds == Infinity) {
        //     winningOdds = 100;
        // } else if(!winningOdds) {
        //     winningOdds = 0;
        // }
        // if(losingOdds == Infinity) {
        //     losingOdds = 100;
        // } else if(!losingOdds) {
        //     losingOdds = 0;
        // }
        // if(tyingOdds == Infinity) {
        //     tyingOdds = 100;
        // } else if(!tyingOdds) {
        //     tyingOdds = 0;
        // }
        // console.log('choice '+ choice, 'win: ', winningOdds + '%', '  lose :', losingOdds + '%', '  tie: ', tyingOdds + '%');
    })
    

}

function pickBestChoice(highestWinningChoice,highestTyingChoice,lowestLosingChoice,zeroLosingChoices){
    let idealChoice = '';
    console.log(highestWinningChoice,highestTyingChoice,lowestLosingChoice,zeroLosingChoices)
    console.log('pick best choice works')
    if(zeroLosingChoices.length != 0){
        if(highestWinningChoice !='') {
            console.log('highest winning choice',highestWinningChoice, 'zero losing choices', zeroLosingChoices)
            idealChoice = zeroLosingChoices.filter((item) => {
                if(item == highestWinningChoice) {
                    return true;
                }
            })
        } else if(zeroLosingChoices.includes(highestTyingChoice)){
            console.log('highest tying choice',highestTyingChoice, 'zero losing choices', zeroLosingChoices)

            idealChoice = zeroLosingChoices.filter((item) => {
                if(item == highestTyingChoice) {
                    return true;
                }
            })
        } else {
            idealChoice = zeroLosingChoices[0];
        }
    } else {
        idealChoice = lowestLosingChoice;
        console.log('lowest losing choice')
    }
    gameEvents.currentCombination += idealChoice;
    console.log(idealChoice)
    constructedObjects.boardCells['cell'+[idealChoice]].mark = 'O';
    document.getElementById(idealChoice).textContent = 'O'
   
}
let computerTurnEnded = '';
// work on 4,5,6 computer not executing next round
function checkComputerInterception() {
    console.log('check computer interception works')
    computerTurnEnded = false;
    let cycleFinished = false;
    for (let object in constructedObjects.winningPatterns) {
        object = constructedObjects.winningPatterns[object];
        let totalMarks = object.cellA.mark + object.cellB.mark + object.cellC.mark;
        if(cycleFinished === false) {
            if(totalMarks.length === 2 && totalMarks[0] == totalMarks[1]) {
                for(let cell in object) {
                    if(object[cell].mark == ''){
                        let objectPosition = 'cell' + object[cell].position;
                        constructedObjects.boardCells[objectPosition].mark = 'O';
                        console.log('this is computer interception',constructedObjects.boardCells[objectPosition].mark)
                        cycleFinished = true;
                        computerTurnEnded = true;
                        gameEvents.currentCombination += object[cell].position;
                        document.getElementById(object[cell].position).textContent = 'O'
                    
                    }
                }
            }
        }   
    }
    
}
function computerTurn() {
    console.log('computer turn works')
    nextAvailableChoices();
    checkComputerInterception();
    if(computerTurnEnded == false) {
        pickBestChoice(bestOdds.highestWinningChoice,bestOdds.highestTyingChoice,bestOdds.lowestLosingChoice,bestOdds.zeroLosingChoices);
    }
    gameEvents.checkWinner();
}