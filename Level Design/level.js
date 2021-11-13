class Level {
    constructor(w, h, qBall, ball, ball1, hole, radius) {
        this.qBallX = qBall.x
        this.qBallY = qBall.y
        this.w = w;
        this.h = h;
        this.qBall = new CueBall(qBall.x, qBall.y, radius);
        this.ball = new Ball(ball.x, ball.y, radius);
        this.ball1 = new Ball(ball1.x, ball1.y, radius);
        this.boundaryLeft = new Boundary(-25, h /2, 50, h)
        this.boundaryTop = new Boundary(w/2, -25, w, 50)
        this.boundaryRight = new Boundary(w + 25, h /2, 50, h)
        this.boundaryBottom = new Boundary(w/2, h + 25, w, 50)
        this.hole = hole;
        this.radius = radius;
        this.world = world
        this.balls = [this.qBall, this.ball, this.ball1]
    }
    createBodies() {
        Matter.Composite.add(world, [this.qBall.body, this.ball.body, this.ball1.body, this.boundaryLeft.body, this.boundaryTop.body, this.boundaryRight.body, this.boundaryBottom.body]);
    }
    showBodies() {
        fill(255)
        circle(this.hole.x, this.hole.y, this.radius * 2);
        strokeWeight(4);
        line(this.hole.x, this.hole.y, this.hole.x, this.hole.y - 150);
        fill('red');
        triangle(this.hole.x, this.hole.y - 150, this.hole.x, this.hole.y - 100, this.hole.x - 50, this.hole.y - 100);
        this.qBall.show();
        this.ball.show();
        this.ball1.show();
    }
    reSpotBall() {
        var vect = Matter.Vector.create(this.qBallX, this.qBallY)
        Matter.Body.setPosition(this.qBall.body, vect) 
        Matter.Body.setStatic(this.qBall.body, true)
        Matter.Body.setStatic(this.qBall.body, false)
        this.balls.push(this.qBall)
    }
}