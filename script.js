window.onload = function() {
    loadTasks();
}

function loadTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = ''; // Clear the task list before loading
    
    tasks.forEach(function(task) {
        var id = task.match(/\d+/)[0];
        var newTask = document.createElement('li');
        newTask.innerHTML = `<div id=${id} class="listItems">${task}</div>`;
        taskList.appendChild(newTask);
        console.log("new task ",newTask);
    });

    // console.log(tasks);
}

// Function to add a new task
function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText !== '') {
        var taskList = document.getElementById('taskList');
        var id = idGenerate();
        var newTask = document.createElement('li');
        newTask.innerHTML = `<div id=${id} class="listItems">
        <input type="checkbox" onchange="toggleTaskCompletion(this, ${id})">
        <span>${taskText}</span>
        <button class="delBtn" onclick="deleteTask(${id})">X</button>
        </div>`;
        taskList.appendChild(newTask);
        // Save the updated task list to localStorage
        saveTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

function saveTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = [];
    
    taskList.querySelectorAll('.listItems').forEach(function(task) {
        tasks.push(task.innerHTML);
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function idGenerate() {
    let randomID = '';
    
    for (let i = 0; i < 4; i++) {
        // Generate a random number between 0 and 9
        const digit = Math.floor(Math.random() * 10);
        // Append the generated digit to the randomID string
        randomID += digit;
    }
    
    return randomID;
}

// Function to toggle task completion
function toggleTaskCompletion(checkbox, taskId) {
    var task = document.getElementById(taskId);
    var delBtn = task.querySelector(".delBtn");
    if (checkbox.checked) {
        task.classList.add('completed');
        delBtn.disabled = true;
    } else {
        task.classList.remove('completed');
        delBtn.disabled = false;
    }

    // Save the updated task list to localStorage
    saveTasks();
}

// Function to delete a task
function deleteTask(id) {
    var task = document.getElementById(id);
    task.remove(id);
    saveTasks();
}
