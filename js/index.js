let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rect=canvas.getBoundingClientRect();
const WIDTH=600;
const HEIGHT=600;
let DIMENSIONS=20;
let SQUARE_WIDTH=WIDTH/DIMENSIONS;
let SQUARE_BORDER=1;

let board=new Board();
let actualColor=0.1;

function changeColor(color)
{
    actualColor = color;
}

function loop()
{
    console.log(0);
    board.play();
}

function start()
{
    window.setInterval(loop,500);
}


