class GameOver {
  constructor(game){
    this.height = game.HEIGHT;
    this.width = game.WIDTH;
    this.ctx = game.ctx
    this.x = 0;
    this.velocityX = -2;
    
    this.bgClouds = new Image();
    this.bgClouds.src = 'images/animation/clouds-BG.png';
    this.bgCloudsX = 0;
    this.mgClouds1 = new Image();
    this.mgClouds1.src = 'images/animation/clouds-MG-1.png';
    this.mgClouds1X = 0;
    this.mgClouds2 = new Image();
    this.mgClouds2.src = 'images/animation/clouds-MG-2.png';
    this.mgClouds2X = 0;
    this.mgClouds3 = new Image();
    this.mgClouds3.src = 'images/animation/clouds-MG-3.png';
    this.mgClouds3X = 0;
    this.mountains = new Image();
    this.mountains.src = 'images/animation/mountains.png';
    this.mountainsX = 0;
    this.lonelyCloud = new Image();
    this.lonelyCloud.src = 'images/animation/cloud-lonely.png';
    this.lonelyCloudX = 0;
  }


  draw() {
    this.ctx.fillStyle = '#00BFFF';
    this.ctx.fillRect(0, 0, 640, 480);
    this.ctx.drawImage(this.bgClouds, this.bgCloudsX, 0, this.width, this.height);
    this.ctx.drawImage(this.bgClouds, this.bgCloudsX + this.width, 0, this.width, this.height);
    this.ctx.drawImage(this.mountains, this.mountainsX, 0, this.width, this.height);
    this.ctx.drawImage(this.mountains, this.mountainsX + this.width, 0, this.width, this.height);
    this.ctx.drawImage(this.mgClouds3, this.mgClouds3X, 0, this.width, this.height);
    this.ctx.drawImage(this.mgClouds3, this.mgClouds3X + this.width, 0, this.width, this.height);
    this.ctx.drawImage(this.mgClouds2, this.mgClouds2X, 0, this.width, this.height);
    this.ctx.drawImage(this.mgClouds2, this.mgClouds2X + this.width, 0, this.width, this.height);
    this.ctx.drawImage(this.mgClouds1, this.mgClouds1X, 0, this.width, this.height);
    this.ctx.drawImage(this.mgClouds1, this.mgClouds1X + this.width, 0, this.width, this.height);
    
    this.ctx.drawImage(this.lonelyCloud, this.lonelyCloudX, 0, this.width, this.height);
    this.ctx.drawImage(this.lonelyCloud, this.lonelyCloudX + this.width, 0, this.width, this.height);
  }


  update() {
    
    
    this.bgCloudsX += this.velocityX;  //-2
    if (this.bgCloudsX < -this.width) this.bgCloudsX = 0;

    this.lonelyCloudX += this.velocityX+1.75// 0.25
    if (this.lonelyCloudX < -this.width) this.lonelyCloudX = 0;


    this.mountainsX += this.velocityX+1.6667; //-0.333
    if (this.mountainsX < -this.width) this.mountainsX = 0;

    this.mgClouds3X += this.velocityX-1; //-3
    if (this.mgClouds3X < -this.width) this.mgClouds3X = 0;

    this.mgClouds2X += this.velocityX; // -2
    if (this.mgClouds2X < -this.width) this.mgClouds2X = 0;

    this.mgClouds1X += this.velocityX+1; // -1
    if (this.mgClouds1X < -this.width) this.mgClouds1X = 0;

  }

}
