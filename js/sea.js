class Sea {
  constructor(game) {
    this.game = game;
    this.y = 0;
    this.velocity = 1;
    this.img = new Image();
    this.img.src = 'images/sea.png';
  }
  

  draw() {
    const ctx = this.game.ctx;
    ctx.drawImage(this.img, 0, this.y - this.game.HEIGHT);
    ctx.drawImage(this.img, 0, this.y);
  }


  update() {
    this.y += this.velocity;
    if (this.y >= this.game.HEIGHT) {
      this.y = 0;
    }
  }

}
