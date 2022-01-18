'use strict';
const startWindow = document.querySelector(`.start-window`);
const countdownWindow = document.querySelector(`.countdown-window`);
const timerWindow = document.querySelector(`.timer-window`);
const countdownInput = document.querySelector(`.countdown-input`);
const previousScreenBtn = document.querySelector(`.btn--previous-screen`);
let selection = 'countdown';
let hours, minutes, seconds;
var countdownInterval;
var timerInterval;

//Weird initialization because of id???
let hoursText = document.getElementById(`${selection}--hours`);
let minutesText = document.getElementById(`${selection}--minutes`);
let secondsText = document.getElementById(`${selection}--seconds`);

const displayHours = () => {
  if (hours < 10) {
    hoursText.textContent = `0` + hours;
  } else {
    hoursText.textContent = hours;
  }
};

const displayMinutes = () => {
  if (minutes < 10) {
    minutesText.textContent = `0` + minutes;
  } else {
    minutesText.textContent = minutes;
  }
};

const displaySeconds = () => {
  if (seconds < 10) {
    secondsText.textContent = `0` + seconds;
  } else {
    secondsText.textContent = seconds;
  }
};

const codingCountdown = function () {
  selection = `countdown`;
  let maxTime = (hours * 60 + minutes) * 60;
  seconds = 0;

  countdownInterval = setInterval(() => {
    if (maxTime != 0) {
      if (seconds < 60) {
        maxTime--;
        console.log(maxTime);
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            hours--;
            minutes = 59;
            displayHours();
          }
          displayMinutes();
        }
        displaySeconds();
      }
    } else {
      // console.log(`Timer STOPPED`);
      document.querySelector(`.audio`).play();
      clearInterval(countdownInterval);
    }
  }, 1000);
};

const codiingTimer = function () {
  selection = `timer`;

  timerInterval = setInterval(() => {
    if (seconds >= 0) {
    }
  }, 1000);
};

// const init = () => {
//   document.getElementById(`${selection}--hours`).value = `00`;
//   document.getElementById(`${selection}--minutes`).value = `00`;
//   document.getElementById(`${selection}--seconds`).value = `00`;
// };

// START MENU
// Countdown btn pressed
document
  .querySelector(`.btn--countdown`)
  .addEventListener(`click`, function () {
    countdownInput.classList.toggle('hidden');
    countdownInput.focus();
  });

// Countdown input
countdownInput.addEventListener('keydown', function (userKey) {
  if (userKey.key === 'Enter') {
    // init();
    const userInput = countdownInput.value;
    hours = Number(userInput.split(':')[0]);
    minutes = Number(userInput.split(':')[1]);
    console.log(hours);
    console.log(minutes);

    displayHours();
    displayMinutes();
    codingCountdown();

    startWindow.classList.toggle('hidden');
    countdownWindow.classList.toggle('hidden');
    countdownInput.classList.toggle(`hidden`);
  }

  if (userKey.key === `Escape`) {
    countdownInput.classList.toggle(`hidden`);
  }
});

//Previous screen button
previousScreenBtn.addEventListener('click', function () {
  clearInterval(countdownInterval);
  if (!countdownWindow.classList.contains(`hidden`)) {
    countdownWindow.classList.toggle(`hidden`);
  }
  if (!timerWindow.classList.contains(`hidden`)) {
    timerWindow.classList.toggle(`hidden`);
  }
  startWindow.classList.toggle(`hidden`);
});
