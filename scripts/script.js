const btnCntainr = document.querySelector(".buttons");
const container = document.querySelector(".container");

for (let i = 0; i < 16; i++) {
    let column = document.createElement("div");
    column.classList.add("column");
    container.appendChild(column);
    for (let n = 0; n < 16; n++) {
        let square = document.createElement("div");
            square.classList.add("sqrPixel")
            square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "black";
        });
        column.appendChild(square);
    };
}