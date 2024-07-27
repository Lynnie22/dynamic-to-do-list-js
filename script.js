document.addEventListener('DOMContentLoaded', () => {
    // Initialize and load tasks from Local Storage
    loadTasksFromLocalStorage();

    const addTaskButton = document.getElementById('add-task-btn');
    addTaskButton.addEventListener('click', addTask);

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function addTask() {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            addTaskToDOM(taskText);
            taskInput.value = ''; // Clear input after adding task
        }
    }

    function addTaskToDOM(taskText) {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => removeTask(taskText, listItem));

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    function removeTask(taskText, listItem) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        listItem.remove();
    }
});
