class Obstacles {
  constructor(game) {
    this.game = game;
    this.icebergImg = new Image();
    this.icebergImg.src = 'images/iceberg-bergy.png';
    // will contain objects with x, y
    this.obstaclesArr = [];
  }

  generateObstacles() {
    if (this.obstaclesArr.length <= this.game.level) {
      let randomX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width/2;
      let randomY = Math.floor(Math.random() * this.game.HEIGHT/8) - this.icebergImg.height;
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
      // console.log(iceberg);
      // iceberg.y += this.game.ship.velocity;
      ctx.drawImage(this.icebergImg, obstacle.x, obstacle.y);
    }
  }

  
  // if (this.obstaclesArray.length === 0) {
  //   this.obstaclesArray.push(JSON.parse(`{"xSqs" : ${obstacleX}, "ySqs" : -2, "widthSqs": ${widthSqs}}`));
  // } else if (this.obstaclesArray.length < 4) {
  //   let obstacleY = this.obstaclesArray[this.obstaclesArray.length-1].ySqs - 7;
  //   this.obstaclesArray.push(JSON.parse(`{"xSqs" : ${obstacleX}, "ySqs" : ${obstacleY}, "widthSqs": ${widthSqs}}`));
  // }

}