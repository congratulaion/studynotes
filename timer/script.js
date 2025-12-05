let seconds = 0;
let isRunning = false;
let dailyTotal = 0;
let timerInterval;

const timeDisplay = document.getElementById('time-display');
const dailyTotalDisplay = document.getElementById('daily-total');

function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(seconds);
  dailyTotalDisplay.textContent = `${Math.floor(dailyTotal/3600)}h ${Math.floor((dailyTotal%3600)/60)}m`;
}

document.getElementById('start-btn').addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
});

document.getElementById('pause-btn').addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
});

document.getElementById('stop-btn').addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
  dailyTotal += seconds;
  seconds = 0;
  updateDisplay();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
  seconds = 0;
  dailyTotal = 0;
  updateDisplay();
});
