class Game {
  constructor($canvas) {
    this.canvas = $canvas;
    this.ctx = this.canvas.getContext('2d');
    this.HEIGHT = this.canvas.height;
    this.WIDTH = this.canvas.width;

    this.sea = new Sea(this);
    this.ship = new Ship(this);
    this.controls = new Controls(this);
    this.controls.setControls();
    this.obstacles = new Obstacles(this);
    this.level = 1;
    this.score = 1;
    this.health = 10;

    this.animationRef = null;
    // this.startTimestamp = null;
    // this.progressAni;

    this.gameOverImg = new Image();
    this.gameOverImg.src = 'images/game-over.png';
  }

  startGame() {
    // call everything
    this.animation();
    this.sound = new Sound();
    // this.sound.playWind();
    this.sound.playSoundsAll();
    // this.sound.playIceberg();
  }


  drawEverything() {
    this.clearAll();
    this.sea.draw();
    this.ship.draw();
    this.obstacles.draw();
    this.drawTopBar();
  }

  // To use custom fonts I'll have to use DOM manipulation...
  drawTopBar() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 640, 32);
    this.ctx.fillStyle = 'black';
    this.ctx.font = 'bold 20px "Courier New"';

    //Score
    this.ctx.fillText('Score: ' + this.score, 20, 24);
    //Level
    this.ctx.fillText('Level: ' + this.level, 280, 24);
    // Health will go here
    this.drawHealth();
  }


  clearAll() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  }


  updateEverything(timestamp) {
    // Not used yet...
    // if (!this.startTimestamp) {
    //   this.startTimestamp = timestamp;
    // }
    // this.progressAni = timestamp - this.startTimestamp;

    this.updateHealth();
    this.difficulty();
    this.sea.update();
    this.obstacles.selectObstacles();
    this.obstacles.updateObstacles();
  }

  updateHealth() {
    for (let obstacle of this.obstacles.obstaclesArr) {
      // Right now this is way too quick!
      if (this.isCollison(this.ship.position, obstacle)) {
        console.log('Collision!')
        switch (obstacle.type) {
          case 'iceberg':
            this.health -= 5;
            break;
          case 'bergy':
            this.health -= 3;
            break;
          case 'growler':
            this.health -= 1;
            break;
        }
      }
      console.log(this.health);
    }
  }

  drawHealth() {
    let startX = 440;
    for (let i = this.health; i > 0; i--) {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(startX, 5, 20, 20);
      startX += 20;
    }
  }
  
  difficulty() {
    if (this.score > 0 && this.score % 20 === 0) {
      this.level += 1;
      this.score += 1;
      console.log('level up!'); //draw something on screen
      this.ship.velocity *= 1.005;
    }
  }
  
  
  animation(timestamp) {
    //   console.log(timestamp)
    this.updateEverything(timestamp);
    this.drawEverything();
    
    this.animationRef = window.requestAnimationFrame(timestamp => this.animation(timestamp));
    if (this.health <= 0) {
      window.cancelAnimationFrame(this.animationRef);
      this.sound.stopSoundsAll();
      this.gameOver();
      this.ship.velocity = 0;
    }
    // for (let obstacle of this.obstacles.obstaclesArr) {
    //   if (this.isCollison(this.ship.position, obstacle)) {
    //     window.cancelAnimationFrame(this.animationRef);
    //     this.sound.stopSoundsAll();
    //     this.gameOver();
    //     this.ship.velocity = 0;
    //   }
    // }
  }
  

  // compares the properties of two objects and returns true or false
  isCollison(object1, object2) {
    // object1 -= 5;
    // object2 -= 5;
    if (object2.collision === true) {
      return false;
    } else {
      if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
        object2.collision = true;
        return true;
      } else {
        return false;
      }
    }
  }

  gameOver() {
    //in main.js
    resetButton();
    // I get a race condition if I declare the image here so it's in the constructor
    this.ctx.drawImage(this.gameOverImg, 0, 0);
    this.ctx.fillText('Final Score:  ' + this.score, 220, 200);
  }

  reset () {
    this.animationRef = null;
    this.level = 1;
    this.score = 0;
    // this.obstacleGenSpeed = 3000; // Not used yet...
    this.ship.reset();
    this.obstacles.reset();
  }
}
