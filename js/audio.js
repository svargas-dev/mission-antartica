class Sound {
  constructor(game) {
    this.game = game;
    this.timerID;
  }



  playWind() {
    const wind = new Audio('audio/antarctic-wind.mp3');
    wind.play();
  }

  playIceberg() {
    let selectRanSound = Math.floor(Math.random()*3) + 1;
    const iceberg = new Audio(`audio/iceberg${selectRanSound}.ogg`)
    iceberg.play();
  }

  playSoundsAll () {
    this.timerID = setInterval(() => {
      this.playWind();
    }, 9200);

  }

  stopSoundsAll () {
    clearInterval(this.timerID);
  }

  // selectRandom() {
    
  // }
}