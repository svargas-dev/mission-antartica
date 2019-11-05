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
  const elementsToFade = document.querySelectorAll('.fade');
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

function gameOver() {
  $canvas.classList = 'fade-out';
  
  const $button = document.querySelector('button');
  $button.innerText = 'PLAY AGAIN';
  $button.classList = 'fade-in';
  $button.hidden = 'false';

  const $gameOver = document.getElementById('game-over');
  $gameOver.style.display = 'block'
  $gameOver.classList = 'fade-in';
}