import flatpickr from "flatpickr";
import iziToast from 'izitoast';
import "flatpickr/dist/flatpickr.min.css";
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setDate(selectedDates[0]);
  },
};
let selectedDate = null;
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let ref = null;
const input = document.getElementById('datetime-picker');

flatpickr('#datetime-picker', options);

function setDate(date) {
  startButton?.setAttribute('disabled', true);

  if (ref) {
    return;
  }

  if (Date.parse(date) < Date.parse(new Date())) {
    iziToast.error({
      title: 'Fail',
      message: `Please choose a date in the future`,
      position: 'topCenter',
      timeout: 15000,
    });
    return;
  }

  startButton?.removeAttribute('disabled');
  selectedDate = date;
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

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

startButton?.addEventListener('click', () => {
  startButton?.setAttribute('disabled', true);
  input?.setAttribute('disabled', true);
  ref = setInterval(() => {
    const timeDiff = Date.parse(selectedDate) - Date.parse(new Date());

    if (timeDiff <= 0) {
      clearInterval(ref);
      startButton?.removeAttribute('disabled');
      input?.removeAttribute('disabled');
    }

    seconds.innerHTML = addLeadingZero(convertMs(timeDiff).seconds);
    minutes.innerHTML = addLeadingZero(convertMs(timeDiff).minutes);
    hours.innerHTML = addLeadingZero(convertMs(timeDiff).hours);
    days.innerHTML = addLeadingZero(convertMs(timeDiff).days);
  }, 1000);
});
