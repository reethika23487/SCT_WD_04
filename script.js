let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <div class="task-details">
        <span>${task.text}</span><br>
        <small>${task.date || ''} ${task.time || ''}</small>
      </div>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">
          <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i> ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="edit-btn" onclick="editTask(${index})"><i class="fas fa-edit"></i> Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})"><i class="fas fa-trash"></i> Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({
    text,
    date: dateInput.value,
    time: timeInput.value,
    completed: false
  });
  taskInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  saveTasks();
  renderTasks();
}
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
function editTask(index) {
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null && newText.trim()) {
    tasks[index].text = newText.trim();
    const newDate = prompt('Edit date (YYYY-MM-DD):', tasks[index].date);
    const newTime = prompt('Edit time (HH:MM):', tasks[index].time);
    tasks[index].date = newDate || tasks[index].date;
    tasks[index].time = newTime || tasks[index].time;
    saveTasks();
    renderTasks();
  }
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
function clearAll() {
  if (confirm('Are you sure you want to clear all tasks?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}
renderTasks();
