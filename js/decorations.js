class Decorations {
  constructor(game) {
    this.game = game;
    this.penguinArr = [];
    this.penguinImg = new Image();
    this.penguinImg.src = 'images/penguin.png';
  }


  setDecorations() {
    let interval = Math.random()*60000 + 30000; //Random interval between 60s-90s
    setInterval( () => {
      this.game.penguin = true;
      // generated a new penguin for 10s
      setTimeout( () => {
        this.game.penguin = null;
        this.penguinArr.shift();
      }, 10000)
    }, interval)
  }

  updatePenguin() {
    let randomX = Math.random()*-50;
    let randomY = Math.random()*-50;
    // let penguinPos = `{"x": ${randomX}, "y": ${randomY}}`;
    this.penguinArr.push(JSON.parse(`{"x": ${randomX}, "y": ${randomY}}`));
    let ranVx = (Math.random()*1)+2 //between 0-3px
    let ranVy = (Math.random()*1)+1 //between 0-2px
    this.penguinArr[0].x += ranVx;
    this.penguinArr[0].y += ranVy;
    console.log("there's a penguin")
  }

  drawPenguin() {
    this.game.ctx.drawImage(this.penguinImg, this.penguinArr[0].x, this.penguinArr[0].y)
    console.log("penguin drawn! ")
  }

}