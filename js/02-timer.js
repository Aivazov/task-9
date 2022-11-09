// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notiflix.Notify.init({});

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
let selectedDate = null;

refs.startBtn.disabled = true;

const date = new Date();
// console.log('Date: ', date);

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selected) {
    selectedDate = selected[0];

    if (selected[0] < options.defaultDate) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      Notiflix.Notify.success('Hit the start button :)');
    }
  },
};

const timer = {
  start(param) {
    const startTime = new Date(param);

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, mins, secs } = getTimeComponents(deltaTime);

      updateClockFace({ days, hours, mins, secs });
    }, 1000);
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', () => {

  // timer.start('November 11 2022 18:35:00');
  timer.start(selectedDate);
});

//-------------------------------------------------------------//
//==================Keeping it as a memento====================//
//-------------------------------------------------------------//

const timer2 = {
  start() {
    const startTime = new Date();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const { days, hours, mins, secs } = getTimeComponents(deltaTime);

      updateClockFace({ days, hours, mins, secs });
    }, 1000);
  },
};

// timer2.start();

function updateClockFace({ days, hours, mins, secs }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${mins}`;
  refs.dataSeconds.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const days = pad(
    Math.floor((time % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
  );
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
