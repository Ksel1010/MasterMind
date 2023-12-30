export class Boule {
    constructor(imagePath, color) {
        this.image = imagePath;
        this.color = color;
    }
    getColor() {
        return (this.color);
    }
    getImage() {
        return (this.image);
    }
    setImage(im){
        this.image=im;
    }

};

//for the board's cells
export class Position {
    constructor(color) {
        this.color = color;
    }
    getColor() {
        return (this.color);
    }
};

//all the balls
export let R = new Boule("pictures/red_ball.png", 'red');
export let B = new Boule("pictures/blue_ball.png", 'blue');
export let K = new Boule("pictures/black_ball.png", 'black');
export let W = new Boule("pictures/white_ball.png", 'white');
export let P = new Boule("pictures/purple_ball.png", 'purple');
export let G = new Boule("pictures/green_ball.png", 'green');
export let Y = new Boule("pictures/yellow_ball.png", 'yellow');
export let O = new Boule("pictures/orange_ball.png", 'orange');
export let E = new Boule("pictures/empty_ball.png", 'empty');


//number of rows for the board based on difficulty
let dimension=12;

//function to change dimension
export function setDimension(number){
    sessionStorage.setItem("dimension", JSON.stringify(number));
    dimension=number;
}
export function getDimension(number){
    return dimension;
}
export const coloredBoules={R,B,K,W,P,G,Y,O};
