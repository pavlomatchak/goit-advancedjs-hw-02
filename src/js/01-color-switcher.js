const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let ref = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function bgChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startButton?.addEventListener('click', () => {
  ref = setInterval(bgChange, 1000);
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
});

stopButton?.addEventListener('click', () => {
  clearInterval(ref);
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
});
