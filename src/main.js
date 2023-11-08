try {
    const { box, rect } = require("../crisp-game-lib/src/rect");
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

let player

function init() {
    player = {
        pos: vec(10, G.HEIGHT * 0.5),
        vel: vec(0,1),
        accel: 0.5,
        width: 4,
        obj: null
    }
}

function update() {
    if (!ticks) {
        init()
    }
    playerPhysics(player)
    color("cyan");
}


function renderMap() {
    rect()
}


addEventListener("load", onLoad);