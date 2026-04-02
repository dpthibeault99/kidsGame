// copyied from term 1 final -- needs revisons

import { Title } from "./title.js";
import { Game } from "./game.js";
import { Credits } from "./credits.js";
import { YouWin } from "./youWin.js";
import { Toolbox } from "../toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");
let toolbox = new Toolbox();


let state = new Title(canvas, pencil);

function gameloop() {
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    let command = state.update();

    if (command === "title") {
        state = new Title(canvas, pencil);
    }

    if (command === "game") {
        state = new Game(canvas, pencil);
        state.enterGame();  // keep your setup
    }

    if (command === "credits") {
        state = new Credits(canvas, pencil);
    }

    if (command === "youWin") {
        state = new YouWin(canvas, pencil);
    }
}

setInterval(gameloop, 1000 / 60);
