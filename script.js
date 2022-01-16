'use strict';
const startWindow = document.querySelector(`.start-window`);
const countdownWindow = document.querySelector(`.countdown-window`);
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
    seconds--;
  } else {
    document.querySelector(`.countdown--seconds`).textContent = seconds;
    seconds--;
  }
};

const countdownTimer = function () {};

// START MENU
// Countdown btn pressed
document
  .querySelector(`.btn--countdown`)
  .addEventListener(`click`, function () {
    document.querySelector(`.countdown-input`).classList.toggle('hidden');
    document.querySelector(`.countdown-input`).focus();
  });

// Countdown inputs
document
  .querySelector(`.countdown-input`)
  .addEventListener('keydown', function (userKey) {
    if (userKey.key === 'Enter') {
      const userInput = document.querySelector(`.countdown-input`).value;
      hours = Number(userInput.split(':')[0]);
      minutes = Number(userInput.split(':')[1]);

      if (hours < 10) {
        document.querySelector(`.countdown--hours`).textContent = `0` + hours;
      } else {
        document.querySelector(`.countdown--hours`).textContent = hours;
      }

      if (minutes < 10) {
        document.querySelector(`.countdown--minutes`).textContent =
          `0` + minutes;
      } else {
        document.querySelector(`.countdown--minutes`).textContent = minutes;
      }

      countdownTimer();

      startWindow.classList.toggle('hidden');
      countdownWindow.classList.toggle('hidden');
    }
  });
