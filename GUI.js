import { Boule, coloredBoules, R, B, K, W, P, G, Y, O, E,setDimension, getDimension } from './constants.js';
const storedDimension = sessionStorage.getItem("dimension");

// Parsing the stored value as a number
if (storedDimension) {
    const parsedDimension = parseInt(storedDimension, 10);
    if (!isNaN(parsedDimension)) {
        setDimension(parsedDimension);
    }
}

// Definition of global variables 
let dimension = getDimension();
console.log('dimension'+dimension);
let attempt = 0;
let chosenBoule = new Boule("pictures/empty_ball.png", 'empty');
let combination = [];
let Try = ['E', 'E', 'E', 'E'];
let current_color= '';
let state = false;
let cursor = document.createElement('img');


// FUNCTIONS FOR EQUIVALENCES 

// Function that returns the varibale for each ball
function getBoule(nomVariable) {
    switch (nomVariable) {
        case 'R': return R;
            break;
        case 'B': return B;
            break;
        case 'W': return W;
            break;
        case 'P': return P;
            break;
        case 'G': return G;
            break;
        case 'Y': return Y;
            break;
        case 'O': return O;
            break;
        case 'K': return K;
            break;

    }
}


// Function that returns the string for each ball
function getAliasBoule(nomVariable) {
    switch (nomVariable) {
        case R: return 'R';
            break;
        case B: return 'B';
            break;
        case W: return 'W';
            break;
        case P: return 'P';
            break;
        case G: return 'G';
            break;
        case Y: return 'Y';
            break;
        case O: return 'O';
            break;
        case K: return 'K';
            break;

    }
}




// FUNCTION FOR DRAWINGS

// Function that draws colored balls 
function drawBalls(){
    let tabColoredBoules = document.getElementById('coloredBoules');
for (const ele in coloredBoules) {
    if (Object.hasOwnProperty.call(coloredBoules, ele)) {
        const bouleObject = coloredBoules[ele];
        const image = document.createElement('img');
        image.src = bouleObject.getImage();
        image.height = 37;
        image.width = 37;
        image.classList.add('image');

        image.addEventListener('click', function () {
            clickedBoule(ele);
        });
        tabColoredBoules.appendChild(image);
    }
}
}

//Funtion that draws the game board (4 empty balls in each row)
function draw_board() {
    const tbl = document.getElementById("masterMindBoard");
    for (let i = 0; i < dimension; i++) {
        const tbl_row = document.createElement("TR");
        for (let j = 0; j < 4; j++) {
            const tbl_col = document.createElement("TD");

            const img = new Image();
            img.src = E.getImage(); 

            img.width = 50;
            img.height = 50;

            tbl_col.appendChild(img);
            if (i == 0) {
                img.addEventListener('click', function () {
                    change(tbl_col,j);
                })
            }
            tbl_row.appendChild(tbl_col);
        }
        tbl.appendChild(tbl_row);
    }
}

