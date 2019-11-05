class Sound {
  constructor(game) {
    this.game = game;
    this.timerID;
    this.icebergInterval;
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
    // random repeat loop between 90s and 120s
    // setInterval( () => {
    //   this.icebergInterval = (Math.random() * 90000) + 30000;
    // }, 59000);
    // setInterval( () => {
    //   this.playIceberg();
    // }, this.icebergInterval);
  }


  stopSoundsAll () {
    clearInterval(this.timerID);
  }

  // selectRandom() {
    
  // }
}