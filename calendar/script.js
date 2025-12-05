// ✅ D-Day 계산 함수
function getDDay(examDate) {
  const today = new Date();
  const exam = new Date(examDate);

  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);

  const diff = exam - today;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-DAY";
  return `D+${Math.abs(days)}`;
}

const form = document.getElementById("exam-form");
const titleInput = document.getElementById("exam-title");
const dateInput = document.getElementById("exam-date");
const examList = document.getElementById("exam-list");
const calendarGrid = document.getElementById("calendar-grid");

// ✅ 시험 불러오기
function loadExams() {
  const exams = JSON.parse(localStorage.getItem("examList")) || [];
  examList.innerHTML = "";

  exams.forEach((exam, index) => {
    const li = document.createElement("li");

    const dday = getDDay(exam.date);
    li.textContent = `${exam.title} - ${exam.date} (${dday})`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.style.backgroundColor = "crimson";

    delBtn.addEventListener("click", () => {
      exams.splice(index, 1);
      localStorage.setItem("examList", JSON.stringify(exams));
      loadExams();
      renderCalendar();
    });

    li.appendChild(delBtn);
    examList.appendChild(li);
  });
}

// ✅ 시험 등록
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExam = {
    title: titleInput.value,
    date: dateInput.value,
  };

  const exams = JSON.parse(localStorage.getItem("examList")) || [];
  exams.push(newExam);
  localStorage.setItem("examList", JSON.stringify(exams));

  titleInput.value = "";
  dateInput.value = "";

  loadExams();
  renderCalendar();
});

// ✅ 이번 달 캘린더 생성
function renderCalendar() {
  calendarGrid.innerHTML = "";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const exams = JSON.parse(localStorage.getItem("examList")) || [];

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.textContent = day;

    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const hasExam = exams.some(e => e.date === fullDate);

    if (hasExam) {
      cell.classList.add("exam-day");
    }

    calendarGrid.appendChild(cell);
  }
}

// ✅ 최초 실행
loadExams();
renderCalendar();