let startTime = null;
let elapsedTime = 0;
let timerInterval = null;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

const dailyTotal = document.getElementById("daily-total");
const studyGraph = document.getElementById("study-graph");

// ✅ 시간 포맷 (시:분:초.밀리초)
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10); // 0~99

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(milliseconds).padStart(2, "0")
  );
}

// ✅ 타이머 업데이트
function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

// ✅ 그래프 업데이트 (10시간 = 100%)
function updateGraph(ms) {
  const hours = ms / (1000 * 60 * 60);
  const percent = Math.min((hours / 10) * 100, 100);
  studyGraph.style.width = percent + "%";
}

// ✅ 시작
startBtn.addEventListener("click", () => {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
  }
});

// ✅ 일시정지
pauseBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

// ✅ 저장 후 정지
stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;

  const prev = Number(localStorage.getItem("todayTime")) || 0;
  const total = prev + elapsedTime;

  localStorage.setItem("todayTime", total);

  updateDailyTotal();
  updateGraph(total);

  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
});

// ✅ ✅ ✅ 리셋 (지금 루니 문제 100% 여기서 해결됨)
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;

  elapsedTime = 0;
  startTime = null;

  timeDisplay.textContent = "00:00:00.00";

  localStorage.removeItem("todayTime");
  dailyTotal.textContent = "0h 0m 0s";

  studyGraph.style.width = "0%";
});

// ✅ 오늘 통계 불러오기
function updateDailyTotal() {
  const total = Number(localStorage.getItem("todayTime")) || 0;

  const seconds = Math.floor(total / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  dailyTotal.textContent = `${h}h ${m}m ${s}s`;
}

// ✅ 처음 로딩 시 실행
updateDailyTotal();
updateGraph(Number(localStorage.getItem("todayTime")) || 0);