const btnCntainr = document.querySelector(".buttons");
const container = document.querySelector(".container");

// Initial setting
let gridSize = 16;
let adjustedWidth = "20px";
let adjustedHeight = "20px";
let colorfull = 0;
let blacknwhite = 0;

// Universal scope function variables
let newHeight;
let newWidth;
let column;
let square;
let gridLoopCounter;
let currentSqrColor;

function createGrid() {
    for (gridLoopCounter = 0; gridLoopCounter < gridSize; gridLoopCounter++) {
    column = document.createElement("div");
    column.classList.add("column");
    container.appendChild(column);
        for (let n = 0; n < gridSize; n++) {
            let square = document.createElement("div");
            square.classList.add("sqrPixel");
            square.style.width = adjustedWidth;
            square.style.height = adjustedHeight;
            square.style.backgroundColor = "rgb(255, 255, 255)"
            square.addEventListener("mouseover", () => {
                if (colorfull === 0 && blacknwhite === 0) {
                    square.style.backgroundColor = "rgb(0, 0, 0)";
                }
                if (colorfull === 1) {
                    square.style.backgroundColor = generateRandomColor();
                }
                if (blacknwhite === 1) {
                    currentSqrColor = (square.style.backgroundColor);
                    square.style.backgroundColor = darken();
                }
            });
            column.appendChild(square);
        };
    };   
};

function eraseGrid() {
    for (; gridLoopCounter > 0; gridLoopCounter--) {
        container.removeChild(container.firstChild);
    };
};

function redefineGrid(size) {
    eraseGrid();
    gridSize = size;
    adjustedWidth = (320 / gridSize) + "px";
    adjustedHeight = (320 / gridSize) + "px";
    createGrid();
};

function generateRandomColor() {
    var randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function darken() {
    let firstCut = currentSqrColor.replace("rgb(", "");
    let secondCut = firstCut.replace(")", "");
    let colorArray = secondCut.split(", ");
    colorArray[0] -= 25;
    if (colorArray[0] < 0) {
        colorArray[0] = 0;
    };
    colorArray[1] -= 25;
    if (colorArray[1] < 0) {
        colorArray[1] = 0;
    };
    colorArray[2] -= 25;
    if (colorArray[2] < 0) {
        colorArray[2] = 0;
    };
    let darkerColor = "rgb(" + colorArray.join(", ") + ")"
    return darkerColor;
}