class Rectangle {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        
    }

    draw() {
        this.collider = rect(this.x, this.y, this.width, this.height)
    }

    /**
     * 
     * @param {Vector} vec 
     * @returns {boolean}
     */
    isOverlapping(pixelCoord) {
        if (this.x <= pixelCoord.x && pixelCoord.x < this.x + this.width && this.y <= pixelCoord.y && pixelCoord.y < this.y + this.height) {
            return true
        }
        // for (var x = 0; x < x.width; x++) {
        //     for (var y = 0; y < y.height; y++) {
        //         if (vec(this.x + x, this.y + y).equals(pixelCoord)) return true
        //     }
        // }
        return false
    }

    /**
     * If the pixelCoordinate is touching a pixel of the rectangle next to each other, not overlapping
     * @param {Vector} vec 
     * @returns {boolean}
     */
    isTouching(pixelCoord) {
        for (var x = 0; x < x.width; x++) {
            for (var y = 0; y < y.height; y++) {
                if (vec(this.x + x - 1, this.y + y).equals(pixelCoord)
                || vec(this.x + x + 1, this.y + y).equals(pixelCoord)
                || vec(this.x + x, this.y + y - 1).equals(pixelCoord)
                || vec(this.x + x, this.y + y + 1).equals(pixelCoord)
                ) return true
                // y + 1 , y - 1, x - 1, x + 1 == pixelcoord
            }
        }
        return false
    }
    
    /**
     * Find a pixel coordinate of the rectangle that is closest to pixel
     * @param {Vector} pixel
     * @returns {Object}
     * @property {Vector} px
     * @property {number} dist
     */
    closestPixelVertical(pixel) {
        var closest = Infinity
        var closestPixel = vec(0,0)
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                // var dist = Math.sqrt((pixel.x - (this.x + x)) * (pixel.x - (this.x + x)) + (pixel.y - (this.y + y)) * (pixel.y - (this.y + y)))
                var dist = Math.sqrt((pixel.y - (this.y + y)) * (pixel.y - (this.y + y)))
                if (dist < closest) {
                    closest = dist
                    closestPixel = vec(this.x + x, this.y + y)
                }
            }
        }
        return {px: closestPixel, dist: closest}
    }
}

class Map {

    constructor() {
        this.moveCounter = 0
        this.moveRate = 2  // move the map every 2 frames
        /**
         * @type { Array<Rectangle> }
         */
        this.rectangles = []

        // this.rectangles.push(new Rectangle())
        // this.rectangles.push(new Rectangle(10, 90, 4, 4))  // test rectangle
        this.rectangles.push(new Rectangle(18, 92, 4, 8))
        this.rectangles.push(new Rectangle(44, 0, 4, 56))
        this.rectangles.push(new Rectangle(46, 84, 4, 16))
        this.rectangles.push(new Rectangle(77, 25 ,4 ,75))
        this.rectangles.push(new Rectangle(114, 30, 4, 70))
        this.rectangles.push(new Rectangle(99, 0, 4, 8))
        this.rectangles.push(new Rectangle(123, 0, 4, 12))
        this.rectangles.push(new Rectangle(147, 0, 4, 75))
        this.rectangles.push(new Rectangle(196, 12, 4, 100))
        this.rectangles.push(new Rectangle(216, 0, 4, 11))
    }

    init() {
        this.rectangles.forEach((r) => {
            r.x += 50
            // r.x += -4
            r.draw()
        })
    }

    update() {
        this.rectangles.forEach((r) => {
            color("black")
            if (this.moveCounter >= this.moveRate - 1) {
                r.x -= 1
            }
            r.draw()
        })
        this.moveCounter++
        if (this.moveCounter >= this.moveRate) this.moveCounter = 0
    }
}