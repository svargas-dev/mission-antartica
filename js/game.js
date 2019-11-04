// need function spriteAtlas()
// sprites will be 32x32 - 16bit

class Game {
  constructor($canvas) {
    this.canvas = $canvas;
    this.ctx = this.canvas.getContext('2d');
    this.HEIGHT = this.canvas.height;
    this.WIDTH = this.canvas.width;

    this.sea = new Sea(this);
    this.ship = new Ship(this);
    this.controls = new Controls(this);
    this.controls.setControls();
    this.obstacles = new Obstacles(this);
    this.level = 1;
    this.score = 0;
  }

  startScr() {
    // Set up layers and movement
    // fade out
  }

  startGame() {
    // call everything
    this.animation();
  }

  drawEverything() {
    // this.clearAll();
    this.sea.draw();
    this.ship.draw();
    this.obstacles.draw();
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  updateEverything(timestamp) {
    // this.sea.update();
    // this.ship.update();

    this.obstacles.generateIcebergs();
    this.obstacles.updateIcebergs();
    
  }

  // compares the properties of two objects
  isCollison(object1, object2) {
    return object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height && object1.y + object1.height > object2.y;
  }

  
  animation(timestamp) {
    //   console.log(timestamp)
    this.drawEverything();
    this.updateEverything(timestamp);

    // requestAnimationFrame will generate a timestamp that we will use it as a reference
    //  for doing other things, and call the animation() again
    const animationRef = window.requestAnimationFrame(timestamp => this.animation(timestamp));
    for (let obstacle of this.obstacles.icebergArr) {
      // console.log(obstacle);
      if (this.isCollison(this.ship.position, obstacle)) {
        this.gameOver();
        window.cancelAnimationFrame(animationRef);
      }
    }
  }


  gameOver() {
    const ctx = this.ctx;
    ctx.fillStyle = 'red';
    ctx.fillRect(this.WIDTH / 2, this.HEIGHT / 2, 64, 64);
  }
}
