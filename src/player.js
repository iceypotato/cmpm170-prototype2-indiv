class Player {

    constructor() {
        this.hasGravity = true
        this.gravityDirection = 1  // positive for falling, negative for rising
        this.canJump = false
        this.isCurrentlyJumping = false
        /** @type {Vector} */
        this.pos = vec(5,5)
        /** @type {Vector} */
        this.velocity = vec(0,0)
        this.gravityAccel = 0.2
        this.maxFallSpeed = 4
        this.jumpAccel = 0.5
        this.width = 4
    }

    update() {
        // player.pos = vec()
        this.obj = box(this.pos, this.width)
        this.fall()
        this.jump()

        if (this.pos.y +)
        this.pos.y += this.velocity.y 
    }

    /**
     * have accel due to g increase the negative velocity
     * if the velocity reaches max, stop increasing.
     * if hits the ground, make velocity 0
     */
    fall() {
        // player hits the ground
        if (this.isCurrentlyJumping) return
        if (this.pos.y + 1 >= G.HEIGHT) {
            this.velocity = vec(this.velocity.x, 0)
        }
        else if (this.gravityDirection * this.velocity.y < this.maxFallSpeed) {
            this.velocity.add(0, this.gravityDirection * this.gravityAccel)
        }
        
    }

    jump() {
        if (!this.isCurrentlyJumping) return
        // debugger
        
        this.velocity.add(0, -this.jumpAccel)

        if (this.velocity.y < -2) {
            this.isCurrentlyJumping = false
        }

        // if (this.currentVelY > -this.maxJumpSpeed && !this.isFalling) {
        //     this.isCurrentlyJumping = true
        //     this.hasJump = false
        //     if (this.currentVelY - this.jumpAccel < -this.maxJumpSpeed) {
        //         this.currentVelY = -this.maxJumpSpeed
        //     }
        //     else this.currentVelY -= this.jumpAccel
            
        // }
        // if (this.isCurrentlyJumping) {
        //     this.jumpDistance += Math.abs(this.currentVelY)
        // }
        // if (this.jumpDistance >= this.jumpHeight) {
        //     this.isFalling = true
        //     this.isCurrentlyJumping = false
        //     this.jumpDistance = 0
        // }
        // this.sprite.setVelocity(this.currentVelX, this.currentVelY)
        // this.currentPos = this.sprite.position
    }

}