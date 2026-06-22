let started = false;
let score = 0;
let hisocre = localStorage.getItem("hisocre");
let input = false;
if (hisocre === null) {
    hisocre = 0;
} else {
    hisocre = Number(hisocre);
}

let card = document.querySelector(".sco");
let btns = document.querySelectorAll(".btn");
let body = document.querySelector("body");
let hi = document.querySelector("h5");
let ins = document.querySelector(".ins");

hi.innerText = `High Score : ${hisocre}`;
let user = [];
let game = [];

const colors = ["red", "green", "orange", "blue"];

document.addEventListener("keydown", begin);

function begin() {
    if (started) return;

    game = [];
    started = true;
    score = 0;

    body.style.backgroundColor = "white";
    ins.innerText = "";

    setTimeout(nextSequence, 1000);
}

function userInput() {
    let color = this.classList[1];

    flash(color);

    user.push(colors.indexOf(color));

    console.log("User:", user);

    if (user[user.length - 1] != game[user.length - 1]) {
        console.log("lose");

        body.style.backgroundColor = "rgb(227, 103, 103)";

        if (game.length + 1 > hisocre) {
            hisocre = game.length;
            localStorage.setItem("hisocre", hisocre);
            hi.innerText = `High Score : ${hisocre}`;
        }

        for (let btn of btns) {
            btn.removeEventListener("click", userInput);
        }

        started = false;
        ins.innerText = "Press any key to start the game";

        return;
    }

    if (user.length == game.length) {
        body.style.backgroundColor = "lightgreen";

        setTimeout(() => {
            body.style.backgroundColor = "white";
        }, 500);

        setTimeout(repeat, 1000);

        for (let btn of btns) {
            btn.removeEventListener("click", userInput);
        }
    }
}

function repeat() {
    for (let i = 0; i < game.length; i++) {
        setTimeout(() => {
            flash(colors[game[i]]);
        }, i * 700);
    }

    setTimeout(nextSequence, game.length * 700);
}

function nextSequence() {
    user = [];

    card.innerText = `Score : ${game.length + 1}`;

    let curr = Math.floor(Math.random() * 4);

    game.push(curr);

    flash(colors[curr]);

    for (let btn of btns) {
        btn.addEventListener("click", userInput);
    }

    console.log("Game:", game);
}

function flash(color) {
    let btn = document.querySelector("." + color);

    btn.style.backgroundColor = "white";

    setTimeout(() => {
        btn.style.backgroundColor = color;
    }, 500);
}
