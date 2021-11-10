
const vp_width = window.innerWidth / 2, vp_height = window.innerHeight / 2; 
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

class ball {
	// takes in starting location and sets radius of ball
	constructor(x,y,r) {
		this.x = x; // Maybe unnecessary
		this.y = y;
		this.radius = r;
		this.diameter = r * 2;
		// sets the body property of class to a matter.js body
		this.body = Bodies.circle(this.x, this.y, this.radius); 
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
        // body.applyForce ??
        // mouse or mouseconstraint might give mouse position and events
        // Events.on(mouseconstraint, "mousedown", callback) >> event{mouse, sourceElement, eventName}

        // mouse object has mosue.position, docs don't mention it

        // Vector.magnitude(vector)
        // There should be a maximum magnitude of force, or the user could send the cue to space

        // Force should be applied on mouseup, 
        // pointer should be drawn while mousedown and position should be updated on mousemove

        force = Vector.create();
        this.body.applyForce(force);
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
		this.body = Bodies.rectangle(this.x, this.y, this.height, this.width, this.options)
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
circley = new ball(200, 100, 50);
groundy = new ground(vp_width / 2, vp_height - 20, 600, 30)
boxy = new box(200, 10, 100, 100);
console.log(circley.body)
console.log(groundy.body)

function setup() {
	viewport = createCanvas(vp_width, vp_height); 
	viewport.parent("viewport_container");
	engine = Engine.create();
	world = engine.world; 
    mouseConstraint = MouseConstraint.create(engine, {
        element: viewport,
        constraint: {}
    });
	// add our bodies to the world so it is effected by the physics engine. 
	World.add(world, [boxy.body, circley.body, groundy.body, mouseConstraint])
}


// mousePos = Mouse.postion
// force = cueBall.vectorTo(mousePos)

// if mousedown and mousemove then
//     drawPointer(force)

// if mouseup then
//     cueBall.applyForce(force)
//     removePointer()
var mouseIsDown = false;
var mousePos;

Events.on(mouseConstraint, "mousedown", function() {
    mouseIsDown = true;
    mousePos = mouse.position;
    console.log(mousePos);
})

function draw() {
	Engine.update(engine)
	background(255)
	fill(200)
	fill(200)


	boxy.drawBox()
	circley.drawBall()
	groundy.drawGround()
    // Could use ballArray.map((b) => b.drawBall())
}

// parent class ball, child class be cue ball, potting balls, lead ball.
// game object - start game, stop game, scores.
// wall class 
// course container, has course shape and course elements with their positions. 