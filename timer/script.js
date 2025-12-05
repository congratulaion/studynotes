document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM 요소 (HTML id와 정확히 일치) =====
  const timeDisplay = document.getElementById("time-display");
  const startBtn = document.getElementById("start-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const resetBtn = document.getElementById("reset-btn");
  const dailyTotal = document.getElementById("daily-total");
  const graphBar = document.getElementById("study-graph");
  const statsSection = document.getElementById("statistics-section");

  // ===== 변수 =====
  let timer = null;
  let centiseconds = 0; // 현재 세션: 0.01초 단위
  let totalCentiseconds = Number(localStorage.getItem("todayStudy")) || 0; // 오늘 누적(0.01초 단위)

  // ===== 표시(타이머) 업데이트 =====
  function updateTimerDisplay() {
    const h = Math.floor(centiseconds / 360000);
    const m = Math.floor((centiseconds % 360000) / 6000);
    const s = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    timeDisplay.textContent = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
  }

  // ===== 통계(오늘 누적) 표시 업데이트 =====
  function updateDailyTotalDisplay() {
    const h = Math.floor(totalCentiseconds / 360000);
    const m = Math.floor((totalCentiseconds % 360000) / 6000);
    const s = Math.floor((totalCentiseconds % 6000) / 100);
    const cs = totalCentiseconds % 100;
    dailyTotal.textContent = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
  }

  // ===== 그래프(10시간 = 100%) 업데이트 =====
  function updateGraphByTime(totalCentis) {
    const maxCentis = 10 * 360000; // 10시간 기준
    const percent = Math.min((totalCentis / maxCentis) * 100, 100);
    if (graphBar) graphBar.style.width = percent + "%";
  }

  // ===== 버튼 동작 =====
  startBtn.addEventListener("click", () => {
    if (timer !== null) return;
    timer = setInterval(() => {
      centiseconds++;
      updateTimerDisplay();
    }, 10);
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;

    // 현재 세션 저장(0.01초 단위)
    totalCentiseconds += centiseconds;
    localStorage.setItem("todayStudy", totalCentiseconds);

    // 초기화 및 화면 갱신
    centiseconds = 0;
    updateTimerDisplay();
    updateDailyTotalDisplay();
    updateGraphByTime(totalCentiseconds);
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    centiseconds = 0;
    updateTimerDisplay();
  });

  // ===== 그래프 기준 안내 문구 자동 추가 =====
  if (statsSection && !document.getElementById("graph-guide")) {
    const guide = document.createElement("p");
    guide.id = "graph-guide";
    guide.className = "graph-guide";
    guide.textContent = "※ 10시간 = 100% 기준";
    statsSection.appendChild(guide);
  }

  // ===== 초기화(페이지 로드 시) =====
  updateTimerDisplay();
  updateDailyTotalDisplay();
  updateGraphByTime(totalCentiseconds);
});