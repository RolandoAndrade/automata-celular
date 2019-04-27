let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rect=canvas.getBoundingClientRect();
const WIDTH=600;
const HEIGHT=600;
let DIMENSIONS=20;
let SQUARE_WIDTH=WIDTH/DIMENSIONS;
let SQUARE_BORDER=1;
let drawing=false;

new Board();