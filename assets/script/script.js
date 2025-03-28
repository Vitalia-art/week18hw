document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearListBtn = document.getElementById('clear-list-btn');
    const noTasksMessage = document.getElementById('no-tasks-message');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = ''; // Clear the list
        if (tasks.length === 0) {
            taskList.appendChild(noTasksMessage);
            clearListBtn.disabled = true;
        } else {
            tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.classList.add('task-item');
                const taskCheckbox = document.createElement('input');
                taskCheckbox.type = 'checkbox';
                taskCheckbox.classList.add('task-checkbox');
                taskCheckbox.checked = task.completed;
                const taskLabel = document.createElement('span');
                taskLabel.textContent = task.text;
                
                // Update task status when checkbox is clicked
                taskCheckbox.addEventListener('change', () => {
                    task.completed = taskCheckbox.checked;
                    saveTasks();
                });
                
                taskItem.appendChild(taskCheckbox);
                taskItem.appendChild(taskLabel);
                taskList.appendChild(taskItem);
            });
            clearListBtn.disabled = false;
        }
    }

    // Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
        }
    });

    // Clear all tasks
    clearListBtn.addEventListener('click', () => {
        tasks = [];
        saveTasks();
    });

    // Initial render
    renderTasks();
});