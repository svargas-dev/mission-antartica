class Ship {
  constructor(game) {
    this.game = game;
    this.shipImg = new Image();
    this.shipImg.src = 'images/ship-resize.png';
    // will center if ship image is changed...
    this.position = JSON.parse(`{"x": ${this.game.WIDTH/2}, "y": ${this.game.HEIGHT - this.shipImg.height - 150}, "width": ${this.shipImg.width}, "height": ${this.shipImg.height}}`);
    // this.velocityX = 0; //px
    this.accelFactor = 0.1;
    
    //Smooth animations for rotation
    this.accelCo = 0;
    this.targetCourse = 0;
    this.previousCourse = 0;
    this.currentCourse = 0;

    // this.vx = 0;  //horizontal acceleration
  }


  draw() {
    // this.drawNewCourse();
    this.game.ctx.drawImage(this.shipImg, this.position.x - this.shipImg.width/2, this.position.y);
    // if (this.course != 0) {
    //   this.drawNewCourse();
    // } else {
    //   this.game.ctx.drawImage(this.shipImg, this.position.x - this.shipImg.width/2, this.position.y);
    // }
  }

  
  // Not used yet...
  drawNewCourse(){
    const ctx = this.game.ctx;
    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    ctx.save();
    // console.log('Canvas save');

    // move to the center of the ship
    ctx.translate(this.position.x + this.shipImg.width/2, this.position.y + this.shipImg.height/2);
    // console.log(`Translated position to: ${this.position.x + this.shipImg.width/2}, ${this.position.y + this.shipImg.height/2}`);
    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, 32, 32);
    
    // to generalise -- acclerationDeceleration(current, previous, target, currentAccel, accelFactor)..
    if (Math.round(this.currentCourse) === Math.round(this.targetCourse)) {
      this.currentCourse = Number(this.targetCourse);
      console.log('condition1 = stationary');
    } else if (Math.round(this.currentCourse*10) < Math.round((this.previousCourse + this.targetCourse)*10)/2) {
      this.accelCo += this.accelFactor;
      this.currentCourse += this.accelCo;
      console.log('condition2 Accel. previousCo' + this.previousCourse + 'targetCo' + this.targetCourse);
    } else if (Math.round(this.currentCourse*10) > Math.round((this.previousCourse + this.targetCourse)*10)/2) {
      this.accelCo -= this.accelFactor;
      this.currentCourse -= this.accelCo;
      console.log('condition2 Deccel');
    }

    
    // rotate the canvas to the specified degrees 
    ctx.rotate(this.currentCourse*Math.PI/180);
    console.log(`Rotated ${this.course*Math.PI/180} degrees`);
    
    
    
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, 32, 64);
    
    // draw the ship
    // since the context is rotated, the image will be rotated also

    this.game.ctx.drawImage(this.shipImg, -this.shipImg.width/2, -this.shipImg.height/2);
    // ctx.drawImage(this.shipImg, this.position.x - this.shipImg.width/2, this.position.y - this.shipImg.width/2);
    // console.log('Ship drawn')
    
    // we’re done with the rotating so restore the unrotated context
    ctx.restore();
    // console.log('Canvas restore');
  }


  // accelDeccel(currentX, targetX, accelFactor, currentAccel) {

  // }


  reset() {
    this.position = JSON.parse(`{"x": ${this.game.WIDTH/2}, "y": 340, "width": ${this.shipImg.width}, "height": ${this.shipImg.height}}`);
    this.course = 0;
    this.velocity = 0;
  }
}