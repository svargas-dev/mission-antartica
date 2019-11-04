class Sea {
  constructor(game) {
    this.game = game;
    this.y = 0;
    this.velocityY = 1;
    this.img = new Image();
    this.img.src = 'images/sea.png';
  }

  draw() {
    const ctx = this.game.ctx;
    const WIDTH = this.game.WIDTH;
    const HEIGHT = this.game.HEIGHT;

    // this.context.drawImage(this.img, this.x, 0, this.width, this.height);
    // this.context.drawImage(this.img, this.x + this.width, 0, this.width, this.height);

    // console.dir(this.img);
    // ctx.drawImage(this.img, 0, this.y, WIDTH, HEIGHT);
    // ctx.drawImage(this.img, 0, this.y + HEIGHT, WIDTH, HEIGHT);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  // Need to fix this...
  // update() {
  //   this.y += this.velocityY;
  //   if (this.y > this.HEIGHT) this.y = 0;
  // }

    // basic pattern -- make random later
    // const pat = ctx.createPattern(this.img, "repeat");
    // ctx.rect(0, 0, 640, 480);
    // ctx.fillStyle = pat;
    // ctx.fill();
  
}
