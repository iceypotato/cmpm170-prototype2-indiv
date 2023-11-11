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
/**
 * @type { Map }
 */
let map

function init() {
    player = new Player()
    map = new Map()
}

var posx = 0

function update() {
    if (!ticks) {
        init()
        map.init()
    }
    color("cyan");
    player.update()
    map.update()
    // box(vec(6,6), 11)
}


function renderMap() {
}


addEventListener("load", onLoad);