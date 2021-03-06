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
    this.decorations = new Decorations(this);
    this.level = 1;
    this.dificulty = 1;
    this.score = 1;
    this.health = 10;
    
    this.pause = null;
    this.collision = null;
    this.levelupAlert = null;
    this.murderer = null;
    
    this.penguin = null;
    this.albatross = null;
    
    this.gameOverAni = new GameOver(this);
    this.gameOverAnimation = null;

    this.flag = null;

    this.gameOverImg = new Image();
    this.gameOverImg.src = 'images/game-over.png';
  }
  
  
  startGame() {
    // call everything
    this.animation();
    //Backround sounds
    this.sound = new Sound();
    this.sound.playWind();
    this.sound.playSoundsAll();
    this.decorations.setDecorations();

    // Change level evert 30s
    setInterval( () => {
      this.level += 1;
      this.score += 1;
      this.obstacles.velocity *= 1.01;
      this.sea.velocity *= 1.009;
      if (this.dificulty < 6) {
        this.dificulty += 1;
      }
      //set alert & cancel
      this.levelupAlert = true;
      setTimeout( () => {
        this.levelupAlert = null;
      }, 2000);
    }, 21000);
  }

  
  updateEverything() {
    this.obstacles.selectObstacles();
    this.obstacles.updateObstacles();
    this.updateHealth();
    this.sea.update();
    this.ship.update();
    if (this.penguin) {
      this.decorations.updatePenguin();
    }
    if (this.albatross) {
      this.decorations.updateAlbatross();
    }
    if (this.gameOverAnimation) {
      this.gameOverAni.update();
    }
  }
  
  
  updateHealth() {
    for (let obstacle of this.obstacles.obstaclesArr) {
      if (this.isCollison(this.ship.position, obstacle)) {
        this.ship.bounce(); // I know it's a weird place to put it.. 
        switch (obstacle.type) {
          case 'penguinsIce' || 'sealIce':
            this.health -= 5;
            break;
          case 'iceberg':
            this.health -= 4;
            break;
          case 'bergy':
            this.health -= 2;
            break;
          case 'growler':
            this.health -= 1;
            break;
          case 'orca':
            this.murderer = true;
            this.obstacles.velocity = 0;
            this.sea.velocity = 0;
            this.pause = true;
            // settimeout for alert
            setTimeout( () => {
              this.alert = null;
              this.gameOver();
            }, 3000);
            break;
        }
      }
    }
  }


  // compares the properties of two objects and returns true or false
  // object1 is ship, object2 is obstacle
  isCollison(object1, object2) {
    if (object2.collision === true) { // If already collided ignore
      return false;
    } else {
      // if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
      if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && 330 < object2.y + object2.height && 330 + 135 > object2.y) {
        object2.collision = true;
        this.sound.playImpact();
        this.collision = true;
        // Cancel alert after 2s
        setInterval( () => {
          this.collision = null;
        }, 2000)
        // Insert bounce animation
        return true;
      } else {
        return false;
      }
    }
  }


  clearAll() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  
  drawEverything(timestamp) {
    this.clearAll();
    this.sea.draw();
    this.obstacles.draw();
    this.ship.draw(timestamp);
    this.drawTopBar();
    if (this.penguin) {
      this.decorations.drawPenguin();
    }
    if (this.albatross) {
      this.decorations.drawAlbatross();
    }
    if (this.collision && !this.murderer) {
      this.drawCollisionAlert();
    }
    if (this.murderer) {
      this.drawMurderer();
    }
    if (this.levelupAlert) {
      this.drawLevelUp();
    }
    if (this.flag) {
      this.drawHello();
    }
    if (this.gameOverAnimation) {
      this.gameOverAni.draw();
    }
  }
    
  
  drawTopBar() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 640, 32);
    this.ctx.fillStyle = 'black';
    this.ctx.font = 'bold 20px "Courier New"';

    //Score
    this.ctx.fillText('Score: ' + this.score, 20, 24);
    //Level
    this.ctx.fillText('Level: ' + this.level, 270, 24);
    // Health will go here
    this.drawHealth();
  }


  drawHealth() {
    let startX = 490;
    for (let i = this.health; i > 0; i--) {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(startX, 5, 15, 20);
      startX += 15;
    }
  }


  drawCollisionAlert() {
    const ctx = this.ctx;
    ctx.fillStyle = 'red';
    ctx.fillRect(260, 60, 120, 40);
    ctx.font = 'blod 32px "Courier New"';
    ctx.fillStyle = 'white';
    ctx.fillText('COLLISON!', 265, 86);
  }
  

  drawLevelUp() {
    const ctx = this.ctx;
    ctx.fillStyle = 'blue';
    ctx.fillRect(270, 60, 100, 40);
    ctx.font = 'blod 32px "Courier New"';
    ctx.fillStyle = 'white';
    ctx.fillText('LEVEL UP', 272, 86);
  }


  drawMurderer() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(180, 100, 280, 100);
    this.ctx.fillStyle = 'white'
    this.ctx.font = 'bold 48px "Courier New"';
    this.ctx.fillText('MURDERER!', 200, 164);
  }


  animation(timestamp) {
    if (!this.pause) {
      this.updateEverything();
      this.drawEverything();
      window.requestAnimationFrame(timestamp => this.animation(timestamp));
      if (this.health <= 0) {
        this.gameOverAnimation = true;
        this.sea.velocity = 0;
        this.obstacles.velocity = 0;
        setTimeout( () => {
          this.gameOver();
          this.gameOverAnimation = null;
        }, 3000)
      }
    }
  }

  
  gameOver() {
    this.pause = true;
    this.decorations.stopDecorations();
    this.obstacles.velocity = 0;
    this.sound.playGameOver();
    this.sound.stopSoundsAll();
    //in main.js
    resetButton();
    // I get a race condition if I declare the image here so it's in the constructor
    this.ctx.drawImage(this.gameOverImg, 0, 0);
    this.ctx.fillStyle = 'black';
    this.ctx.font = 'bold 20px "Courier New"';
    this.ctx.fillText('Final Score:  ' + this.score, 220, 200);
  }
  
  
  reset () {
    this.level = 1;
    this.score = 0;
    this.sea.velocity = 1;
    this.ship.reset();
    this.obstacles.reset();
  }


  drawHello() {
    const hello = new Image();
    hello.src = 'images/hello.png';
    this.ctx.drawImage(hello, 170, 90);
  }


  easterEgg($canvas, event) {
    const rect = $canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    if (x > this.ship.position.x && x < this.ship.position.x + 32 &&
        y > 345) {
        this.flag = true;
        this.sea.velocity = 0;
        this.obstacles.velocity = 0;
        this.sound.playHello();
        setTimeout( () => {
          this.flag = null;
          this.sea.velocity = 1;
          this.obstacles.velocity = 2;
        }, 1500)
    }
  }

}
