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
    if (this.icebergArr.length < this.game.level) {
      let randomX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width;
      let newIceberg = `{"x" :${randomX}, "y" : 0, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.height}}`;
      this.icebergArr.push(JSON.parse(newIceberg));
      // console.dir(this.icebergArr);
    }
  }

  updateIcebergs() {
    // console.log(iceberg);
    if (this.icebergArr[0].y > this.game.HEIGHT) {
      // console.log(ice)
      this.icebergArr.shift();
      this.generateIcebergs();
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