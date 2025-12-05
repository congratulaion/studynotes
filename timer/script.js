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
const studyLog = document.getElementById("study-log");

// ✅ 시간 포맷
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

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

// ✅ ✅ ✅ 저장 + 과목 + 메모 기록
stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;

  const subject = prompt("어떤 과목을 공부했어?");
  const memo = prompt("무엇을 공부했는지 메모해줘!");

  const prevTotal = Number(localStorage.getItem("todayTime")) || 0;
  const newTotal = prevTotal + elapsedTime;
  localStorage.setItem("todayTime", newTotal);

  const log = JSON.parse(localStorage.getItem("studyLog")) || [];
  log.push({
    subject: subject || "기타",
    memo: memo || "메모 없음",
    time: elapsedTime
  });
  localStorage.setItem("studyLog", JSON.stringify(log));

  updateDailyTotal();
  updateGraph(newTotal);
  renderLog();

  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
});

// ✅ ✅ ✅ 리셋 (전체 초기화)
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;

  elapsedTime = 0;
  startTime = null;

  timeDisplay.textContent = "00:00:00.00";

  localStorage.removeItem("todayTime");
  localStorage.removeItem("studyLog");

  dailyTotal.textContent = "0h 0m 0s";
  studyGraph.style.width = "0%";
  studyLog.innerHTML = "";
});

// ✅ 누적 시간 표시
function updateDailyTotal() {
  const total = Number(localStorage.getItem("todayTime")) || 0;

  const seconds = Math.floor(total / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  dailyTotal.textContent = `${h}h ${m}m ${s}s`;
}

// ✅ ✅ ✅ 공부 기록 렌더링 + 과목 비교 가능
function renderLog() {
  const log = JSON.parse(localStorage.getItem("studyLog")) || [];
  studyLog.innerHTML = "";

  log.forEach(item => {
    const li = document.createElement("li");
    const seconds = Math.floor(item.time / 1000);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    li.textContent = `📘 ${item.subject} - ${m}분 ${s}초 (${item.memo})`;
    studyLog.appendChild(li);
  });
}

// ✅ 처음 로딩 시 실행
updateDailyTotal();
updateGraph(Number(localStorage.getItem("todayTime")) || 0);
renderLog();