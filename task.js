let tasks = [];

const user = localStorage.getItem("loggedInUser");
const taskKey = `tasks_${user}`;

// Load tasks saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
  tasks = loadTasks();
  renderTasks();

  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", (e) => {
      e.preventDefault();
      saveTasks(); // simpan saat kembali
      window.location.href = "dashboard.html";
    });
  }
});

function addTask() {
  const taskName = document.getElementById('taskName').value.trim();
  const deadline = document.getElementById('deadline').value;
  const priority = document.getElementById('priority').value;

  if (!taskName || !deadline || !priority) {
    alert("Please fill all fields.");
    return;
  }

  tasks.push({ name: taskName, deadline, priority, completed: false });
  saveTasks();
  renderTasks();
  clearInputs();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const sortedTasks = [...tasks]
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .concat(
      tasks.filter(t => t.completed)
           .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    );

  sortedTasks.forEach((task, index) => {
    const taskEl = document.createElement('div');
    taskEl.className = 'task-item' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      const globalIndex = tasks.findIndex(
        t => t.name === task.name && t.deadline === task.deadline && t.priority === task.priority
      );
      if (globalIndex !== -1) {
        tasks[globalIndex].completed = !tasks[globalIndex].completed;
        saveTasks();
        renderTasks();
      }
    };

    const name = document.createElement('div');
    name.innerHTML = `<strong>${task.name}</strong><br><span class="priority-label ${getPriorityClass(task.priority)}">${formatPriority(task.priority)}</span>`;

    const date = document.createElement('div');
    date.textContent = task.deadline;

    const controls = document.createElement('div');
    controls.innerHTML = `
      <button onclick="editTask('${task.name}', '${task.deadline}')">Edit</button>
      <button onclick="deleteTask('${task.name}', '${task.deadline}')">Delete</button>
    `;

    taskEl.appendChild(checkbox);
    taskEl.appendChild(name);
    taskEl.appendChild(date);
    taskEl.appendChild(controls);
    list.appendChild(taskEl);
  });

  renderSummary();
}

function clearInputs() {
  document.getElementById('taskName').value = '';
  document.getElementById('deadline').value = '';
  document.getElementById('priority').value = '';
}

function deleteTask(name, deadline) {
  tasks = tasks.filter(t => !(t.name === name && t.deadline === deadline));
  saveTasks();
  renderTasks();
}

function editTask(name, deadline) {
  const taskIndex = tasks.findIndex(t => t.name === name && t.deadline === deadline);
  if (taskIndex !== -1) {
    const task = tasks[taskIndex];
    document.getElementById('taskName').value = task.name;
    document.getElementById('deadline').value = task.deadline;
    document.getElementById('priority').value = task.priority;
    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem(taskKey, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(taskKey);
  return saved ? JSON.parse(saved) : [];
}

function renderSummary() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const summary = `📌 ${total} Task &nbsp;&nbsp; ✅ ${completed} Completed &nbsp;&nbsp; ❗ ${total - completed} Not Complete`;
  document.getElementById('taskSummary').innerHTML = summary;
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'important-urgent': return 'priority-important-urgent';
    case 'not-important-urgent': return 'priority-not-important-urgent';
    case 'important-not-urgent': return 'priority-important-not-urgent';
    default: return '';
  }
}

function formatPriority(priority) {
  switch (priority) {
    case 'important-urgent': return 'Important & urgent';
    case 'not-important-urgent': return 'Not important but urgent';
    case 'important-not-urgent': return 'Important but not urgent';
    default: return '';
  }
}
