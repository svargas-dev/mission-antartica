class Ship {
  constructor(game) {
    this.game = game;
    // this.position = [this.game.WIDTH/2, 340];
    this.shipImg = new Image();
    this.shipImg.src = 'images/ship-resize.png';
    // will center if ship image is changed...
    this.position = JSON.parse(`{"x": ${this.game.WIDTH/2}, "y": ${this.game.HEIGHT - this.shipImg.height - 150}, "width": ${this.shipImg.width}, "height": ${this.shipImg.height}}`);
    this.course = 0; // I will have rotation of the ship on the canvas...
    this.velocity = 2; //px
  }


  draw() {
    if (this.course != 0) {
      this.drawNewCourse();
    } else {
      this.game.ctx.drawImage(this.shipImg, this.position.x - this.shipImg.width/2, this.position.y);
    }
  }

  
  // Need to fix
  drawNewCourse(){
    const ctx = this.game.ctx;
    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    ctx.save();

    // move to the center of the ship
    ctx.translate(this.position.x + this.shipImg.width/2, this.position.y + this.shipImg.width/2);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 32, 32);
    
    
    // rotate the canvas to the specified degrees
    ctx.rotate(this.course*Math.PI/180);

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 32, 32);
    
    // draw the ship
    // since the context is rotated, the image will be rotated also
    ctx.drawImage(this.shipImg, this.position[0] - this.shipImg.width/2, this.position[1]- this.shipImg.width/2);
    
    

    // we’re done with the rotating so restore the unrotated context
    ctx.restore();
  }

}