'use strict';
const startWindow = document.querySelector(`.start-window`);
const countdownWindow = document.querySelector(`.countdown-window`);
const timerWindow = document.querySelector(`.timer-window`);
const countdownInput = document.querySelector(`.countdown-input`);
const previousScreenBtn = document.querySelector(`.btn--previous-screen`);
let hours, minutes, seconds;
var countdownInterval;
var timerInterval;

//Weird initialization because of id???
//Look up issues around the variable ${} not changing in functions
let hoursCDText = document.getElementById(`countdown--hours`);
let minutesCDText = document.getElementById(`countdown--minutes`);
let secondsCDText = document.getElementById(`countdown--seconds`);
let hoursTMText = document.getElementById(`timer--hours`);
let minutesTMText = document.getElementById(`timer--minutes`);
let secondsTMText = document.getElementById(`timer--seconds`);

const displayHours = () => {
  if (!countdownWindow.classList.contains(`hidden`)) {
    if (hours < 10) {
      hoursCDText.textContent = `0` + hours;
    } else {
      hoursCDText.textContent = hours;
    }
  }

  if (!timerWindow.classList.contains(`hidden`)) {
    if (hours < 10) {
      hoursTMText.textContent = `0` + hours;
    } else {
      hoursTMText.textContent = hours;
    }
  }
};

const displayMinutes = () => {
  if (!countdownWindow.classList.contains(`hidden`)) {
    if (minutes < 10) {
      minutesCDText.textContent = `0` + minutes;
    } else {
      minutesCDText.textContent = minutes;
    }
  }

  if (!timerWindow.classList.contains(`hidden`)) {
    if (minutes < 10) {
      minutesTMText.textContent = `0` + minutes;
    } else {
      minutesTMText.textContent = minutes;
    }
  }
};

const displaySeconds = () => {
  if (!countdownWindow.classList.contains(`hidden`)) {
    if (seconds < 10) {
      secondsCDText.textContent = `0` + seconds;
    } else {
      secondsCDText.textContent = seconds;
    }
  }

  if (!timerWindow.classList.contains(`hidden`)) {
    if (seconds < 10) {
      secondsTMText.textContent = `0` + seconds;
    } else {
      secondsTMText.textContent = seconds;
    }
  }
};

const codingCountdown = function () {
  let maxTime = (hours * 60 + minutes) * 60;
  seconds = 0;
  if (hours < 10) {
    hoursCDText.textContent = `0` + hours;
  } else {
    hoursCDText.textContent = hours;
  }

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
      console.log(`Countdown STOPPED`);
      document.querySelector(`.audio`).play();
      clearInterval(countdownInterval);
    }
  }, 1000);
};

const codingTimer = function () {
  seconds = 0;
  minutes = 0;
  hours = 0;
  displayHours();
  displayMinutes();
  secondsCDText.textContent = `00`;
  displaySeconds();

  timerInterval = setInterval(() => {
    if (seconds >= 0 && seconds < 60) {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
          displayHours();
        }
        displayMinutes();
      }
      displaySeconds();
    }
    console.log(seconds);
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
    const userInput = countdownInput.value;
    hours = Number(userInput.split(':')[0]);
    minutes = Number(userInput.split(':')[1]);
    console.log(hours);
    console.log(minutes);

    codingCountdown();

    startWindow.classList.toggle('hidden');
    countdownWindow.classList.toggle('hidden');
    countdownInput.classList.toggle(`hidden`);
    previousScreenBtn.classList.toggle(`hidden`);
  }

  if (userKey.key === `Escape`) {
    countdownInput.classList.toggle(`hidden`);
  }
});

//Timer button pressed
document.querySelector(`.btn--timer`).addEventListener('click', function () {
  timerWindow.classList.toggle(`hidden`);
  startWindow.classList.toggle('hidden');
  previousScreenBtn.classList.toggle(`hidden`);

  codingTimer();
});

//Previous screen button
previousScreenBtn.addEventListener('click', function () {
  clearInterval(countdownInterval);
  clearInterval(timerInterval);
  if (!countdownWindow.classList.contains(`hidden`)) {
    countdownWindow.classList.toggle(`hidden`);
  }
  if (!timerWindow.classList.contains(`hidden`)) {
    timerWindow.classList.toggle(`hidden`);
  }
  startWindow.classList.toggle(`hidden`);
  previousScreenBtn.classList.toggle(`hidden`);
});
