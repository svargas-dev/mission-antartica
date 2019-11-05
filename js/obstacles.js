class Obstacles {
  constructor(game) {
    this.game = game;
    this.icebergImg = new Image();
    this.icebergImg.src = 'images/iceberg-bergy.png';
    // will contain objects with x, y
    this.icebergArr = [{"x" : 320, "y" : 0, "width": 96, "height": 136}];
    this.bergyArr = [];
    this.growler = [];
    this.whales = [];

  }

  generateIcebergs() {
    // console.log(this.game.progressAni % this.game.obstacleGenSpeed < 50);
    // console.log(this.game.progressAni);
    // console.log(this.game.startTimestamp - timestamp);
  
    if (this.icebergArr.length === 0) {
      let randomX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width/2;
      let newIceberg = `{"x" :${randomX}, "y" : 0, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.height}}`;
      this.icebergArr.push(JSON.parse(newIceberg));
    } else if (this.icebergArr.length <= this.game.level) {
      let randomX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width/2;
      let randomY = Math.floor(Math.random() * this.game.HEIGHT/8) - this.icebergImg.height;
      let newIceberg = `{"x" :${randomX}, "y" : ${randomY}, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.height}}`;
      this.icebergArr.push(JSON.parse(newIceberg));
    }

    // if (Math.round(this.game.progressAni) % this.game.obstacleGenSpeed < 10 && 
    //     this.icebergArr.length < this.game.level) {
    //   let randomX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width/2;
    //   let randomY = Math.floor(Math.random() * this.game.HEIGHT/8) - this.icebergImg.height;
    //   let newIceberg = `{"x" :${randomX}, "y" : ${randomY}, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.height}}`;
    //   this.icebergArr.push(JSON.parse(newIceberg));
    // }
  }

  updateIcebergs() {
    for (let iceberg of this.icebergArr) {
      iceberg.y += this.game.ship.velocity;
    }
    if (this.icebergArr[0].y > this.game.HEIGHT && this.icebergArr.length > 1) {
      this.icebergArr.shift();
      this.game.score += 1;
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