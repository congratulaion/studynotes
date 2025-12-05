const form = document.getElementById("exam-form");
const nameInput = document.getElementById("exam-name");
const dateInput = document.getElementById("exam-date");
const list = document.getElementById("exam-list");

// localStorage 불러오기
let exams = JSON.parse(localStorage.getItem("exams")) || [];

// ✅ 화면에 시험 출력
function renderExams() {
  list.innerHTML = "";

  exams.forEach((exam, index) => {
    const li = document.createElement("li");
    const dday = getDDay(date);
    li.textContent = `${title} - ${date} (${dday})`;

    const btn = document.createElement("button");
    btn.textContent = "삭제";
    btn.className = "delete-btn";
    btn.onclick = () => deleteExam(index);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// ✅ 시험 추가
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newExam = {
    name: nameInput.value,
    date: dateInput.value
  };

  exams.push(newExam);
  localStorage.setItem("exams", JSON.stringify(exams));

  nameInput.value = "";
  dateInput.value = "";

  renderExams();
});

// ✅ 시험 삭제
function deleteExam(index) {
  exams.splice(index, 1);
  localStorage.setItem("exams", JSON.stringify(exams));
  renderExams();
}

// ✅ 처음 로딩 시 출력
renderExams();