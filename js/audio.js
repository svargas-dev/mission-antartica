class Sound {
  constructor(game) {
    this.game = game;
    this.windTimerID;
    this.iceCollapseTimerID;
  }


  playWind() {
    const wind = new Audio('audio/antarctic-wind.mp3');
    wind.play();
  }

  playClang() {
    const clang = new Audio('audio/clang.mp3');
    clang.play();
  }


  playImpact() {
    const growler = new Audio('audio/thud.mp3');
    growler.play();
  }

  // let selectRanSound = Math.floor(Math.random()*3) + 1;
  // const iceberg = new Audio(`audio/iceberg${selectRanSound}.ogg`)
  

  playIceCollapse(interval) {
    setTimeout( () => {
      const iceberg = new Audio('audio/ice-collapse.ogg');
      iceberg.play();
    }, 22000);
    console.log('Ice collapse!')
  }


  playGameOver() {
    const iceberg = new Audio('audio/end-game.ogg');
    iceberg.play();
  }  


  playSoundsAll () {
    this.windTimerID = setInterval(() => {
      this.playWind();
    }, 9200);
    let interval = Math.floor(Math.random() * 20000) + 40000 // random interval between 20s & 60s
    this.iceCollapseTimerID = setInterval(() => {
      this.playIceCollapse();
    }, interval);

    // random repeat loop between 90s and 120s
    // setInterval( () => {
    //   this.icebergInterval = (Math.random() * 90000) + 30000;
    // }, 59000);
    // setInterval( () => {
    //   this.playIceberg();
    // }, this.icebergInterval);
  }


  stopSoundsAll () {
    clearInterval(this.windTimerID);
  }

}
