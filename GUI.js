import { Boule, Position, coloredBoules, R, B, K, W, P, G, Y, O, E, dimension } from './constants.js';

let attempt = 1;
let chosenBoule = new Boule("pictures/empty_ball.png", 'empty');
let combination = [];

//function when an image is clicked
function clickedBoule(ele) {
    chosenBoule.color= ele;
    let img;
    console.log(chosenBoule.color);
    switch (ele){
        case 'R': img="pictures/red_ball.png";
        break;
        case 'B': img="pictures/blue_ball.png";
        break;
        case 'W':img="pictures/white_ball.png";
        break;
        case 'P':img="pictures/purple_ball.png";
        break;
        case 'G' :img="pictures/green_ball.png";
        break;
        case 'Y':img="pictures/yellow_ball.png"
        break;
        case 'O':img="pictures/orange_ball.png";
        break;
        case 'K':img="pictures/black_ball.png";
        break;

    }
    chosenBoule.image=img;
    console.log(chosenBoule.image);

}

//function button verification
function verifier(params) {
    alert('boutton vérifié')
}

//function replay 
function replay(attempt) {
    while (true) {
        if (attempt > dimension) {
            alert('Vous avez perdu!')
        }
        attempt += 1
    };
}

//function to add event listener to a line
function listenLine(line) {
    let tabl = document.getElementById("masterMindBoard");
    for (var i = 0; i < 4; i++) {
        change(tabl[i]);
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

//function that changes the images in the table with the clicked ones
function change(cell) {
    //const cell = document.getElementById("masterMindBoard");
    if (chosenBoule.color != 'E') {
        const img = new Image();
        img.src = chosenBoule.getImage();
        console.log(chosenBoule.image)
        img.width = 50;
        img.height = 50;
        cell.innerHTML = 
        chosenBoule.color = 'E';
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

function verification(Try) {     //returns the numbers of pions: Note that if redPions==4 then the game must end
    let redPion = 0;
    let whitePion = 0;
    let combinationCopy = combination.cloneDeep();

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
    //fonction qui demarre le jeu
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
                    change(tbl_col);
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
function answer(Try) {
    let p_tbl_case = document.getElementById("pionsTable")[0][attempt];
    let numberOfRed;
    let numberOfWhite;
    numberOfRed,numberOfWhite = verification(Try);
    drawCellPions(p_tbl_case, numberOfRed, numberOfWhite);
}

function verifie(){
    
}

//function that starts a game
function game(){
    //we empty the board in case a former game is still here
    const tbl = document.getElementById("masterMindBoard");
    tbl.innerHTML="";
    const p_tbl = document.getElementById("pionsTable");
    p_tbl.innerHTML="";

    //we draw a fresh new empty board
    draw();
    
    //we generate a new game
    generation();    
}

 

