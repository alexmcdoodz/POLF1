const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Constraint } = Matter;

// matter.world.remove to get rid of ball when hit the hole 

var world, engine, mConstraint, ball, ground, bally, wally, mouse;

function setup() {
    const canvas = createCanvas(800,500)
    engine = Engine.create()
    world = engine.world
    world.gravity.y = 0
    ball = new Ball(200, 300, 20)
    bally = new Ball(600,20,20)
    ceiling = new Ground(400, 20, 800, 50)
    ground = new Ground(400,450, 800, 50) 
    ground1 = new Ground(10, 20, 100, 750)
    wally = new Ground(800, 20, 100, 750)
    mouse = Mouse.create(canvas.elt);
    mouse.pixelRatio = pixelDensity();
}

var mouseClickX, mouseClickY, mouseRelX, mouseRelY;

function createVector(xC,yC,xR,yR) {
    var x = xC- xR
    var y = yC - yR
    var tempVec = Matter.Vector.create(x, y)
    return Matter.Vector.neg(tempVec)
}

function isInsideCircle() {
    // Thank you pythagoras you greek god
    var dx = abs(mouseClickX - ball.body.position.x), dy = abs(mouseClickY - ball.body.position.y), radius = ball.r 
    if (Math.pow(dx,2) + Math.pow(dy, 2) < Math.pow(radius, 2)) {
        return true
    } else {
        return false
    }
}

function mousePressed() {
    mouseClickX = mouseX 
    mouseClickY = mouseY 
}


function mouseReleased() {
    mouseRelX = mouseX
    mouseRelY = mouseY
    if (isInsideCircle()) {
        var targetAngle = Matter.Vector.angle(ball.body.position, mouse.position);
        var force = Matter.Vector.cross({x: mouseClickX, y: mouseClickY}, {x: mouseRelX, y: mouseRelY}) * 0.000002
        console.log(force)
        var vel = {
            x: cos(targetAngle) * force, 
            y: sin(targetAngle) * force
        }
        var realVel;
        if (force < 0) {
            realVel = vel
        } else {
            realVel = Matter.Vector.neg(vel)
        }
        Matter.Body.applyForce(ball.body, ball.body.position, realVel);
    }
}


function draw() {
    background(50)
    Matter.Engine.update(engine);
    bally.show()
    ground.show()
    ground1.show()
    wally.show()
    ball.show()
    ceiling.show()
    fill(174)
    circle(400,250,25)
}


