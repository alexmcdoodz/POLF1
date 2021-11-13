class Game {
    constructor() {
        this.lives = 3;
        this.score = 0;
        this.strokes = 0;
        this.holeSelect = 1;
        this.level; 
    }
    generateLevel() {
        switch(this.holeSelect) {
            case 1:
                this.level = new Level(1100,600,{x:100, y: 300}, {x: 700, y: 100}, {x:700, y:500}, {x:950, y:300}, 20);
              break;
            case y:
                console.log("We only have 1 level right now give us a break");
              break;
            default:
                console.log("Either something very bad has happened or you've completed the game, well done!");
          }
    };
    loseALife() {
        this.lives--;
    };
    penis() {
        console.log("Nerds rule the world")
    }
    restartGame() {
        this.lives = 3;
        this.strokes = 0;
        this.holeSelect = 1;
        this.generateLevel();
    };
};