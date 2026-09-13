document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');

    const STORAGE_KEY = 'todos';

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function saveTodos() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    function render() {
        list.innerHTML = '';
        if (todos.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }

        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <div class="todo-actions">
                    <button class="complete-btn" data-index="${index}">
                        ${todo.completed ? 'Geri Al' : 'Tamamla'}
                    </button>
                    <button class="delete-btn" data-index="${index}">Sil</button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    function addTodo(text) {
        todos.push({ text, completed: false });
        saveTodos();
        render();
    }

    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        render();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        render();
    }

    // Event listeners
    form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTodo(text);
            input.value = '';
            input.focus();
        }
    });

    list.addEventListener('click', e => {
        if (e.target.matches('.complete-btn')) {
            const index = Number(e.target.dataset.index);
            toggleComplete(index);
        }
        if (e.target.matches('.delete-btn')) {
            const index = Number(e.target.dataset.index);
            deleteTodo(index);
        }
    });

    // Initial render
    render();
});