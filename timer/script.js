// ====== 요소 가져오기 ======
const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const dailyTotal = document.getElementById("daily-total");

// ====== 타이머 변수 ======
let timer = null;

let centiseconds = 0; // ✅ 0.01초 단위
let seconds = 0;
let minutes = 0;
let hours = 0;

let totalCentiseconds = 0; // 오늘 누적 공부 시간 (0.01초 단위)

// ====== 시간 화면 업데이트 (HH:MM:SS.CC) ======
function updateDisplay() {
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  const cs = String(centiseconds).padStart(2, "0");

  timeDisplay.textContent = `${h}:${m}:${s}.${cs}`;
}

// ====== 타이머 시작 ======
startBtn.addEventListener("click", function () {
  if (timer !== null) return; // 중복 실행 방지

  timer = setInterval(function () {
    centiseconds++; // ✅ 0.01초 증가

    if (centiseconds === 100) {
      centiseconds = 0;
      seconds++;
    }

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    updateDisplay();
  }, 10); // ✅ 10ms = 0.01초
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

  // ✅ 오늘 총 공부 시간 누적 (0.01초 단위)
  const savedCentiseconds =
    hours * 360000 + minutes * 6000 + seconds * 100 + centiseconds;

  totalCentiseconds += savedCentiseconds;

  const totalH = Math.floor(totalCentiseconds / 360000);
  const totalM = Math.floor((totalCentiseconds % 360000) / 6000);

  dailyTotal.textContent = `${totalH}h ${totalM}m`;

  // ✅ 그래프 업데이트 (시간 기준)
  updateGraph(totalH);

  // ✅ 타이머 초기화
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;

  updateDisplay();
});

// ====== 리셋 ======
resetBtn.addEventListener("click", function () {
  clearInterval(timer);
  timer = null;

  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;

  updateDisplay();
});

// ====== ✅ 통계 그래프 업데이트 ======
function updateGraph(hours) {
  const percent = Math.min(hours * 10, 100); // 10시간 = 100%
  document.getElementById("study-graph").style.width = percent + "%";
}