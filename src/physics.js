/**
 * @param {*} player 
 * @returns void
 */
function playerPhysics(player) {
    player.obj = box(player.pos, player.width)

    if (player.pos.y + 1 >= G.HEIGHT) {
        player.vel = vec(player.vel.x, 0)
    }
    else player.pos.add(player.vel)
}