'use strict';
const startWindow = document.querySelector(`.start-window`);
const countdownWindow = document.querySelector(`.countdown-window`);
const countdownInput = document.querySelector(`.countdown-input`);
let hours, minutes, seconds;

const displayHours = () => {
  if (hours < 10) {
    document.querySelector(`.countdown--hours`).textContent = `0` + hours;
  } else {
    document.querySelector(`.countdown--hours`).textContent = hours;
  }
};

const displayMinutes = () => {
  if (minutes < 10) {
    document.querySelector(`.countdown--minutes`).textContent = `0` + minutes;
  } else {
    document.querySelector(`.countdown--minutes`).textContent = minutes;
  }
};

const displaySeconds = () => {
  if (seconds < 10) {
    document.querySelector(`.countdown--seconds`).textContent = `0` + seconds;
  } else {
    document.querySelector(`.countdown--seconds`).textContent = seconds;
  }
};

const countdownTimer = function () {
  let TIME_MAX = (hours * 60 + minutes) * 60;
  seconds = 0;

  const countdownInterval = setInterval(() => {
    if (TIME_MAX != 0) {
      if (seconds < 60) {
        TIME_MAX--;
        console.log(TIME_MAX);
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
  }, 500);
};

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
    const userInput = countdownInput.value;
    hours = Number(userInput.split(':')[0]);
    minutes = Number(userInput.split(':')[1]);

    displayHours();
    displayMinutes();
    countdownTimer();

    startWindow.classList.toggle('hidden');
    countdownWindow.classList.toggle('hidden');
  }

  if (userKey.key === `Escape`) {
    countdownInput.classList.toggle(`hidden`);
  }
});
