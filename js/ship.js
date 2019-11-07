class Ship {
  constructor(game) {
    this.game = game;
    this.shipImg = new Image();
    this.shipImg.src = 'images/ship-resize.png';
    // will center if ship image is changed...
    this.position = JSON.parse(`{"x": ${this.game.WIDTH/2}, "y": ${this.game.HEIGHT - this.shipImg.height - 300}, "width": ${this.shipImg.width}, "height": ${this.shipImg.height}}`);
    this.vx = 0;
  }


  update() {
    if (this.position.x + this.vx < this.game.WIDTH && 
        this.position.x + this.vx > 0) {
      this.position.x += this.vx;
    } else {
      this.game.sound.playClang();
    }
  }


  draw() {
    this.game.ctx.drawImage(this.shipImg, this.position.x - this.shipImg.width/2, this.position.y);
  }


  reset() {
    this.position = JSON.parse(`{"x": ${this.game.WIDTH/2}, "y": 340, "width": ${this.shipImg.width}, "height": ${this.shipImg.height}}`);
    this.course = 0;
    this.velocity = 0;
  }

}