const form = document.getElementById("exam-form");
const examName = document.getElementById("exam-name");
const examDate = document.getElementById("exam-date");
const examList = document.getElementById("exam-list");

let exams = JSON.parse(localStorage.getItem("exams")) || [];

// ✅ D-Day 계산 함수
function getDDay(date) {
  const today = new Date();
  const exam = new Date(date);

  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);

  const diff = exam - today;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-DAY";
  return `D+${Math.abs(days)}`;
}

// ✅ 화면 출력 함수
function renderExams() {
  examList.innerHTML = "";

  exams.forEach((exam, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${exam.name} (${exam.date}) - ${getDDay(exam.date)}</span>
      <button class="delete-btn" onclick="deleteExam(${index})">삭제</button>
    `;

    examList.appendChild(li);
  });
}

// ✅ 등록 버튼 작동
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newExam = {
    name: examName.value,
    date: examDate.value
  };

  exams.push(newExam);
  localStorage.setItem("exams", JSON.stringify(exams));

  examName.value = "";
  examDate.value = "";

  renderExams();
});

// ✅ 삭제 기능
function deleteExam(index) {
  exams.splice(index, 1);
  localStorage.setItem("exams", JSON.stringify(exams));
  renderExams();
}

// ✅ 처음 로딩 시 출력
renderExams();