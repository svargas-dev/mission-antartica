const $canvas = document.querySelector('canvas');

const game = new Game($canvas);
const startBtn = document.getElementById('start-btn');


window.addEventListener('load', () => {
    startBtn.addEventListener('click', () => {
      startFade();
      game.startGame();
    });
});

function startFade() {
  let elementsToFade = document.querySelectorAll('.fade');
  for (let elementToFade = 0; elementToFade < elementsToFade.length; elementToFade++) {
    elementsToFade[elementToFade].classList = 'fade-out';
  }
  setTimeout( () => {
    for (let elementToFade = 0; elementToFade < elementsToFade.length; elementToFade++) {
      elementsToFade[elementToFade].hidden =  'true';
      // console.dir(elementsToFade[elementToFade]);
    }
  }, 2000);
}