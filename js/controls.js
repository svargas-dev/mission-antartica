class Controls {
  constructor(game) {
    this.game = game;
    this.xMove = 2;
  }

  setControls() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        //LEFT
        case 37:
          this.game.ship.vx = -this.xMove;
          break;
        //RIGHT
        case 39:
          this.game.ship.vx = this.xMove;
          break;
      }
    });

    window.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case 37:
          this.game.ship.vx = 0;
          break;
        //RIGHT
        case 39:
          this.game.ship.vx = 0;
          break;
        }
    })
  }
}
