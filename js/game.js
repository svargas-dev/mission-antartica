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
    // console.log(`Is collision: ${this.isCollison(this.ship.position, this.obstacles.icebergArr[0])}`);
    console.log('Ship pos: ' + this.ship.position + ' Obstacle pos: ' + this.obstacles.icebergArr[0]);
    if (!this.isCollison(this.ship.position, this.obstacles.icebergArr[0])) {
      this.obstacles.generateIcebergs();
      this.obstacles.updateIcebergs();
    } else {
      this.gameOver();
    }
  }


  isCollison(object1, object2) {
    return
      (object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y);
  }


  animation(timestamp) {
    //   console.log(timestamp)
    this.drawEverything();
    this.updateEverything(timestamp);

    // requestAnimationFrame will generate a timestamp that we will use it as a reference
    //  for doing other things, and call the animation() again
    window.requestAnimationFrame(timestamp => this.animation(timestamp));
  }


  gameOver() {
    const ctx = this.ctx;
    ctx.fillStyle = 'red';
    ctx.fillRect(this.WIDTH / 2, this.HEIGHT / 2, 64, 64);
  }
}
