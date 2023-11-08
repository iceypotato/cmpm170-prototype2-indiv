try {
    const { rect, box } = require("../crisp-game-lib/src/rect");
    const { vec, input } = require("../crisp-game-lib/src/main");
}
catch (err) {
    console.log("You are using NodeJS methods in HTML script.")
}


const G = {
    WIDTH: 200,
    HEIGHT: 100
}

title = "Ligma"
description = "Obsticle course";

characters = [
`
cccc
cccc
cccc
cccc
`
];

options = {
    viewSize: {
        x: G.WIDTH,
        y: G.HEIGHT
    }
};

/**
* @type { Player }
*/
let player

function init() {
    player = new Player()
}

function update() {
    if (!ticks) {
        init()
    }
    color("cyan");
    // box(vec(4, 4), 4)
    player.update()
}


function renderMap() {
}


addEventListener("load", onLoad);