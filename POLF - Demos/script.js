
const vp_width = window.innerWidth / 2, vp_height = window.innerHeight / 2; 
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Vector = Matter.Vector;

class ball {
	// takes in starting location and sets radius of ball
	constructor(x,y,r, options) {
		this.x = x; // Maybe unnecessary
		this.y = y;
		this.radius = r;
		this.diameter = r * 2;
		// sets the body property of class to a matter.js body
		this.body = Bodies.circle(this.x, this.y, this.radius, options); 
        World.add(world, this.body);
	}
	// Function to render ball to screen, called within P5 draw()
	drawBall() {
		var pos = this.body.position;
		this.x = pos.x;
		this.y = pos.y;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		strokeWeight(1);
		stroke(255);
		fill(127);
		circle(0, 0, this.diameter);
		pop();
	}
}

class cueBall extends ball {
    constructor(x,y,r) {
        super(x,y,r);
    }

    applyForce(mousePos) {
        // Force should be applied on mouseup, 
        // pointer should be drawn while mousedown and position should be updated on mousemove

        var mouseToBall = Vector.sub(this.body.position, mousePos);
        mouseToBall = Vector.mult(mouseToBall, 0.1);
        console.log(Vector.magnitude(mouseToBall));

        // if (Vector.magnitude(mouseToBall) > 20)

        Body.setVelocity(this.body, mouseToBall);
    }
}

class ground {
	constructor (x,y,h,w) {
		this.x = x
		this.y = y
		this.height = h
		this.width = w
		this.options = {
			isStatic: true
		}
		this.body = Bodies.rectangle(this.x, this.y, this.height, this.width, this.options);
        World.add(world, this.body);
	}
	drawGround() {
		var pos = this.body.position
		fill(200)
		rectMode(CENTER)
		rect(pos.x, pos.y, this.height, this.width)
	}
}

class box {
	constructor(x,y,h,w) {
		this.x = x
		this.y = y 
		this.height = h
		this.width = w
		this.body = Bodies.rectangle(this.x, this.y, this.height, this.width)
        World.add(world, this.body);
	}
	drawBox() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		fill(200);
		rectMode(CENTER)
		rect(0, 0, this.height, this.width)
		pop()
	}
}



var boxy, groundy, engine, world, circley, mouseConstraint;
// circley = new cueBall(200, 100, 10);
// groundy = new ground(vp_width / 2, vp_height - 20, 600, 30)
// boxy = new box(200, 10, 100, 100);


var mouseIsDown = false;
var mousePos;

function setup() {
	viewport = createCanvas(vp_width, vp_height); 
	viewport.parent("viewport_container");
	engine = Engine.create();
	world = engine.world; 
    world.gravity.y = 0;
    var mouse = Mouse.create(viewport.elt);
    mouse.pixelRatio = pixelDensity();
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        element: viewport.elt,
        constraint: {
            render: {visible: false},
            stiffness: 0.8
        }
    });
	// add our bodies to the world so it is effected by the physics engine. 
	World.add(world, mouseConstraint);
    circley = new cueBall(200, 100, 10, {restitution: 1});
    groundy = new ground(vp_width / 2, vp_height - 20, 600, 30)



    Events.on(mouseConstraint, "mousedown", function(event) {
        mouseIsDown = true;
        mousePos = event.mouse.position;
        // console.log(mouseIsDown + " " + mousePos.x + " " + mousePos.y);
    });

    Events.on(mouseConstraint, "mousemove", function(event) {
        if (mouseIsDown) {
            mousePos = event.mouse.position;
            // console.log(mousePos.x + " " + mousePos.y);
        }
    });

    Events.on(mouseConstraint, "mouseup", function(event) {
        mouseIsDown = false;
        mousePos = event.mouse.position;
        circley.applyForce(mousePos);
        // console.log(mouseIsDown + " " + mousePos.x + " " + mousePos.y);
    });
}


// mousePos = Mouse.postion
// force = cueBall.vectorTo(mousePos)

// if mousedown and mousemove then
//     drawPointer(force)

// if mouseup then
//     cueBall.applyForce(force)
//     removePointer()


function draw() {
	Engine.update(engine)
	background(255)
	fill(200)
	fill(200)


	// boxy.drawBox()
	circley.drawBall()
	groundy.drawGround()
    // Could use ballArray.map((b) => b.drawBall())
}

// parent class ball, child class be cue ball, potting balls, lead ball.
// game object - start game, stop game, scores.
// wall class 
// course container, has course shape and course elements with their positions. 