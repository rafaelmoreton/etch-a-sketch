// Universal scope variables
let newHeight;
let newWidth;
let column;
let square;
let gridLoopCounter;
let currentSqrColor;

// --- //
// DOM Selectors
const btnCntainr = document.querySelector(".buttons");
const container = document.querySelector(".container");
const resetBtn = document.querySelector("#reset");
const redefineBtn = document.querySelector("#redefineSize");
const colorBtn = document.querySelector("#color");
const blacknwhiteBtn = document.querySelector("#blacknwhite");

// --- //
// Initial settings
let gridSize = 16;
let adjustedWidth = "20px";
let adjustedHeight = "20px";
let colorfull = 0;
let blacknwhite = 0;
createGrid();

// --- //
// Add functionality to buttons
resetBtn.addEventListener("click", () => {
    redefineGrid(gridSize);
})
redefineBtn.addEventListener("click", () => {
    let inputValue = prompt("ATENÇÃO! A TELA ATUAL SERÁ APAGADA. Para continuar, insira quantos píxels a nova tela deve ter de lado. Deve ser um número de 2 a 100.")
    gridSize = parseInt(Number(inputValue));
    if (((typeof gridSize) === "number") && (gridSize >= 2) && (gridSize <= 100)) {
        redefineGrid(gridSize);
    } else if ((inputValue) == null) {
        alert("Nenhum número inserido.");
    } else {
        alert(inputValue + " não é um número válido.");
    }
})
colorBtn.addEventListener("click", () => {
    if (colorfull == 0) {
        colorfull = 1;
        blacknwhite = 0;
        blacknwhiteBtn.classList.remove("pressedButton");
        colorBtn.classList.add("pressedButton");
    } else {
        colorfull = 0;
        colorBtn.classList.remove("pressedButton");
    }
})
blacknwhiteBtn.addEventListener("click", () => {
    if (blacknwhite == 0) {
        blacknwhite = 1;
        colorfull = 0;
        colorBtn.classList.remove("pressedButton");
        blacknwhiteBtn.classList.add("pressedButton");
    } else {
        blacknwhite = 0;
        blacknwhiteBtn.classList.remove("pressedButton");
    }
})

// --- //
// Grid creation functions
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

// --- //
// Draw tools functions
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

// --- //