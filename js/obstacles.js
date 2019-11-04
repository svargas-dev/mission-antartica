class Obstacles {
  constructor(game) {
    this.game = game;
    // will contain objects with x, y
    this.icebergArr = [];
    this.bergyArr = [];
    this.growler = [];
    this.whales = [];

    this.icebergImg = new Image();
    this.icebergImg.src = 'images/iceberg-bergy.png';
  }

  generateIcebergs() {
    let randomX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width;
    if (this.icebergArr.length === 0) {
      this.icebergArr.push(JSON.parse(`{"x" :${randomX}, "y" : 0, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.width}}`));
    } else if (this.icebergArr.length < this.game.level) {
      this.icebergArr.push(JSON.parse(`{"x" :${randomX}, "y" : 0}, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.width}}`));
    }
  }

  updateIcebergs() {
    // console.log(iceberg);
    if (this.icebergArr[0].y > this.game.HEIGHT) {
      // console.log(ice)
      this.icebergArr.shift();
    } else {
      for (let iceberg of this.icebergArr) {
        iceberg.y += this.game.ship.velocity;
      }
    }
  }

  draw() {
    const ctx = this.game.ctx;
    for (let iceberg of this.icebergArr) {
      // console.log(iceberg);
      // iceberg.y += this.game.ship.velocity;
      ctx.drawImage(this.icebergImg, iceberg.x, iceberg.y);
    }
  }

  
  // if (this.obstaclesArray.length === 0) {
  //   this.obstaclesArray.push(JSON.parse(`{"xSqs" : ${obstacleX}, "ySqs" : -2, "widthSqs": ${widthSqs}}`));
  // } else if (this.obstaclesArray.length < 4) {
  //   let obstacleY = this.obstaclesArray[this.obstaclesArray.length-1].ySqs - 7;
  //   this.obstaclesArray.push(JSON.parse(`{"xSqs" : ${obstacleX}, "ySqs" : ${obstacleY}, "widthSqs": ${widthSqs}}`));
  // }

}