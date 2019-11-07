const $button = document.getElementById('start-btn');
const $canvas = document.querySelector('canvas');

$button.addEventListener('click', () => {
  const game = new Game($canvas);
  startFade();
  game.clearAll();
  game.reset();
  game.startGame();
  
  $canvas.addEventListener('mousedown', function(event) {
    game.easterEgg($canvas, event);
  })
});


function startFade() {
  const elementsToFade = document.querySelectorAll('.fade');
  setTimeout( () => {
    $button.style.display = 'none';
  });

  for (let elementToFade = 0; elementToFade < elementsToFade.length; elementToFade++) {
    elementsToFade[elementToFade].classList = 'fade-out';
  }
  setTimeout( () => {
    for (let elementToFade = 0; elementToFade < elementsToFade.length; elementToFade++) {
      elementsToFade[elementToFade].style.display =  'none';
      // console.dir(elementsToFade[elementToFade]);
    }
  }, 2000);
}


function resetButton() {
  $canvas.style.display = 'block';
  $button.innerText = 'PLAY AGAIN';
  $button.style.display = 'block';
  $button.classList = 'fade-in';
}
