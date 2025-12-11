// ====== 투두리스트 ======
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

// 로컬스토리지 호출
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 투두 렌더링
function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        // 체크박스
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;
        checkbox.addEventListener("change", () => toggleTodo(index));

        // 텍스트
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        if (todo.done) {
            span.style.textDecoration = "line-through";
            span.style.color = "#999";
        }

        // 버튼 박스
        const btnDiv = document.createElement("div");
        btnDiv.className = "todo-buttons";

        // 수정 버튼
        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => {
            const newText = prompt("내용을 수정하세요", todo.text);
            if (newText !== null && newText.trim() !== "") {
                todos[index].text = newText.trim();
                saveTodos();
            }
        });

        // 삭제 버튼
        const delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", () => deleteTodo(index));

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(delBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnDiv);

        list.appendChild(li);
    });
}

function toggleTodo(index) {
    todos[index].done = !todos[index].done;
    saveTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const text = input.value.trim();
        if (text === "") return;

        todos.push({ text, done: false });
        saveTodos();

        input.value = "";
    }
});

renderTodos();

// ====== 메모/일기 ======
const saveMemoBtn = document.getElementById("saveMemoBtn");

// 메모 리스트 표시 영역 생성
let memoList = document.createElement("div");
memoList.id = "memoList";
document.querySelector(".container").appendChild(memoList);

// 메모 로딩
let memos = JSON.parse(localStorage.getItem("memos")) || [];
renderMemos();

// 메모 저장
saveMemoBtn.addEventListener("click", () => {
    const title = document.getElementById("memoTitle").value.trim();
    const content = document.getElementById("memoContent").value.trim();

    if (title === "" && content === "") {
        alert("메모 내용을 입력하세요!");
        return;
    }

    const memo = {
        title,
        content,
        date: new Date().toLocaleString()
    };

    // 최신 메모 위로
    memos.unshift(memo);
    localStorage.setItem("memos", JSON.stringify(memos));
    renderMemos();

    document.getElementById("memoTitle").value = "";
    document.getElementById("memoContent").value = "";
});

// 메모 렌더링
function renderMemos() {
    memoList.innerHTML = "<h2>📝 저장된 메모</h2>";

    memos.forEach((memo, index) => {
        const card = document.createElement("div");
        card.className = "memo-card";

        card.innerHTML = `
            <strong>${memo.title}</strong>
            <p style="font-size:14px; color:#666;">${memo.date}</p>
            <p>${memo.content}</p>
            <button class="delete-btn" data-index="${index}">삭제</button>
        `;

        memoList.appendChild(card);
    });

    // 삭제 버튼 이벤트
    const deleteButtons = document.querySelectorAll("#memoList .delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const i = btn.dataset.index;
            memos.splice(i, 1);
            localStorage.setItem("memos", JSON.stringify(memos));
            renderMemos();
        });
    });
}
