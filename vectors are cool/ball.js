class Ball {
    constructor(x, y, r) {
      const options = {
        restitution: 1
      };
      this.body = Matter.Bodies.circle(x, y, r, options);
      Matter.World.add(world, this.body);
      this.r = r;
      this.x = this.body.position.x
      this.y = this.body.position.y
    }
  
    show() {
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(175)
      circle(0, 0, this.r * 2, this.r * 2);
      pop();
    }
  }