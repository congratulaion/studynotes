document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo-input'); // HTML에서 ID 통일
    const addTodoBtn = document.getElementById('add-todo-btn');
    
    const memoList = document.getElementById('memo-list');
    const memoTitleInput = document.getElementById('memo-title-input');
    const memoContentInput = document.getElementById('memo-content-input');
    const saveMemoBtn = document.getElementById('save-memo-btn');

    // --- To-Do 리스트 함수 ---

    /**
     * 로컬 저장소에서 To-Do 항목을 불러와 화면에 렌더링합니다.
     */
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        
        todos.forEach(todo => {
            renderTodoItem(todo);
        });
    }

    /**
     * 새로운 To-Do 항목을 DOM에 렌더링합니다.
     * @param {object} todo - { text: string, completed: boolean } 형태의 To-Do 객체
     */
    function renderTodoItem(todo) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        if (todo.completed) {
            listItem.classList.add('completed');
        }

        const checkboxIcon = document.createElement('div');
        checkboxIcon.classList.add('checkbox-icon');
        checkboxIcon.innerHTML = todo.completed ? '✓' : '';

        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = todo.text;

        listItem.appendChild(checkboxIcon);
        listItem.appendChild(todoText);
        
        listItem.addEventListener('click', () => {
            toggleTodoCompleted(todo.text);
        });

        todoList.appendChild(listItem);
    }

    /**
     * To-Do 항목의 완료 상태를 토글하고 로컬 저장소에 반영합니다.
     */
    function toggleTodoCompleted(todoText) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        
        todos = todos.map(todo => {
            if (todo.text === todoText) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });

        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    /**
     * 새로운 To-Do 항목을 추가합니다. (오류 수정 부분)
     */
    function addTodo() {
        const text = newTodoInput.value.trim();
        if (text === '') return;

        const newTodo = { text, completed: false };
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));

        newTodoInput.value = '';
        loadTodos();
    }

    // 이벤트 리스너: 추가 버튼 클릭 및 Enter 키 입력으로 addTodo 실행
    addTodoBtn.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });


    // --- 메모/일기 함수 ---

    /**
     * 로컬 저장소에서 메모 항목을 불러와 화면에 렌더링합니다.
     */
    function loadMemos() {
        const memos = JSON.parse(localStorage.getItem('memos')) || [];
        memoList.innerHTML = '';

        memos.slice().reverse().forEach(memo => {
            renderMemoItem(memo);
        });
    }

    /**
     * 새로운 메모 항목을 DOM에 렌더링합니다.
     */
    function renderMemoItem(memo) {
        const memoItem = document.createElement('div');
        memoItem.classList.add('memo-item');

        const title = document.createElement('h3');
        title.textContent = memo.title;

        const content = document.createElement('p');
        content.textContent = memo.content;

        const date = document.createElement('small');
        date.textContent = `작성일: ${memo.date}`;
        date.style.display = 'block';
        date.style.marginTop = '5px';
        date.style.color = '#777';

        memoItem.appendChild(title);
        memoItem.appendChild(content);
        memoItem.appendChild(date);
        
        memoList.appendChild(memoItem);
    }

    /**
     * 새로운 메모 항목을 저장합니다.
     */
    function saveMemo() {
        const title = memoTitleInput.value.trim();
        const content = memoContentInput.value.trim();
        
        if (title === '' && content === '') return;

        const now = new Date();
        const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newMemo = { 
            title: title || '제목 없음', 
            content: content || '(내용 없음)', 
            date: dateString 
        };
        
        let memos = JSON.parse(localStorage.getItem('memos')) || [];
        memos.push(newMemo);
        localStorage.setItem('memos', JSON.stringify(memos));

        memoTitleInput.value = '';
        memoContentInput.value = '';
        loadMemos();
    }

    saveMemoBtn.addEventListener('click', saveMemo);


    // 초기 로드
    loadTodos();
    loadMemos();
});