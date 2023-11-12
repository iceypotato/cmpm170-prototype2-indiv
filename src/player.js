class Player {

    /**
     * @param {Map} map 
     */
    constructor(map) {
        // Player Flags
        this.hasGravity = true
        this.gravityDirection = 1  // positive for falling, negative for rising
        this.canJump = false
        this.isGrounded = false
        this.canDoubleJump = false
        this.isCurrentlyJumping = false
        // this.isFalling = true

        // Player Stats
        /** @type {Vector} */
        this.pos = vec(10,50)
        // this.pos = vec(18,95)
        /** @type {Vector} */
        this.velocity = vec(0,0)
        this.gravityAccel = 0.2
        this.maxFallSpeed = 4
        this.jumpAccel = 0.5
        this.width = 4
        this.map = map
    }

    update() {
        // player.pos = vec()
        if (input.isJustPressed) {
            if (!this.isGrounded && this.canDoubleJump) {
                this.gravityDirection *= -1
                this.canDoubleJump = false
            }
            if (this.canJump) {
                this.isCurrentlyJumping = true
                this.canJump = false
                this.isGrounded = false
                this.isTouchingWorldBorder = false
            }
        }
        this.obj = rect(this.pos, this.width, this.width)
        this.fall()
        this.jump()
        this.checkSideCollision(this.map)
        this.checkTopAndBottomCollision(this.map)
        this.pos.y += this.velocity.y 
    }

    /**
     * have accel due to g increase the negative velocity
     * if the velocity reaches max, stop increasing.
     * if hits the ground, make velocity 0
     */
    fall() {
        // player hits the ground
        if (this.isGrounded) return
        else if (abs(this.velocity.y) < this.maxFallSpeed && !(this.isGrounded)) {
            this.velocity.add(0, this.gravityDirection * this.gravityAccel)
        }
        
    }

    jump() {
        if (!this.isCurrentlyJumping) return
        // debugger
        
        this.velocity.add(0, this.gravityDirection * -this.jumpAccel)

        if (abs(this.velocity.y) > 2) {
            this.isCurrentlyJumping = false
        }
    }

    tpToGround(distanceLeft) {
        this.velocity = vec(this.velocity.x, distanceLeft)
        this.pos.y += this.velocity.y
        this.pos.y = Math.round(this.pos.y)
        this.velocity = vec(this.velocity.x, 0)
    }
    
    /**
     * @param {Map} map 
     */
    checkSideCollision(map) {
        for (var i = 0; i < this.width; i++) {
            var playerPixel = vec(this.pos.x + this.width - 1, this.pos.y + i)
            map.rectangles.forEach((r) => {
                if (r.isOverlapping(playerPixel)) {
                    color("red")
                    end("You died")
                }
            })
        }
    }

    /**
     * @param {Map} map 
     */
    checkTopAndBottomCollision(map) {
        var distanceLeft = 0
        var gonnaCollide = false
        for (var i = 0; i < this.width; i++) {
            if (
            (this.pos.y + (this.width) + this.velocity.y >= G.HEIGHT
            || this.pos.y - 1 + this.velocity.y < 0)
            && !this.isCurrentlyJumping
            ) {
                distanceLeft = (this.gravityDirection === 1) * G.HEIGHT - (this.pos.y + (this.gravityDirection === 1) * this.width)
                gonnaCollide = true
                break
            }
        }
        for (var i = 0; i < this.width; i++) {
            var playerBorderPixel = vec(this.pos.x + i, this.pos.y + ((this.gravityDirection === 1) ? this.width : -1))  // Represents one pixel above/below the top/bottom
            var playerNextPixel = vec(this.pos.x + i,  this.pos.y + ((this.gravityDirection === 1) ? this.width : -1) + this.velocity.y)
            var closestPixel = {}

            /** @type {Rectangle} */
            var closestRect = null
            map.rectangles.forEach((r) => {
                if (r.isOverlapping(playerNextPixel)) {
                    closestPixel = r.closestPixelVertical(playerBorderPixel)
                    closestRect = r
                    distanceLeft = this.gravityDirection * closestPixel.dist
                    gonnaCollide = true
                    return
                }
            })
            if (gonnaCollide) break
        }
        if (gonnaCollide && !this.isCurrentlyJumping) {
            this.tpToGround(distanceLeft)
            this.canJump = true
            this.isGrounded = true
            this.canDoubleJump = true
        }
        if (!gonnaCollide) {
            this.isGrounded = false
        }
    }

}