const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;


var world, engine, mConstraint, ball, ground, bally, wally;
// work with ball not bally. 

function setup() {
    const canvas = createCanvas(800,500)
    engine = Engine.create()
    world = engine.world
    ball = new Ball(200, 300, 20)
    bally = new Ball(600,20,20)
    ground = new Ground(400,450, 800, 50) 
    wally = new Ground(750, 20, 20, 750)
    catapult = new Catapult(200, 300, ball.body);
    // set up of mouse interactivty within the canvas
    const mouse = Mouse.create(canvas.elt);
    const options = {
      mouse: mouse
    };
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}

function mouseReleased() {
    setTimeout(() => {
      catapult.fly();
    }, 100);
  }

  function circleCollision() {
    var c1 = {r: ball.r, x: ball.body.position.x, y: ball.body.position.y}
    var c2 = {r: 25, x:400, y: 250}

    var dx = c1.x - c2.x
    var dy = c1.y - c2.y 
    var distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < c1.r + c2.r) {
        console.log("Collision retard")
    }
}

function draw() {
    background(50)
    Matter.Engine.update(engine);
    ball.show()
    bally.show()
    ground.show()
    catapult.show()
    wally.show()
    fill(174)
    circle(400,250,25)
    circleCollision()
}

