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

  generateObstacles() {
    if (this.obstaclesArr.length <= this.game.level) {
      const selectObstacleIndex = Math.floor(Math.random()*3);   // this.obstaclesTypes.length) doesn't work
      const selectedObs = this.obstacleTypes[selectObstacleIndex];
      // Need to tidy this up in a function!... DRY!
      switch (selectedObs) {
        case 'iceberg':
          const ranIceX = Math.floor(Math.random() * this.game.WIDTH) - this.icebergImg.width/2;
          const ranIceY = Math.floor(Math.random() * -(this.game.HEIGHT/this.game.level) - this.icebergImg.height);
          const newIceberg = `{"x" :${ranIceX}, "y" : ${ranIceY}, "width": ${this.icebergImg.width}, "height": ${this.icebergImg.height}, "type": "iceberg"}`;
          this.obstaclesArr.push(JSON.parse(newIceberg));
          console.log('Iceberg selected');
          break;
        case 'bergy':
          const ranBergyX = Math.floor(Math.random() * this.game.WIDTH) - this.bergyImg.width/2;
          const ranBergyY = Math.floor(Math.random() * -(this.game.HEIGHT/this.game.level) - this.bergyImg.height);
          const newBergy = `{"x" :${ranBergyX}, "y" : ${ranBergyY}, "width": ${this.bergyImg.width}, "height": ${this.bergyImg.height}, "type": "bergy"}`;
          this.obstaclesArr.push(JSON.parse(newBergy));
          console.log('Bergy selected');
          break;
        case 'growler':
          const ranGrowlerX = Math.floor(Math.random() * this.game.WIDTH) - this.bergyImg.width/2;
          const ranGrowlerY = Math.floor(Math.random() * -(this.game.HEIGHT/this.game.level) - this.bergyImg.height);
          const newGrowler = `{"x" :${ranGrowlerX}, "y" : ${ranGrowlerY}, "width": ${this.growlerImg.width}, "height": ${this.growlerImg.height}, "type": "growler"}`;
          this.obstaclesArr.push(JSON.parse(newGrowler));
          console.log('Growler selected');
          break;
      }
    }
  }


  updateObstacles() {
    for (let obstacle of this.obstaclesArr) {
      obstacle.y += this.game.ship.velocity;
    }
    if (this.obstaclesArr[0].y > this.game.HEIGHT && this.obstaclesArr.length > 1) {
      switch (this.obstaclesArr[0].type) {
        case 'iceberg':
          this.game.score += 3;
          break;
        case 'bergy':
          this.game.score += 2;
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
          console.log('Iceberg drawn');
          break;
        case 'bergy':
          ctx.drawImage(this.bergyImg, obstacle.x, obstacle.y);
          console.log('Bergy drawn');
          break;
        case 'growler':
          ctx.drawImage(this.growlerImg, obstacle.x, obstacle.y);
          console.log('Growler drawn');
          break;
      }
    }
  }

  reset() {
    this.obstaclesArr = [];
  }
}