class Ship {
  constructor(game) {
    this.game = game;
    this.shipImg = new Image();
    this.shipImg.src = 'images/ship.png';
    // will center if ship image is changed...
    // this.position = JSON.parse(`{"x": ${this.game.WIDTH/2}, "y": ${this.game.HEIGHT - this.shipImg.height - 30}, "width": ${this.shipImg.width}, "height": ${this.shipImg.height}}`);
    // except it doesn't... so here it is manually -- 
    this.position = {"x" : 320, "y" : 330, "width" : 32, "height": 135};
    this.vx = 0;
    // this.vy = 0;
  }


  update() {
    if (this.position.x + this.vx < this.game.WIDTH && 
        this.position.x + this.vx > 0) {
      this.position.x += this.vx;
    // } else if (this.position.y + this.vy < this.game.HEIGHT &&
    //   this.position.y + this.vy > 0 && 
    //   this.game.obstacles.velocity < 5 && 
    //   this.game.obstacles.velocity > 1) {
    //     this.position.y += this.vy;
    } else {
      this.game.sound.playClang();
    }
  }

  bounce() {
    let randomSide = (Math.random() - 0.5) * 16;
    this.position.x += randomSide;
  }

  draw() {
    this.game.ctx.drawImage(this.shipImg, (this.position.x - 16), this.position.y);
  }


  reset() {
    this.position = JSON.parse(`{"x": ${this.game.WIDTH/2}, "y": 330, "width": ${this.shipImg.width}, "height": ${this.shipImg.height}}`);
    this.course = 0;
    this.velocity = 0;
  }

}