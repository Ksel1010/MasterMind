import { Boule, Position,coloredBoules, R, B, K, W, P, G, Y, O, E, dimension } from './constants.js';

let attempt=1;
//function when an image is clicked
function clickedBoule(ele){
    console.log(ele);
}
//images of the chosen colors
let tabColoredBoules=document.getElementById('coloredBoules');
for(const  ele in coloredBoules){
    if(Object.hasOwnProperty.call(coloredBoules, ele)){
        const bouleObject=coloredBoules[ele];
        const image=document.createElement('img');
        image.src=bouleObject.getImage();
        image.height=37;
        image.width=37;
        image.classList.add('image');

        image.addEventListener('click',function(){
            clickedBoule(ele);
        });
        tabColoredBoules.appendChild(image);
    }
    
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
            img.addEventListener('click',function(){

            });
            tbl_row.appendChild(tbl_col);
        }
        tbl.appendChild(tbl_row);
    }
}

//function creating a table of the pions
function drawCellPions(cell/*the cell in which we put the new table*/, numberOfRed, numberOfGreen){
    const table=document.createElement('table');
    for(let i=0;i<2;i++){
        let row=document.createElement('tr');

        for(let j=0;j<2;j++){
            let cell=document.createElement('td');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    for(let i=0;i<numberOfRed;i++){
        const img = new Image();
        img.src = R.getImage();

        img.width = 18; 
        img.height = 18; 
        table.rows[Math.floor(i/2)].cells[i%2].appendChild(img);
    }
    for(let i=0;i<numberOfGreen;i++){
        const img = new Image();
        img.src = G.getImage();

        img.width = 18; 
        img.height = 18; 
        table.rows[Math.floor(i/2)].cells[i%2].appendChild(img);
    }
    for(let i=0;i<(4-numberOfGreen-numberOfRed);i++){
        const img = new Image();
        img.src = E.getImage();

        img.width = 18; 
        img.height = 18; 
        table.rows[Math.floor(i/2)].cells[i%2].appendChild(img);
    }

    cell.appendChild(table);
}

//draws the table with all the pions 
function draw_pion_table() {
    const p_tbl = document.getElementById("pionsTable");
    for (let i = 0; i < dimension; i++) {
        const p_tbl_row = document.createElement("TR");
        const p_tbl_col = document.createElement("TD");
        drawCellPions(p_tbl_col,0,0);
        p_tbl_row.appendChild(p_tbl_col);
        p_tbl.appendChild(p_tbl_row);
    }
}


function draw(){
    draw_pion_table();
    draw_board();
}
draw();



