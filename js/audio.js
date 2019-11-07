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
  

  playIceCollapse() {
    const iceberg = new Audio('audio/ice-collapse.ogg');
    iceberg.play();
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
  }


  stopSoundsAll() {
    clearInterval(this.windTimerID);
    clearInterval(this.iceCollapseTimerID); 
  }

}
