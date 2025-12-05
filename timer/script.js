document.addEventListener("DOMContentLoaded", () => {
  // ====== DOM 요소 (HTML에 있는 id들과 정확히 맞춤) ======
  const timeDisplay = document.getElementById("time-display");
  const startBtn = document.getElementById("start-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const resetBtn = document.getElementById("reset-btn");
  const dailyTotal = document.getElementById("daily-total");
  const graphBar = document.getElementById("study-graph");
  const statsSection = document.getElementById("statistics-section");

  // ====== 변수 ======
  let timer = null;
  let centiseconds = 0; // 현재 타이머(0.01초 단위)
  let totalCentiseconds = Number(localStorage.getItem("todayStudy")) || 0; // 오늘 누적(0.01초)
  
  // ====== 표시 업데이트 함수 ======
  function updateDisplay() {
    const h = Math.floor(centiseconds / 360000);
    const m = Math.floor((centiseconds % 360000) / 6000);
    const s = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    timeDisplay.textContent = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
  }

  function updateDailyTotalDisplay() {
    const h = Math.floor(totalCentiseconds / 360000);
    const m = Math.floor((totalCentiseconds % 360000) / 6000);
    const s = Math.floor((totalCentiseconds % 6000) / 100);
    const cs = totalCentiseconds % 100;
    dailyTotal.textContent = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
  }

  // ====== 그래프 (10시간 = 100%) ======
  function updateGraphByTime(totalCentisecondsVal) {
    const maxCentiseconds = 10 * 360000; // 10시간
    const percent = Math.min((totalCentisecondsVal / maxCentiseconds) * 100, 100);
    if (graphBar) graphBar.style.width = percent + "%";
  }

  // ====== 버튼 동작 ======
  startBtn.addEventListener("click", () => {
    if (timer !== null) return;
    timer = setInterval(() => {
      centiseconds++;
      updateDisplay();
    }, 10); // 10ms = 0.01초
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;

    // 저장: 현재 세션을 오늘 총합에 더함
    const savedCentis = centiseconds; // 현재 타이머(0.01초)
    totalCentiseconds += savedCentis;
    localStorage.setItem("todayStudy", totalCentiseconds);

    // 업데이트
    centiseconds = 0;
    updateDisplay();
    updateDailyTotalDisplay();
    updateGraphByTime(totalCentiseconds);
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    centiseconds = 0;
    updateDisplay();
  });

  // ====== 통계 기준 안내 문구 자동 추가 (한 번만) ======
  if (statsSection && !document.getElementById("graph-guide")) {
    const guide = document.createElement("p");
    guide.id = "graph-guide";
    guide.textContent = "※ 10시간 = 100% 기준";
    guide.style.fontSize = "12px";
    guide.style.color = "#555";
    guide.style.marginTop = "8px";
    statsSection.appendChild(guide);
  }

  // ====== 초기화: 페이지 로드 시 화면과 그래프 갱신 ======
  updateDisplay();
  updateDailyTotalDisplay();
  updateGraphByTime(totalCentiseconds);
});