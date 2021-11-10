class Ground {
    constructor(x,y,w,h) {
        const options = {
            isStatic: true
        }
        this.body = Matter.Bodies.rectangle(x,y,w,h,options)
        Matter.World.add(world, this.body);
        this.w = w
        this.h = h
    }
    show() {
        const pos = this.body.position;
        fill(255);
        rectMode(CENTER);
        rect(pos.x, pos.y, this.w, this.h);
    }
}