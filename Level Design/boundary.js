class Boundary {
    constructor(x,y,w,h) {
        const options = {
            restitution: 1,
            friction: 0.2,
            isStatic: true,
            frictionStatic: 0
        };
        this.body = Matter.Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
    };
    show() {
        const pos = this.body.position;
        fill(255);
        rectMode(CENTER);
        rect(pos.x, pos.y, this.w, this.h);
    };
};