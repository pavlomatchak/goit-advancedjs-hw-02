import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputs = document.querySelectorAll('input');
const submit = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('form')?.addEventListener('submit', e => {
  e.preventDefault();
  submit.disabled = true;

  const form = e.target;
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay)
    .then(({ position, delay }) => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise ${position} in ${delay}ms`,
        position: 'topCenter',
        timeout: 15000,
      });
    })
    .catch(({ position, delay }) => {
      iziToast.error({
        title: 'Fail',
        message: `Rejected promise ${position} in ${delay}ms`,
        position: 'topCenter',
        timeout: 15000,
      });
    })
    .finally(() => {
      if (i + 1 === amount) {
        submit.disabled = false;
      }
    });
    delay += step;
  }
});
