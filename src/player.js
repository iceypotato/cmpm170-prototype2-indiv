class Player {

    /**
     * @param {Map} map 
     */
    constructor(map) {
        this.hasGravity = true
        this.gravityDirection = 1  // positive for falling, negative for rising
        this.canJump = false
        this.canDoubleJump = false
        this.isCurrentlyJumping = false
        /** @type {Vector} */
        this.pos = vec(4,98)
        /** @type {Vector} */
        this.velocity = vec(0,0)
        this.gravityAccel = 0.2
        this.maxFallSpeed = 4
        this.jumpAccel = 0.5
        this.width = 4
        this.radius = this.width / 2
        this.map = map
    }

    update() {
        // player.pos = vec()
        if (input.isJustPressed) {
            if (this.canJump) {
                this.isCurrentlyJumping = true
                this.canJump = false
            }
        }
        this.obj = box(this.pos, this.width)
        this.fall()
        this.jump()
        this.collideWithMap(this.map)
        // the origin of the box is the center
        for (var i = 0; i < this.width; i++) {
            if (this.pos.y + this.radius + 1 >= G.HEIGHT && this.velocity.y > 0) {
                var distanceLeft = G.HEIGHT - (this.pos.y + this.radius)
                this.velocity = vec(this.velocity.x, distanceLeft)
                this.pos.y += this.velocity.y 
                this.velocity = vec(this.velocity.x, 0)
                this.canJump = true
                break
            }
        }
        // if (this.pos.y + this.radius)
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
        // if (this.pos.y + 1 >= G.HEIGHT) {
        //     this.velocity = vec(this.velocity.x, 0)
        // }
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

    /**
     * @param {Vector} vector 
     */
    checkPixel(vector) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; i < this.width; j++) {

            }
        }
    }
    
    /**
     * @param {Map} map 
     */
    collideWithMap(map) {
        for (var i = 0; i < this.width; i++) {
            var playerPixel = vec(this.pos.x + this.radius, this.pos.y - this.radius + i)
            map.rectangles.forEach((r) => {
                if (r.isColliding(playerPixel)) console.log("fgdfys hxuidlsdfhyui")
            })
        }
    }

}