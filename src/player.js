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
        this.isTouchingWorldBorder = false
        this.canDoubleJump = false
        this.isCurrentlyJumping = false
        this.isFalling = true

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
                this.isFalling = false
                this.canJump = false
                this.isGrounded = false
                this.isTouchingWorldBorder = false
            }
        }
        this.obj = rect(this.pos, this.width, this.width)
        this.fall()
        this.jump()
        this.checkSideCollision(this.map)
        this.keepInBounds()
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
        if (!this.isFalling || this.isGrounded) return
        // if (this.pos.y + 1 >= G.HEIGHT) {
        //     this.velocity = vec(this.velocity.x, 0)
        // }
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
            this.isFalling = true
        }
    }

    tpToGround(distanceLeft) {
        this.velocity = vec(this.velocity.x, distanceLeft)
        this.pos.y += this.velocity.y
        this.pos.y = Math.round(this.pos.y)
        this.velocity = vec(this.velocity.x, 0)
        this.canJump = true
        this.isGrounded = true
        this.canDoubleJump = true
        this.isFalling = false
    }

    keepInBounds() {
        for (var i = 0; i < this.width; i++) {
            if (
            (this.pos.y + (this.width - 1) + this.velocity.y >= G.HEIGHT
            || this.pos.y + this.velocity.y < 0)
            && !this.isCurrentlyJumping
            ) {
                var distanceLeft = (this.gravityDirection === 1) * G.HEIGHT - (this.pos.y + (this.gravityDirection === 1) * this.width)
                this.isTouchingWorldBorder = true
                this.tpToGround(distanceLeft)
                break
            }
        }
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
        for (var i = 0; i < this.width; i++) {
            var playerBorderPixel = vec(this.pos.x + i, this.pos.y + ((this.gravityDirection === 1) ? this.width : -1))  // Represents one pixel above/below the top/bottom
            var playerNextPixel = vec(this.pos.x + i,  this.pos.y + ((this.gravityDirection === 1) ? this.width : -1) + this.velocity.y)
            var closestPixel = {}
            var gonnaCollide = false
            /** @type {Rectangle} */
            var closestRect = null
            map.rectangles.forEach((r) => {
                if (r.isOverlapping(playerNextPixel)) {
                    closestPixel = r.closestPixelVertical(playerBorderPixel)
                    closestRect = r
                    gonnaCollide = true
                    return
                }
            })
            // rect y = 92, player y should be 88
            if (gonnaCollide && !this.isCurrentlyJumping) {
                closestPixel = closestRect.closestPixelVertical(playerBorderPixel)
                this.tpToGround(this.gravityDirection * closestPixel.dist)
                this.isGrounded = true
                this.isFalling = false
                break
            }
            else if (!this.isTouchingWorldBorder) {
                this.isGrounded = false
                this.isFalling = true
            }
            // if (!this.isGrounded && !this.onPlatform && !this.isCurrentlyJumping) {
            //     this.canJump = false
            // }
        }
    }

}