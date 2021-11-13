class Ball {
    constructor(x, y, r) {
      const options = {
        restitution: 1,
        frictionAir: 0.017,
        frictionStatic: 0
      };
      this.body = Matter.Bodies.circle(x, y, r, options);
      this.r = r;
      // kept these in for starting positions to reSpot Ball
      this.x = x;
      this.y = y;
      this.showing = true;
      this.line;
    }
  
    show() {
      if (this.showing) {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(175);
        circle(0, 0, this.r * 2);
        pop();
      }
    };
    remove() {
      Matter.World.remove(world, this.body);
      this.showing = false;
    };
  };

  class CueBall extends Ball {
    constructor(x,y,r) {
        super(x,y,r);
    }

    findVector(mousePos) {
      var mouseToBall = Vector.sub(this.body.position, mousePos);
      return mouseToBall;
    }

    isStill() {
      if (this.body.speed < 0.1) {
        return true
      } else {
        return false
      }
    }

    drawPointer(mousePos) {
      var vect = this.findVector(mousePos);
      var lineVect = Vector.add(vect, this.body.position);
      var magnitude = Matter.Vector.magnitude(vect);
      if (magnitude > 150) {
        var dX = createVector(lineVect.x, lineVect.y);
        var dY = createVector(this.body.position.x, this.body.position.y);
        var euclidean = dX.sub(dY).normalize().mult(150).add(dY);
        line(this.body.position.x, this.body.position.y, euclidean.x, euclidean.y);
      } else {
        line(this.body.position.x, this.body.position.y, lineVect.x, lineVect.y);
      }
    }

    applyForce(mousePos) {
      var mouseToBall = Vector.sub(this.body.position, mousePos);
      mouseToBall = Vector.mult(mouseToBall, 0.1);
      if (Vector.magnitude(mouseToBall) > 15 || Vector.magnitude(mouseToBall) < -15) {
        mouseToBall = Vector.mult(Vector.normalise(mouseToBall), 15);
      }
      Body.setVelocity(this.body, mouseToBall);
    }
};