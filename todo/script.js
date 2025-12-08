document.getElementById("addBtn").addEventListener("click", () => {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();

    if (text === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
        ${text}
        <button class="delete-btn">삭제</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
    });

    document.getElementById("todoList").appendChild(li);

    input.value = ""; // 입력창 초기화
});

document.getElementById("saveMemoBtn").addEventListener("click", () => {
    const title = document.getElementById("memoTitle").value;
    const content = document.getElementById("memoContent").value;

    alert("메모가 저장되었습니다!\n\n제목: " + title);
});
