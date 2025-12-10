// ====== 투두리스트 ======
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        const text = input.value.trim();
        if(text === "") return;

        const li = document.createElement("li");
        li.innerHTML = `<span class="todo-text">${text}</span>`;

        // 버튼 컨테이너
        const btnDiv = document.createElement("div");
        btnDiv.className = "todo-buttons";

        // 수정 버튼
        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => {
            const newText = prompt("내용을 수정하세요", li.querySelector(".todo-text").textContent);
            if(newText !== null && newText.trim() !== ""){
                li.querySelector(".todo-text").textContent = newText.trim();
            }
        });

        // 삭제 버튼
        const delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", () => li.remove());

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(delBtn);
        li.appendChild(btnDiv);

        list.appendChild(li);
        input.value = "";
    }
});

// ====== 메모/일기 ======
document.getElementById("saveMemoBtn").addEventListener("click", () => {
    const title = document.getElementById("memoTitle").value.trim();
    const content = document.getElementById("memoContent").value.trim();

    if(title === "" && content === ""){
        alert("메모 내용을 입력하세요!");
        return;
    }

    alert("메모 저장 완료!\n\n제목: " + title + "\n내용: " + content);

    // 입력 초기화
    document.getElementById("memoTitle").value = "";
    document.getElementById("memoContent").value = "";
});
const goHomeBtn = document.getElementById("go-home");

