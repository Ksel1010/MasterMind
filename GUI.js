import { Boule, Position, coloredBoules, R, B, K, W, P, G, Y, O, E, dimension } from './constants.js';

let attempt = 1;
let chosenBoule = new Boule("pictures/empty_ball.png", 'empty');
let combination = [];
let Try = [E, E, E, E];

var Tab = [E, E, E, E];

let current_color= '';
let state = false;

//adding click type event listener for verification button (in game.html)
const button = document.getElementById("buttonVerification");
button.addEventListener("click", answer());

//func = [E,E,E,E]  tion when an image is clicked
function clickedBoule(ele) {
    state = true;
    current_color=ele;

    for (var i = 0; i < 4; i++) {
        console.log(Tab[i]);
    }
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

        Tab[nb_col]=maBoule;

        state = false;
        for (var i = 0; i < 4; i++) {
            console.log(Tab[i]);
        }
    }

    
}

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

//function button verification
function verifier() {
    alert('boutton verifie')
}

//function replay 
function replay(attempt) {
    while (true) {
        if (attempt > dimension) {
            alert('Vous avez perdu!')
        }

    };
}

//function to add event listener to a line
function listenLine(line) {
    let tabl = document.getElementById("masterMindBoard");
    for (var i = 0; i < 4; i++) {
        change(tabl[i], i);
        console.log(tabl[i]);
    };
    console.log("listenLine");

}
//listenLine(0);

//images of the chosen colors
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



// Function that selects 4 random colors in order to generate the combination
function generation() {
    const colors = [R, B, K, W, P, G, Y, O];
    for (let i = 0; i < 4; i++) {
        // generation of random index 
        let index = Math.floor(Math.random() * colors.length);
        combination.push(colors[index]);
    }
}

function verification() {     //returns the numbers of pions: Note that if redPions==4 then the game must end
    let redPion = 0;
    let whitePion = 0;
    let combinationCopy = combination;

    for (let i = 0; i < 4; i++) {
        if (combinationCopy[i] == Try[i]) {
            redPion++;
            combinationCopy[i] = 'E';
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (combinationCopy[i] == Try[j]) {
                whitePion++;
                combinationCopy[i] = 'E';
            }
        }
    }
    return redPion, whitePion;
}

//select the game mode depending on which button is pressed on the main page
//then starts the game
function game_mode(difficulty) {
    switch (difficulty) {
        case "Easy Mode":
            dimension = 15;
            break;
        case "Normal Mode":
            dimension = 12;
            break;
        case "Hard Mode":
            dimension = 8;
            break;
    }
    window.open("game.html", "_self");
    game_start();
}

//draws the game board (4 empty balls in each row)
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

//function creating a table of the pions
function drawCellPions(cell/*the cell in which we put the new table*/, numberOfRed, numberOfWhite) {
    const table = document.createElement('table');
    for (let i = 0; i < 2; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 2; j++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    for (let i = 0; i < numberOfRed; i++) {
        const img = new Image();
        img.src = R.getImage();

        img.width = 18;
        img.height = 18;
        table.rows[Math.floor(i / 2)].cells[i % 2].appendChild(img);
    }
    for (let i = 0; i < numberOfWhite; i++) {
        const img = new Image();
        img.src = W.getImage();

        img.width = 18;
        img.height = 18;
        table.rows[Math.floor(i / 2)].cells[i % 2].appendChild(img);
    }
    for (let i = 0; i < (4 - numberOfWhite - numberOfRed); i++) {
        const img = new Image();
        img.src = E.getImage();

        img.width = 18;
        img.height = 18;
        table.rows[Math.floor(i / 2)].cells[i % 2].appendChild(img);
    }
    cell.innerHTML = "";
    cell.appendChild(table);
}

//draws the table with all the pions 
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


function draw() {
    draw_pion_table();
    draw_board();
}
draw();


// Function that displays the pions
function answer() {
    let p_tbl_case = document.getElementById("pionsTable")[attempt];
    let numberOfRed;
    let numberOfWhite;
    numberOfRed, numberOfWhite = verification();
    //drawCellPions(p_tbl_case, numberOfRed, numberOfWhite);
    const imgR = new Image();
    imgR.src = R.getImage();
    const imgW = new Image();
    imgW.src = W.getImage();
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            if (numberOfRed > 0) {
                p_tbl_case[i][j].innerHTML = "";
                p_tbl_case[i][j].appendChild(imgR);
                numberOfRed--;
            }
            else {
                if (numberOfRed == 0 && numberOfWhite > 0) {
                    p_tbl_case[i][j].innerHTML = "";
                    p_tbl_case[i][j].appendChild(imgW);
                    numberOfWhite--;
                }
            }
        }
    }

    //if there are 4 red pions, the combination has been guessed, the game is over
    if (is_game_over()) {
        alert("You won! You truly are the MasterMind.");
        //renvoyer sur une page de fin de jeu
        //renvoyer a l'acceuil
    } else {
        attempt += 1;
        Try=[E,E,E,E];
    }
}

//function that starts and manages a game
function game_start() {
    //we empty the board in case a former game is still here
    const tbl = document.getElementById("masterMindBoard");
    tbl.innerHTML = "";
    const p_tbl = document.getElementById("pionsTable");
    p_tbl.innerHTML = "";

    //we draw a fresh new empty board
    draw();

    //we generate a new combination
    generation();

    //we give the default values to important variables again
    attempt = 1;
    chosenBoule.image = "pictures/empty_ball.png";
    chosenBoule.color = 'E';
    Try = [E, E, E, E];
}

//checks if the game is over or not
function is_game_over() {
    //combination guessed or too many attempts compared to difficulty
    if (combination == Try || attempt > dimension) {
        return true;
    } else {
        return false;
    }
}




