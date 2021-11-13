const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Constraint, Events, Vector } = Matter;

var game = new Game()


var world, engine, mConstraint, ball, ground, bally, wally, mouse;

var mouseIsDown, mousePos = {};

function setup() {
    game.generateLevel()
    const canvas = createCanvas(1100,600)
    engine = Engine.create()
    world = engine.world
    world.gravity.y = 0
    game.level.createBodies()
    const mouse = Mouse.create(canvas.elt);
    mouse.pixelRatio = pixelDensity();
};

function mousePressed() {
    mouseIsDown = true
    mousePos.x = mouseX 
    mousePos.y = mouseY
};

function mouseDragged() {
    mousePos.x = mouseX;
    mousePos.y = mouseY;
};

function mouseReleased() {
    mouseIsDown = false;
    mousePos.x = mouseX;
    mousePos.Y = mouseY;
    if (game.level.qBall.isStill()) {
        game.level.qBall.applyForce(mousePos);
        game.strokes++
    }
};

// we are using our own circleCollision function instead of Matter JS because we only need to check when a ball
// hits the the hole, which is a fixed point. This should make it more efficient. It also allows us to fine tune 
// when the collision happens, as in the real world of golf we dont want the ball to fall in the hole if it just 
// burns the edge. 
function circleCollision() {
    var c1; 
    var c2 = {r: 10, x:950, y: 300} // hole placement and radius
    for (let i = 0; i < game.level.balls.length; i++) {
        var b = game.level.balls[i]
        c1 = {r: b.r, x: b.body.position.x, y: b.body.position.y}
        var dx = c1.x - c2.x
        var dy = c1.y - c2.y 
        // Pythagorus to the rescue!
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < c1.r + c2.r) {
            if (b instanceof CueBall) {
                game.level.balls.splice(i, 1);
                game.loseALife();
                game.level.reSpotBall()
            } else {
                b.remove();
            }
        }
    }
}

function draw() {
    if (game.lives == 0) {
        game.restartGame()
        Matter.Composite.clear(world, true)
        game.level.createBodies()
    }
        Engine.update(engine);
        background('green');
        textSize(32);
        fill('black')
        text("Strokes: " + game.strokes, 10, 30);
        text("Lives: " + game.lives, 950, 30);
        if (mouseIsDown && game.level.qBall.isStill()) {
            game.level.qBall.drawPointer(mousePos);
        }
        game.level.showBodies();
        circleCollision();
};


