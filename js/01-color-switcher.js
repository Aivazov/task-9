const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timer = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', () => {
  console.log(`Starting the color picker...`);
  if ((refs.stopBtn.disabled = true)) {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }

  timer = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
    console.log(`The color now is ${randomColor}`);
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  if ((refs.startBtn.disabled = true)) {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  }

  clearInterval(timer);
  console.log('Stop the color picker');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
