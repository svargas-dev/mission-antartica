class Obstacles {
  constructor(game) {
    this.game = game;
    // ICE TYPES
    //Growler
    this.growlerImg = new Image();
    this.growlerImg.src = 'images/growler.png';
    //Bergy
    this.bergyImg = new Image();
    this.bergyImg.src = 'images/bergy.png';
    //Iceberg
    this.icebergImg = new Image();
    this.icebergImg.src = 'images/iceberg.png';
    // will contain objects with x, y, width, height & type
    this.obstaclesArr = [];
    this.obstacleTypes = [ "iceberg", "bergy", "growler" ];
  }

  selectObstacles() {
    if (this.obstaclesArr.length <= this.game.level) {
      const selectObstacleIndex = Math.floor(Math.random() * this.obstacleTypes.length);
      const selectedObsType = this.obstacleTypes[selectObstacleIndex];
      this.generateObstacles(selectedObsType);
    }
  }

  generateObstacles(selectedObsType) {
    const obstacleImg = selectedObsType + 'Img';
    // const obsType = selectedObsType;
    const randomX = Math.floor(Math.random() * this.game.WIDTH) - this[obstacleImg].width/2;
    const randomY = Math.floor(Math.random() * -(this.game.HEIGHT/this.game.level) - this[obstacleImg].height);
    const newObs = `{ "x" : ${randomX}, "y" : ${randomY}, "width" : ${this[obstacleImg].width}, "height" : ${this[obstacleImg].height}, "type" : "${selectedObsType}", "collision" : "false" }`;
    this.obstaclesArr.push(JSON.parse(newObs));
  }


  updateObstacles() {
    for (let obstacle of this.obstaclesArr) {
      obstacle.y += this.game.ship.velocity;
    }
    if (this.obstaclesArr[0].y > this.game.HEIGHT && this.obstaclesArr.length > 1) {
      switch (this.obstaclesArr[0].type) {
        case 'iceberg':
          this.game.score += 1;
          break;
        case 'bergy':
          this.game.score += 1;
          break;
        case 'growler':
          this.game.score += 1;
          break;
      }
      this.obstaclesArr.shift();
    }
  }

  draw() {
    const ctx = this.game.ctx;
    for (let obstacle of this.obstaclesArr) {
      switch (obstacle.type) {
        case 'iceberg':
          ctx.drawImage(this.icebergImg, obstacle.x, obstacle.y);
          // console.log('Iceberg drawn');
          break;
        case 'bergy':
          ctx.drawImage(this.bergyImg, obstacle.x, obstacle.y);
          // console.log('Bergy drawn');
          break;
        case 'growler':
          ctx.drawImage(this.growlerImg, obstacle.x, obstacle.y);
          // console.log('Growler drawn');
          break;
      }
    }
  }

  reset() {
    this.obstaclesArr = [];
  }
}