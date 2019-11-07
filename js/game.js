class Game {
  constructor($canvas) {
    this.canvas = $canvas;
    this.ctx = this.canvas.getContext('2d');
    this.HEIGHT = this.canvas.height;
    this.WIDTH = this.canvas.width;
    
    this.controls = new Controls(this);
    this.controls.setControls();
    this.sea = new Sea(this);
    this.ship = new Ship(this);
    this.obstacles = new Obstacles(this);
    this.level = 1;
    this.score = 1;
    this.health = 10;
    
    this.pause = null;
    this.animationRef = null;
    
    this.levelupAlert = null;
    this.murderer = null;
    this.gameOverImg = new Image();
    this.gameOverImg.src = 'images/game-over.png';
  }
  
  
  startGame() {
    // call everything
    this.animation();
    this.sound = new Sound();
    this.sound.playWind();
    this.sound.playSoundsAll();    
  }


  drawEverything(timestamp) {
    this.clearAll();
    this.sea.draw();
    this.obstacles.draw();
    this.ship.draw(timestamp);
    this.drawTopBar();
    if (this.murderer) {
      this.drawMurderer();
    }
    if (this.levelupAlert) {
      this.drawLevelUp();
      setTimeout( () => {
        this.levelupAlert = null;
      }, 2500);
    }
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
    this.ctx.fillText('Level: ' + this.level, 260, 24);
    // Health will go here
    this.drawHealth();
  }


  clearAll() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  }


  updateEverything() {
    this.sea.update();
    this.obstacles.selectObstacles();
    this.obstacles.updateObstacles();
    this.updateHealth();
    this.difficulty();
  }


  updateHealth() {
    for (let obstacle of this.obstacles.obstaclesArr) {
      if (this.isCollison(this.ship.position, obstacle)) {
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
          case 'orca':
            // this.health = 0;
            //insert display
            this.murderer = true;
            // settimeout for alert
            this.obstacles.velocity = 0;
            this.sea.velocity = 0;
            this.animationRef = null;
            this.pause = true;
            setTimeout( () => {
              this.alert = null;
              this.gameOver();
            }, 3000);
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
    if (this.score > 0 && this.score % 10 === 0) {
      this.level += 1;
      this.score += 1;
      this.obstacles.velocity *= 1.005;
      //set alert & cancel
      this.levelupAlert = true;
    }
  }


  drawMurderer() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(180, 100, 280, 100);
    this.ctx.fillStyle = 'white'
    this.ctx.font = 'bold 48px "Courier New"';
    this.ctx.fillText('MURDERER!', 200, 150);
  }


  drawLevelUp() {
    const ctx = this.ctx;
    ctx.fillStyle = 'blue';
    ctx.fillRect(270, 60, 100, 40);
    ctx.font = 'blod 32px "Courier New"';
    ctx.fillStyle = 'white';
    ctx.fillText('LEVEL UP', 272, 86);
  }
  
  
  animation(timestamp) {
    // //   console.log(timestamp)
    // this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
    // this.oldTimestamp = timestamp;

    if (!this.pause) {
      this.updateEverything(timestamp);
      this.drawEverything(timestamp);
      this.animationRef = window.requestAnimationFrame(timestamp => this.animation(timestamp));
      if (this.health <= 0) {
        window.cancelAnimationFrame(this.animationRef);
        this.gameOver();
      }
    }
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
        this.sound.playImpact();
        return true;
      } else {
        return false;
      }
    }
  }
  
  
  gameOver() {
    this.obstacles.velocity = 0;
    this.animationRef = null;
    this.pause = true;
    this.sound.playGameOver();
    this.sound.stopSoundsAll();
    //in main.js
    resetButton();
    // I get a race condition if I declare the image here so it's in the constructor
    this.ctx.drawImage(this.gameOverImg, 0, 0);
    this.ctx.font = 'bold 20px "Courier New"';
    this.ctx.fillText('Final Score:  ' + this.score, 220, 200);
  }
  
  
  reset () {
    this.level = 1;
    this.score = 0;
    this.ship.reset();
    this.obstacles.reset();
  }

}
