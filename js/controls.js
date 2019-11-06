class Controls {
  constructor(game) {
    this.game = game;
    this.horMove = 4;
  }

  // to do: prevent default
  setControls() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        //LEFT
        case 37:
          if (this.game.ship.position.x <= this.game.WIDTH && 
              this.game.ship.position.x > this.horMove) {
            this.game.ship.position.x -= this.horMove;
          } else {
            this.game.sound.playClang();
          }
          // this.game.ship.course -= 2;
          break;
        //RIGHT
        case 39:
          if (this.game.ship.position.x < (this.game.WIDTH - this.horMove) && 
          this.game.ship.position.x >= 0) {
            this.game.ship.position.x += this.horMove;
            // this.game.ship.course += 2;
          } else {
            this.game.sound.playClang();
          }
          break;
        // // UP
        // case 38:
        // //  this.game.ship.velocity += 2;
        //  this.game.ship.position.y -= 2;
        //  break;
        // // DOWN
        // case 40:
        // //  this.game.ship.velocity -= 2;
        //  this.game.ship.position.y += 2;
        //  break;
      }
    });


    window.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case 37:
            if (this.game.ship.position.x <= this.game.WIDTH && 
                this.game.ship.position.x > this.horMove/2) {
              this.game.ship.position.x -= this.horMove/2;
            } else {
              this.game.sound.playClang();
            }
            // this.game.ship.course -= 2;
            break;
          //RIGHT
          case 39:
            if (this.game.ship.position.x < (this.game.WIDTH - this.horMove/2) && 
            this.game.ship.position.x >= 0) {
              this.game.ship.position.x += this.horMove/2;
              // this.game.ship.course += 2;
            } else {
              this.game.sound.playClang();
            }
            break;
        
        // //LEFT
        // case 37:
        //   this.game.ship.position.x -= 1;
        //   // this.game.ship.course -= 1;
        //   break;
        // //RIGHT
        // case 39:
        //   this.game.ship.position.x += 1;
        //   // this.game.ship.course += 1;
        //   break;
        // //UP
        // case 38:
        //   // this.game.ship.velocity = 1;
        //   this.game.ship.position.y -= 1;
        //   break;
        // //DOWN
        // case 40:
        //   this.game.ship.position.y += 1;
        //   break;
      }
    });
  }
}
