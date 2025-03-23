document.addEventListener('DOMContentLoaded', () => {



    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');



    let strObj = localStorage.getItem('tasks');
    let tasks = JSON.parse(strObj) || [];




    tasks.forEach(task => renderTask(task));




    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }

        tasks.push(newTask);
        saveTasks();
        todoInput.value = "";
    })




    function renderTask(task) {
        console.log(task);
    }






    // Save the Tasks to local storage

    function saveTasks() {

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }













})