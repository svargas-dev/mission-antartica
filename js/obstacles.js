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
    // ANIMALS
    this.penguinsIceImg = new Image();
    this.penguinsIceImg.src = 'images/penguinsIce.png';
    this.sealIceImg = new Image();
    this.sealIceImg.src = 'images/sealIce.png';
    this.orcaImg = new Image();
    this.orcaImg.src = 'images/orca.png';
    // will contain objects with x, y, width, height & type
    this.obstaclesArr = [];
    this.obstacleTypes = [ "growler", "bergy", "iceberg", "penguinsIce", "sealIce", "orca" ];

    this.velocity = 2;
  }


  selectObstacles() {
    if (this.obstaclesArr.length <= this.game.level+2) {
      const selectObstacleIndex = Math.floor(Math.random() * this.game.dificulty);
      const selectedObsType = this.obstacleTypes[selectObstacleIndex];
      this.generateObstacles(selectedObsType);
    }
  }


  generateObstacles(selectedObsType) {
    const obstacleImg = selectedObsType + 'Img';
    let randomX = Math.floor(Math.random() * this.game.WIDTH) - this[obstacleImg].width/2;
    if (this.obstaclesArr.length > 0) {
      while (randomX > this.obstaclesArr[this.obstaclesArr.length-1].x && randomX < this.obstaclesArr[this.obstaclesArr.length-1].x + this.obstaclesArr[this.obstaclesArr.length-1].width) {
      randomX = Math.floor(Math.random() * this.game.WIDTH) - this[obstacleImg].width/2;
      }
    }
    const randomY = Math.floor(Math.random() * -Math.random()*this.game.HEIGHT - this[obstacleImg].height);
    //needed hackish ternary operator solution for first load -- image properties not loading first enough for 1st target
    const newObs = `{ "x" : ${randomX}, "y" : ${randomY}, "width" : ${this[obstacleImg].width = 0 ? 38 : 38}, "height" : ${this[obstacleImg].height = 0 ? 41 : 41}, "type" : "${selectedObsType}", "collision" : null }`;
    this.obstaclesArr.push(JSON.parse(newObs));
  }


  updateObstacles() {
    for (let obstacle of this.obstaclesArr) {
      obstacle.y += this.velocity;
    }
    if (this.obstaclesArr[0].y >= this.game.HEIGHT) {
      this.game.score += 1;
      this.obstaclesArr.shift();
    }
  }

  
  draw() {
    const ctx = this.game.ctx;
    for (let obstacle of this.obstaclesArr) {
      switch (obstacle.type) {
        case 'sealIce':
          ctx.drawImage(this.sealIceImg, obstacle.x, obstacle.y);
          console.log('seal Ice')
        case 'penguinsIce':
          ctx.drawImage(this.penguinsIceImg, obstacle.x, obstacle.y);
        case 'iceberg':
          ctx.drawImage(this.icebergImg, obstacle.x, obstacle.y);
          break;
        case 'bergy':
          ctx.drawImage(this.bergyImg, obstacle.x, obstacle.y);
          break;
        case 'growler':
          ctx.drawImage(this.growlerImg, obstacle.x, obstacle.y);
          break;
        case 'orca':
          ctx.drawImage(this.orcaImg, obstacle.x, obstacle.y);
          break;
      }
    }
  }


  reset() {
    this.obstaclesArr = [];
  }
}