class Player {

    constructor() {
        this.gravityAccel = 0.01
        this.hasGravity = true
        this.canJump = false
        this.grounded = false
        /** @type {Vector} */
        this.pos = vec(5,5)
        this.width = 4
        /** @type {Vector} */
        this.velocity = vec(0,0)
        this.maxFallSpeed = 4
    }

    update() {
        // player.pos = vec()
        this.obj = box(this.pos, this.width)
        this.fall()
    }

    /**
     * have accel due to g increase the negative velocity
     * if the velocity reaches max, stop increasing.
     * if hits the ground, make velocity 0
     */
    fall() {
        // player hits the ground
        if (this.pos.y + 1 >= G.HEIGHT) {
            this.velocity = vec(this.velocity.x, 0)
        }
        else if (this.velocity.y !== this.maxFallSpeed) {
            this.velocity.add(0, this.gravityAccel)
        }
        this.pos.y += this.velocity.y 
    }

    jump() {
        if (this.currentVelY > -this.maxJumpSpeed && !this.isFalling) {
            this.isCurrentlyJumping = true
            this.hasJump = false
            if (this.currentVelY - this.jumpAccel < -this.maxJumpSpeed) {
                this.currentVelY = -this.maxJumpSpeed
            }
            else this.currentVelY -= this.jumpAccel
            
        }
        if (this.isCurrentlyJumping) {
            this.jumpDistance += Math.abs(this.currentVelY)
        }
        if (this.jumpDistance >= this.jumpHeight) {
            this.isFalling = true
            this.isCurrentlyJumping = false
            this.jumpDistance = 0
        }
        this.sprite.setVelocity(this.currentVelX, this.currentVelY)
        this.currentPos = this.sprite.position
    }

}