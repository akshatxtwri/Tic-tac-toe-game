const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid ;
const winningposition =[
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]

];
// array banaya hai ye 

//lets create afunction to initialize the game
function initgame(){
       currentPlayer = "X";
       gameGrid = ["" ,"", "" , "" , "" , "" , "" , "" , ""]; 
       //ui par empty bhi karna padega boxes ko 
         
       boxes.forEach((box , index) => {
       box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // remove green color 
        boxes[index].classList.remove("win");
         
       });
 

       newgamebtn.classList.remove("active");
       gameinfo.innerText = `Current Player - ${currentPlayer}`; 
       //direct likh dete to hameshalikha rehta isliye call kiya naki direct text input de diya   
        
}

function checkgameover() {
     
    let answer = "";
     
    winningposition.forEach((position) => {
        // all three boxes should be non empty and of equal value 

        if( (gameGrid[position[0]] !== "" || 
            gameGrid[position[1]] !== ""  || 
            gameGrid[position[2]] !== "") 
            &&
            (gameGrid[position[0]] === gameGrid[position[1]] )&& 
            (gameGrid[position[1]] === gameGrid[position[2]])
        )
        {
        //    check if winner is x  
        if(gameGrid[position[0]] === "X"){
            answer = "X";
        }
        else{
            answer = "O";
        }
        // disable pointer events 
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
            // taki agar koi jeet jaye to aage click hi na kar paye 
       
        });


        //  now we know koi ek jeet gaya hai 

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
      }
        
    })
  
    if(answer !== ""){
        // it means we have a winner 
        gameinfo.innerText = `${answer} has won!`;
        newgamebtn.classList.add("active");
        return;
        
    }

    //when there is no winner and game is tied 
    let fillcount = 0;

    gameGrid.forEach((box) => {
        if(box !== ""){
            fillcount++;
        }

    });

    if(fillcount === 9){
        gameinfo.innerText = "Game is Tied!";
        newgamebtn.classList.add("active");
        return;
    }

}

initgame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //ui update
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
 // konsi player ki turn hai usko update kar diya 

}
function handleclick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        // this line bring changes in ui 
        gameGrid[index] = currentPlayer;
        // isse jo hamne grid banaya hai usme change aaega aur pata chalega tic tac toe game ka status kya chal raha hai 

        //swapping the turn 
        swapTurn();

        //check kahi koi jeet to ni gaya
        checkgameover();
    }

}


// let's create a function to handle box click

boxes.forEach((box,index) => {
    // for each loop se har ke box me jaayega index ke basis par aur event listner lagaega 
    box.addEventListener("click" , () => {
        handleclick(index);
        // index isliye pass kiya tha taaki pata chal sakte konse index ke box ko click kiya hai 
    })
});

newgamebtn.addEventListener("click" , initgame);




