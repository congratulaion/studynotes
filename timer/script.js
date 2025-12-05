// ===============================
// ✅ 전역 변수
// ===============================
let timer = null;
let centiseconds = 0; // 0.01초 단위
let totalCentiseconds = Number(localStorage.getItem("todayStudy")) || 0;

// ===============================
// ✅ DOM 요소
// ===============================
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const dailyTotal = document.getElementById("daily-total");
const graphBar = document.getElementById("study-graph");

// ===============================
// ✅ 타이머 표시 함수 (시:분:초.센티초)
// ===============================
function updateTimerDisplay() {
  const h = Math.floor(centiseconds / 360000);
  const m = Math.floor((centiseconds % 360000) / 6000);
  const s = Math.floor((centiseconds % 6000) / 100);
  const cs = centiseconds % 100;

  const hStr = String(h).padStart(2, "0");
  const mStr = String(m).padStart(2, "0");
  const sStr = String(s).padStart(2, "0");
  const csStr = String(cs).padStart(2, "0");

  timerDisplay.textContent = `${hStr}:${mStr}:${sStr}.${csStr}`;
}

// ===============================
// ✅ 오늘 통계 표시 함수 (시:분:초.센티초)
// ===============================
function updateDailyTotal() {
  const h = Math.floor(totalCentiseconds / 360000);
  const m = Math.floor((totalCentiseconds % 360000) / 6000);
  const s = Math.floor((totalCentiseconds % 6000) / 100);
  const cs = totalCentiseconds % 100;

  const hStr = String(h).padStart(2, "0");
  const mStr = String(m).padStart(2, "0");
  const sStr = String(s).padStart(2, "0");
  const csStr = String(cs).padStart(2, "0");

  dailyTotal.textContent = `${hStr}:${mStr}:${sStr}.${csStr}`;
}

// ===============================
// ✅ 부드러운 그래프 (10시간 = 100%)
// ===============================
function updateGraphByTime(totalCentiseconds) {
  const maxCentiseconds = 10 * 360000; // 10시간
  const percent = Math.min(
    (totalCentiseconds / maxCentiseconds) * 100,
    100
  );

  graphBar.style.width = percent + "%";
}

// ===============================
// ✅ 시작 버튼
// ===============================
startBtn.addEventListener("click", () => {
  if (timer !== null) return;

  timer = setInterval(() => {
    centiseconds++;
    updateTimerDisplay();
  }, 10); // 0.01초
});

// ===============================
// ✅ 정지 버튼
// ===============================
stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

// ===============================
// ✅ 리셋 버튼
// ===============================
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  centiseconds = 0;
  updateTimerDisplay();
});

// ===============================
// ✅ 저장 버튼 (오늘 통계 + 그래프 갱신)
// ===============================
saveBtn.addEventListener("click", () => {
  totalCentiseconds += centiseconds;
  localStorage.setItem("todayStudy", totalCentiseconds);

  centiseconds = 0;
  updateTimerDisplay();
  updateDailyTotal();
  updateGraphByTime(totalCentiseconds);
});

// ===============================
// ✅ 페이지 새로고침 시 오늘 기록 유지
// ===============================
updateDailyTotal();
updateGraphByTime(totalCentiseconds);
updateTimerDisplay();