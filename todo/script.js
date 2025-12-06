document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("my-todo-list");

    // 버튼 클릭
    addButton.addEventListener("click", addTodo);

    // 엔터 입력
    todoInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") addTodo();
    });

    // 할 일 추가 함수
    function addTodo() {
        const text = todoInput.value.trim();
        if (!text) return;

        const li = document.createElement("li");

        // 텍스트 영역
        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("todo-text");

        span.addEventListener("click", function() {
            span.classList.toggle("completed");
        });

        // 삭제 버튼
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {
            li.remove();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        todoInput.value = "";
    }
});
