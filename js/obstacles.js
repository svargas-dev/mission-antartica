class Obstacles {
  constructor(game) {
    this.game = game;
    this.icebergImg = new Image();
    this.icebergImg.src = 'images/iceberg-bergy.png';
    // will contain objects with x, y, width, height & type
    this.obstaclesArr = [];
  }

  generateObstacles() {
    if (this.obstaclesArr.length <= this.game.level) {
      let randomX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width/2;
      let randomY = Math.floor(Math.random() * -(this.game.HEIGHT/this.game.level) - this.icebergImg.height);
      let newIceberg = `{"x" :${randomX}, "y" : ${randomY}, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.height}, "type": "iceberg"}`;
      this.obstaclesArr.push(JSON.parse(newIceberg));
    }
  }

  updateObstacles() {
    for (let iceberg of this.obstaclesArr) {
      iceberg.y += this.game.ship.velocity;
    }
    if (this.obstaclesArr[0].y > this.game.HEIGHT && this.obstaclesArr.length > 1) {
      this.obstaclesArr.shift();
      this.game.score += 1;
    }
  }

  draw() {
    const ctx = this.game.ctx;
    for (let obstacle of this.obstaclesArr) {
      ctx.drawImage(this.icebergImg, obstacle.x, obstacle.y);
    }
  }

  reset() {
    this.obstaclesArr = [];
  }
}