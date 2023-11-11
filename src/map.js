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
    isColliding(pixelCoord) {
        if (this.x < pixelCoord.x && pixelCoord.x < this.x + this.width && this.y < pixelCoord.y && pixelCoord.y < this.y + this.height) {
            return true
        }
        // for (var x = 0; x < x.width; x++) {
        //     for (var y = 0; y < y.height; y++) {
        //         if (vec(this.x + x, this.y + y).equals(pixelCoord)) return true
        //     }
        // }
        return false
    }
}

class Map {

    constructor() {
        /**
         * @type { Array<Rectangle> }
         */
        this.rectangles = []

        // this.rectangles.push(new Rectangle())
        this.rectangles.push(new Rectangle(18, 92, 4, 8))
        this.rectangles.push(new Rectangle(46, 84, 4, 16))
        this.rectangles.push(new Rectangle(77, 25 ,4 ,75))
        this.rectangles.push(new Rectangle(99, 0, 4, 8))
        this.rectangles.push(new Rectangle(123, 0, 4, 12))
        this.rectangles.push(new Rectangle(147, 0, 4, 75))
    }

    init() {
        this.rectangles.forEach((r) => {
            r.x += -3
        })
    }

    update() {
        this.rectangles.forEach((r) => {
            color("black")
            r.x -= 0.5
            r.draw()
        })
    }
}