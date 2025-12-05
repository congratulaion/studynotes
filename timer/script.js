// ====== 요소 가져오기 ======
const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const dailyTotal = document.getElementById("daily-total");

// ====== 타이머 변수 ======
let timer = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

let totalSeconds = 0; // 오늘 누적 공부 시간 (초)

// ====== 시간 화면 업데이트 ======
function updateDisplay() {
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  timeDisplay.textContent = `${h}:${m}:${s}`;
}

// ====== 타이머 시작 ======
startBtn.addEventListener("click", function () {
  if (timer !== null) return; // 이미 실행 중이면 중복 실행 방지

  timer = setInterval(function () {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    updateDisplay();
  }, 1000);
});

// ====== 일시정지 ======
pauseBtn.addEventListener("click", function () {
  clearInterval(timer);
  timer = null;
});

// ====== 저장 후 정지 ======
stopBtn.addEventListener("click", function () {
  clearInterval(timer);
  timer = null;

  // 오늘 총 공부 시간에 추가
  const savedSeconds = hours * 3600 + minutes * 60 + seconds;
  totalSeconds += savedSeconds;

  const totalH = Math.floor(totalSeconds / 3600);
  const totalM = Math.floor((totalSeconds % 3600) / 60);

  dailyTotal.textContent = `${totalH}h ${totalM}m`;

  // ✅ 그래프 업데이트
  updateGraph(totalH);

  // 타이머 초기화
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDisplay();
});

// ====== 리셋 ======
resetBtn.addEventListener("click", function () {
  clearInterval(timer);
  timer = null;

  seconds = 0;
  minutes = 0;
  hours = 0;

  updateDisplay();
});

// ====== ✅ 통계 그래프 업데이트 함수 ======
function updateGraph(hours) {
  const percent = Math.min(hours * 10, 100); // 10시간 = 100%
  document.getElementById("study-graph").style.width = percent + "%";
}
