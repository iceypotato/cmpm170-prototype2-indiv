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
            r.x += 100
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