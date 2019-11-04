class StartScreen {
  constructor(game) {
    this.game = game;
  }

  startScr() {
    const backgroundImage = new Image();
    backgroundImage.src = 'images/start.png';

    this.game.ctx.drawImage(backgroundImage, 0, 0);
  }

}