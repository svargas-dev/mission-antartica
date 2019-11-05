class Sea {
  constructor(game) {
    this.game = game;
    this.y = 0;
    // this.velocityY = 1;
    this.img = new Image();
    this.img.src = 'images/sea-bg2.png';
  }

  draw() {
    const ctx = this.game.ctx;

    ctx.drawImage(this.img, 0, this.y - this.game.HEIGHT);
    ctx.drawImage(this.img, 0, this.y);

    // Blue sea -- simple & working
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  update() {
    this.y += 1;

    if (this.y >= this.game.HEIGHT) {
      this.y = 0;
    }

  }

}
