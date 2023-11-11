class Player {

    /**
     * @param {Map} map 
     */
    constructor(map) {
        this.hasGravity = true
        this.gravityDirection = 1  // positive for falling, negative for rising
        this.canJump = false
        this.isGrounded = false
        this.canDoubleJump = false
        this.isCurrentlyJumping = false
        /** @type {Vector} */
        this.pos = vec(18,92-4)
        // this.pos = vec(18,95)
        /** @type {Vector} */
        this.velocity = vec(0,4)
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
            if (!this.isGrounded && this.canDoubleJump) {
                this.gravityDirection *= -1
                this.canDoubleJump = false
            }
            if (this.canJump) {
                this.isCurrentlyJumping = true
                this.canJump = false
                this.isGrounded = false
            }
        }
        this.obj = rect(this.pos, this.width, this.width)
        this.fall()
        this.jump()
        this.checkSideCollision(this.map)
        this.checkTopAndBottomCollision(this.map)

        this.keepInBounds()

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

    ground(distanceLeft) {
        this.velocity = vec(this.velocity.x, distanceLeft)
        this.pos.y += this.velocity.y 
        this.velocity = vec(this.velocity.x, 0)
        this.canJump = true
        this.isGrounded = true
        this.canDoubleJump = true
    }

    keepInBounds() {
        for (var i = 0; i < this.width; i++) {
            if (
            (this.pos.y + (this.width - 1) + this.velocity.y >= G.HEIGHT
            || this.pos.y + this.velocity.y < 0)
            && !this.isCurrentlyJumping
            ) {
                var distanceLeft = (this.gravityDirection === 1) * G.HEIGHT - (this.pos.y + (this.gravityDirection === 1) * this.width)
                this.ground(distanceLeft)
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
                if (r.isOverlapping(playerPixel)) end("You died")
            })
        }
    }

    /**
     * @param {Map} map 
     */
    checkTopAndBottomCollision(map) {
        for (var i = 0; i < this.width; i++) {
            var playerCurrPixel = vec(this.pos.x + i, this.pos.y + (this.gravityDirection === 1) * (this.width - 1))
            var playerNextPixel = vec(this.pos.x + i,  this.pos.y + (this.gravityDirection === 1) * (this.width - 1) + this.velocity.y)
            var closestPixel = {}
            var gonnaCollide = false
            /** @type {Rectangle} */
            var closestRect = null
            map.rectangles.forEach((r) => {
                if (r.isOverlapping(playerNextPixel)) {
                    closestPixel = r.closestPixel(playerCurrPixel)
                    closestRect = r
                    gonnaCollide = true
                    return
                }
            })
            // playerPixel = vec(playerPixel.x, playerPixel.y - this.gravityDirection)
            // rect y = 92, player y should be 88
            if (gonnaCollide && !this.isCurrentlyJumping) {
                closestPixel = closestRect.closestPixel(playerCurrPixel)
                this.ground(this.gravityDirection * -closestPixel.dist)
                console.log("standing on top")
                break
            }
        }
    }

}