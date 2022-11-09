// import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayInpt: document.querySelector('input[name="delay"]'),
  stepInpt: document.querySelector('input[name="step"]'),
  amountInpt: document.querySelector('input[name="amount"]'),
  formBtn: document.querySelector('button[name="submit"]'),
  clearBtn: document.querySelector('button[name="clear"]'),
};

// let firstDelay = refs.delayInpt.valueAsNumber;
// let delayStep = refs.stepInpt.valueAsNumber;
// let amount = refs.amountInpt.valueAsNumber;

// let intervalId2 = null;

refs.formBtn.addEventListener('click', (e) => {
  let firstDelay = refs.delayInpt.valueAsNumber;
  let delayStep = refs.stepInpt.valueAsNumber;
  let amount = refs.amountInpt.valueAsNumber;
  let stepCounter = delayStep;
  let counter = 0;
  let intervalId = null;

  e.preventDefault();

  if (!firstDelay || !delayStep || !amount) {
    console.log('Please fill all the fields');
    return;
  } else {
    createPromise(
      intervalId,
      firstDelay,
      delayStep,
      amount,
      counter,
      stepCounter
    );

    counter = 0;
    stepCounter = delayStep;
  }
  // functionalityWithoutPromises();
});

const onSuccess = (counter, stepCounter) => {
  Notiflix.Notify.success(
    `Fulfilled promise ${counter + 1} in ${stepCounter}ms`
  );
};

const onError = (counter, stepCounter) => {
  Notiflix.Notify.failure(
    `Rejected promise ${counter + 1} in ${stepCounter}ms`
  );
};

function createPromise(
  intervalId,
  firstDelay,
  delayStep,
  amount,
  counter,
  stepCounter
) {
  return new Promise((resolve, reject) => {
    console.log('firstDelay', firstDelay);
    console.log('delayStep', delayStep);
    console.log('amount', amount);
    intervalId = setTimeout(() => {
      setInterval(() => {
        if (counter === amount) {
          clearInterval(intervalId);
          clearTimeout(intervalId);
          return;
        }

        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve(onSuccess(counter, stepCounter));
        } else {
          reject(onError(counter, stepCounter));
        }

        // console.log(`Callback after ${parseInt(stepCounter)}ms`);
        counter += 1;
        stepCounter += delayStep;
      }, delayStep);
    }, firstDelay);
  });
}

//----------TRASH----------

// createPromise(amount, delayStep).then(logSuccess).catch(logError);

// for (let i = 0; i < amount; i += 1) {
//   // console.log(`I was called ${amount} times`);
//   createPromise(i + 1, delayStep)
//     .then(logSuccess)
//     .catch(logError);
// }

// createPromise()
// refs.delayInpt.addEventListener('input', (e) => {
//   const delay = e.target.value;
//   console.log('delay:', delay);
// });
// const delay = e.target.value;
// console.log('delay:', delay);

// setTimeout(() => {
//   setInterval(() => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve({ position, delay, delayStep });
//     } else {
//       reject({ position, delay, delayStep });
//     }
//   }, delayStep);
// }, delay);
// intervalId = setInterval(() => {
//   if (counter === position) {
//     clearInterval(intervalId);
//     return;
//   }
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     resolve({ position, delay, delayStep });
//   } else {
//     reject({ position, delay, delayStep });
//   }
//   counter += 1;
// }, delayStep);

// const logSuccess = ({ position, delay }) => {
//   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// };

// const logError = ({ position, delay }) => {
//   Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// };

// const logSuccess = ({ position, delay }) => {
//   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
// };

// const logError = ({ position, delay }) => {
//   console.warn(`❌ Rejected promise ${position} in ${delay}ms`);
// };

// function functionalityWithoutPromises() {
//   intervalId = setTimeout(() => {
//     console.log(`Create timer after ${firstDelay}ms...`);
//     setInterval(() => {
//       if (counter === amount) {
//         clearInterval(intervalId);
//         return;
//       }

//       counter += 1;
//       Notiflix.Notify.success(`Callback ${counter} after ${parseInt(stepCounter)}ms`);
//       // console.log(`Callback ${counter} after ${parseInt(stepCounter)}ms`);
//       stepCounter += delayStep;
//     }, delayStep);
//   }, firstDelay);
// }
