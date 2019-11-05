class Controls {
  constructor(game) {
    this.game = game;
  }

  // to do: prevent default
  setControls() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        //LEFT
        case 37:
          // this.game.ship.course += -5;
          this.game.ship.position.x += -5;
          break;
        //RIGHT
        case 39:
          // this.game.ship.course += 5;
          this.game.ship.position.x += 5;
          break;
        
        //This doesn't do anything yet.
        //UP
      //   case 38:
      //     this.game.ship.velocity += 1;
      //     break;
      //   //DOWN
      //   case 40:
      //     this.game.player.velocity -= 1;
      //     break;
      }
    });


    // window.addEventListener('keyup', event => {
    //   switch (event.keyCode) {
    //     //LEFT
    //     case 37:
    //       this.game.ship.course= 0;
    //       break;
    //     //RIGHT
    //     case 39:
    //       this.game.ship.course = 0;
    //       break;
    //     //UP
    //     case 38:
    //       this.game.ship.velocity = 0;
    //       break;
    //     //DOWN
    //     case 40:
    //       this.game.ship.velocity = 0;
    //       break;
    //   }
    // });
  }
}
