class Decorations {
  constructor(game) {
    this.game = game;
    this.penguinArr = [];
    this.penguinImg = new Image();
    this.penguinImg.src = 'images/penguin.png';
    this.penguin;
    this.albatrossArr = [];
    this.albatrossImg = new Image();
    this.albatrossImg.src = 'images/albatross.png';
    this.albatross; 
  }


  setDecorations() {
    const intervalP = Math.random()*45000 + 30000; //Random interval between 45s-75s
    const intervalA = Math.random()*50000 + 40000; //Random interval between 50s-90s
    this.penguin = setInterval( () => {
      this.game.penguin = true;
      this.game.sound.playPenguin();
    }, intervalP);
    this.albatross = setInterval( () => {
      this.game.albatross = true;
      this.game.sound.playAlbatross();
    }, intervalA);
  }


  updatePenguin() {
    if (this.penguinArr.length === 0) {
      let randomX = Math.random()*-100;
      let randomY = Math.random()*400;
      let ranVx = (Math.random()*1)+2 //between 0-3px
      let ranVy = (Math.random()*1)+1 //between 0-2px
      this.penguinArr.push(JSON.parse(`{"x": ${randomX}, "y": ${randomY}, "vx": ${ranVx}, "vy": ${ranVy}}`));
    } else if (this.penguinArr[0].x < this.game.WIDTH && this.penguinArr[0].y < this.game.HEIGHT) {
      this.penguinArr[0].x += this.penguinArr[0].vx;
      this.penguinArr[0].y += this.penguinArr[0].vy;
    } else {
      this.penguinArr.pop();
      this.game.penguin = null;
    }
  }
  

  drawPenguin() {
    if (this.penguinArr.length !== 0) {
      this.game.ctx.drawImage(this.penguinImg, this.penguinArr[0].x, this.penguinArr[0].y);
    }
  }


  updateAlbatross() {
    if (this.albatrossArr.length === 0) {
      let randomX = (Math.random()*80) + this.game.WIDTH;
      let randomY = (Math.random()*30) + this.game.HEIGHT;
      let ranVx = (Math.random()*1)+2 //between 0-3px
      let ranVy = (Math.random()*1)+1 //between 0-2px
      this.albatrossArr.push(JSON.parse(`{"x": ${randomX}, "y": ${randomY}, "vx": ${ranVx}, "vy": ${ranVy}}`));
      console.log("there's an albatross");
    } else if (this.albatrossArr[0].x > 0 && this.albatrossArr[0].y > 0) {
      this.albatrossArr[0].x -= this.albatrossArr[0].vx;
      this.albatrossArr[0].y -= this.albatrossArr[0].vy;
    } else {  
      this.albatrossArr.pop();
      this.game.albatross = null;
    }
  }


  drawAlbatross() {
    if (this.albatrossArr[0]) {
      this.game.ctx.drawImage(this.albatrossImg, this.albatrossArr[0].x, this.albatrossArr[0].y);
      console.log("albatross drawn!");
    }
  }


  stopDecorations() {
    clearInterval(this.penguin);
    clearInterval(this.albatross);
  }

}
