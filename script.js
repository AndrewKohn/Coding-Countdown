`use strict`;
const startWindow = document.querySelector(`.start-window`);
const countdownWindow = document.querySelector(`.countdown-window`);
const timerWindow = document.querySelector(`.timer-window`);
const countdownInput = document.querySelector(`.countdown-input`);
const previousScreenBtn = document.querySelector(`.btn--previous-screen`);
var countdownInterval, timerInterval;

/*************/
/* FUNCTIONS */
/*************/
const displayHours = selection => {
  let currentHour =
    hours < 10
      ? (document.getElementById(`${selection}--hours`).textContent =
          `0` + hours)
      : (document.getElementById(`${selection}--hours`).textContent = hours);
  return currentHour;
};

const displayMinutes = selection => {
  let currentMinutes =
    minutes < 10
      ? (document.getElementById(`${selection}--minutes`).textContent =
          `0` + minutes)
      : (document.getElementById(`${selection}--minutes`).textContent =
          minutes);
  return currentMinutes;
};

const displaySeconds = selection => {
  let currentSeconds =
    seconds < 10
      ? (document.getElementById(`${selection}--seconds`).textContent =
          `0` + seconds)
      : (document.getElementById(`${selection}--seconds`).textContent =
          seconds);
  return currentSeconds;
};

const timerInit = selection => {
  hours = 0;
  minutes = 0;
  seconds = 0;
  document.getElementById(`${selection}--hours`).textContent = '00';
  document.getElementById(`${selection}--minutes`).textContent = '00';
  document.getElementById(`${selection}--seconds`).textContent = '00';
};

const codingCountdown = function (selection) {
  displayHours(selection);
  displayMinutes(selection);
  seconds = 0;
  displaySeconds(selection);

  let maxTime = (hours * 60 + minutes) * 60;

  countdownInterval = setInterval(() => {
    if (maxTime != 0) {
      maxTime--;
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          hours--;
          minutes = 59;
          displayHours(selection);
        }
        displayMinutes(selection);
      }
      displaySeconds(selection);
    } else {
      console.log(`Countdown ENDED`);
      document.querySelector(`.audio`).play();
      clearInterval(countdownInterval);
    }
  }, 1000);
};

const codingTimer = function (selection) {
  timerInit(selection);

  timerInterval = setInterval(() => {
    if (seconds >= 0 && seconds < 60) {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
          displayHours(selection);
        }
        displayMinutes(selection);
      }
      displaySeconds(selection);
    }
  }, 1000);
};

/**********/
/* EVENTS */
/**********/
//Countdown Button pressed
//  Will show the input textfield over the countdown button
document
  .querySelector(`.btn--countdown`)
  .addEventListener(`click`, function () {
    countdownInput.classList.toggle('hidden');
    countdownInput.focus();
  });

//Countdown Input
//  Take in user's desired HH:MM
countdownInput.addEventListener('keydown', function (userKey) {
  if (userKey.key === `Enter`) {
    const userInput = countdownInput.value;
    hours = Number(userInput.split(`:`)[0]);
    minutes = Number(userInput.split(`:`)[1]);
    console.log(`Hours = ` + hours);
    console.log(`Minutes = ` + minutes);
    let userSelection = `countdown`;

    codingCountdown(userSelection);

    startWindow.classList.toggle('hidden');
    countdownWindow.classList.toggle('hidden');
    countdownInput.classList.toggle(`hidden`);
    previousScreenBtn.classList.toggle(`hidden`);
  }
});

//Timer button pressed
document.querySelector(`.btn--timer`).addEventListener('click', function () {
  timerWindow.classList.toggle(`hidden`);
  startWindow.classList.toggle('hidden');
  previousScreenBtn.classList.toggle(`hidden`);
  let userSelection = `timer`;
  codingTimer(userSelection);
});

//Previous screen button pressed
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