//Function that creates a table of the pions
function drawCellPions(cell/*the cell in which we put the new table*/, numberOfRed, numberOfWhite) {
    const table = document.createElement('table');
    for (let i = 0; i < 2; i++) {
        let row = document.createElement('tr');
        console.log(numberOfRed);
        for (let j = 0; j < 2; j++) {
            let cell = document.createElement('td');
            const img = new Image();
            
            if (numberOfWhite > 0) {
                img.src = "pictures/pion_white.png";
                numberOfWhite --;
            } else if (numberOfRed > 0){
                img.src = "pictures/pion_red.png";
                numberOfRed--;
            } else {
                img.src = "pictures/pion_empty.png";
            }
            img.width = 20;
            img.height = 18;
            cell.appendChild(img);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    cell.innerHTML = "";
    cell.appendChild(table);
}

//Function that draws the table with all the pions 
function draw_pion_table() {
    const p_tbl = document.getElementById("pionsTable");
    for (let i = 0; i < dimension; i++) {
        const p_tbl_row = document.createElement("TR");
        const p_tbl_col = document.createElement("TD");
        drawCellPions(p_tbl_col, 0, 0);
        p_tbl_row.appendChild(p_tbl_col);
        p_tbl.appendChild(p_tbl_row);
    }
}

// Function thah draws all tables
function draw() {
    draw_pion_table();
    draw_board();
}




// FUNCTIONS FOR GAME PLAY : MODIFICATION OF THE DISPLAY

// Function that stores the ball color when an image is clicked
function clickedBoule(ele) {
    state = true;
    current_color=ele;
    changeCursor(ele);
}

// Function that shows the selected ball near the cursor 
function changeCursor(ele) {
    let boule = getBoule(ele);
    cursor.src = boule.getImage();
    cursor.width = 20; 
    cursor.height = 20;
    cursor.style.position = 'absolute';
    document.body.append(cursor); 
}

//function that changes the images in the table with the clicked ones
function change(cell, nb_col) {
    if (state) {
        let maBoule = getBoule(current_color);
        const img = new Image();
        img.src = maBoule.getImage();
        img.width = 50;
        img.height = 50;
        cell.innerHTML = "";
        cell.appendChild(img);
        cursor.remove();
        Try[nb_col]=current_color;
        state = false;
    } 
}

//function to add event listener to a line
function listenLine(line) {
    let tabl = document.getElementById("masterMindBoard");
    for (let i = 0; i < 4; i++) {
        tabl.rows[line].cells[i].addEventListener('click', function () {
            change(tabl.rows[line].cells[i], i);
        });
    } 
}




// FUNCTIONS FOR GAME PLAY : MANAGING THE COMBINATION 

// Function that selects 4 random colors in order to generate the combination
function generation() {
    const colors = [R, B, K, W, P, G, Y, O];
    for (let i = 0; i < 4; i++) {
        // generation of random index 
        let index = Math.floor(Math.random() * colors.length);
        combination.push(getAliasBoule(colors[index]));
    }
}

// Function that checks the try combination and returns the number of pions
function verification() {     
    let redPion = 0;
    let whitePion = 0;
    let combinationCopy = combination.slice();

    for (let i = 0; i < 4; i++) {
        if (combinationCopy[i] === Try[i] ) {
            redPion++;
            combinationCopy[i] = 'E';
            Try[i] = 'E';        
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            if (combinationCopy[i] === Try[j] && Try[j]!=='E' && combinationCopy[i]!=='E') {
                whitePion++;
                Try[j] = 'E';    
            }
        }
    }
    return [redPion, whitePion];
}

//Function that checks if the game is over or not
function is_game_over() {
    //combination guessed or too many attempts compared to difficulty
    if ( attempt >= (dimension-1)) {
        return true;
    } else {
        return false;
    }
}

// Function that makes one tour of game 
function answer() {
    let isOneBouleEmpty=false;
    for (let i=0;i<4;i++){
        if (Try[i]=='E'){
            isOneBouleEmpty=true;
            break;
        }
    }
    if (isOneBouleEmpty){
        alert('you should finish your try first');
    }
    else{
        let p_tbl_case = document.getElementById("pionsTable");
        let pions = verification();
        let numberOfRed=pions[0];
        let numberOfWhite=pions[1];
        const imgR = new Image();
        imgR.src = R.getImage();
        const imgW = new Image();
        imgW.src = W.getImage();
        console.log('white:'+numberOfWhite+'   red:'+numberOfRed);
        if (numberOfRed==4) {
            drawCellPions(p_tbl_case.rows[attempt].cells[0],numberOfRed,numberOfWhite);            
            /*alert("You won! You truly are the MasterMind.");*/
            end_game(true);
        }
        else{
            drawCellPions(p_tbl_case.rows[attempt].cells[0],numberOfRed,numberOfWhite);            
            if(is_game_over()==true){
                /*alert('you lost!! play again?');*/
                end_game(false);
            }
            else{
                attempt += 1;
                Try=['E','E','E','E'];
                listenLine(attempt);
        }
        }
    }
}



// FUNCTIONS FOR GAME PLAY : MANAGING THE WHOLE GAME

//Function that starts and manages a game
function game_start() {
    document.getElementById("endGameScreen").style.display = "none";
    //we empty the board in case a former game is still here
    const tbl = document.getElementById("masterMindBoard");
    tbl.innerHTML = "";
    const p_tbl = document.getElementById("pionsTable");
    p_tbl.innerHTML = "";

    drawBalls();
    //we draw a fresh new empty board
    draw();

    //we generate a new combination
    generation();

    //we can print the generated combination to verify
    console.log(combination);

    //we give the default values to important variables again
    attempt = 0;
    chosenBoule.image = "pictures/empty_ball.png";
    chosenBoule.color = 'E';
    Try = ['E', 'E', 'E', 'E'];
}


// Function that manages the end of the game
function end_game(won){

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endGameScreen").style.display = "block";
    let message = document.createElement('h2');
    if (won===true){
        message.innerText = 'You won ! You truly are the MasterMind !'
    } else {    
        message.innerText = "WASTED ! play again ?"
    }
    document.getElementById("endGameScreen").append(message);
    let buttons = document.createElement("section");
    let menuButton = document.createElement("Button");
    menuButton.innerText = "Main Menu";
    menuButton.addEventListener("click", function(){
        window.open("index.html", "_self");
    });
    buttons.append(menuButton);

    let replayButton = document.createElement("Button");
    replayButton.innerText = "Replay";
    replayButton.addEventListener("click", function(){
        window.open("game.html", "_self");
    });
    buttons.append(replayButton);
    document.getElementById("endGameScreen").append(buttons);
   
}



// EVENT LISTENERS 

// Moving the image near the cursor
document.addEventListener('mousemove',(e)=>{
    const x = e.clientX + cursor.width/2;
    const y = e.clientY + cursor.height/2;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});

//Checking the verification button
document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('buttonVerification');
    if (button) {
        button.addEventListener('click', answer);
    }
});


game_start();




