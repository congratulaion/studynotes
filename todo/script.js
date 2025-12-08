const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        const text = input.value.trim();
        if (text === "") return;

        const li = document.createElement("li");
        li.textContent = text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", () => li.remove());

        li.appendChild(delBtn);
        list.appendChild(li);

        input.value = ""; // 입력창 초기화
    }
});
