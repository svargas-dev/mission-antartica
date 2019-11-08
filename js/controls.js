class Controls {
  constructor(game) {
    this.game = game;
    this.xMove = 2;
    this.yMove = 1;
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
        // //UP
        // case 38:
        //   this.game.ship.vy = -this.yMove;
        //   break;
        // //DOWN
        // case 40:
        //   this.game.ship.vy = this.yMove;
        //   break;
      }
    });

    window.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case 37:
          this.game.ship.vx = -1/3;
          break;
        //RIGHT
        case 39:
          this.game.ship.vx = 1/3;
          break;
        // //UP
        // case 38:
        //   this.game.ship.vy = 0;
        // break;
        //   //DOWN
        // case 40:
        //   this.game.ship.vy = 0;
        // break;
        }
    })
  }
}
