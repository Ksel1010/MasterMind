import { Boule, Position, R, B, K, W, P, G, Y, Y, O, E, dimension } from 'constants.js';

//draws the game board (4 empty balls in each row)
function draw_board() {
    const tbl = document.getElementById("masterMindBoard");
    for (let i = 0; i < dimension; i++) {
        const tbl_row = document.createElement("TR");
        for (let j = 0; j < 4; j++) {
            const tbl_col = document.createElement("TD");
            document.addEventListener('DOMContentLoaded', function() {
                tbl_col.innerHTML = '<img src="' + E.getImage() + '">';
            });  
            tbl_row.appendChild(tbl_col);
        }
        tbl.appendChild(tbl_row);
    }
}



//draws the table with all the pions 
function draw_pion_table() {
    const p_tbl = document.getElementById("pionsTable");
    for (let i = 0; i < dimension; i++) {
        const p_tbl_row = document.createElement("TR");
        const p_tbl_col = document.createElement("TD");
        p_tbl_row.appendChild(p_tbl_col);
        p_tbl.appendChild(p_tbl_row);
    }
}

//
function draw(){
    draw_pion_table();
    draw_board();
}
draw();



