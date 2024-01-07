const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info")
const newgameBtn = document.querySelector(".new-game")


let currentPlayer;
let gameGrid;


//possible outcomes to win the game 
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//creating a function to initialising the game
function initGame(){
    currentPlayer ="X"
    gameGrid = ["", "", "", "", "", "", "", "",""];
    boxes.forEach((box, index) => {
        box.innerHTML = ""; 
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;

    })
    newgameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current player - ${currentPlayer}`;

}

//calling the function to start the game
initGame();



//for swap the user
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer ="O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//function to cheak game is over or not 
function checkgameOver(){
    let answer = "";

    winningPosition.forEach((position) => {
        if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="") && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {

            if(gameGrid[position[0]] === "X")
                answer ="X";
            else
                answer = "O";

            //pointer event remove when game is over
            boxes.forEach((box) => {
                box.style.pointerEvents ="none";
            })

            //changeing bg color when user win the game 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    //printing the answer to UI 
    if(answer !== ""){
        gameInfo.innerText = `Winner Player -${answer}`;
        newgameBtn.classList.add("active");
        return;
    }

    //function to cheak game is tied
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newgameBtn.classList.add("active");
    }
}



//this is game info button which sows us which player is win and which player has chance to do next move 
function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index]= currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkgameOver();
    }
}

//this fuction allow players to fill the empaty box by X or O in game 
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


//this is restart button 
newgameBtn.addEventListener("click", initGame);