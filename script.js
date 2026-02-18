const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const searchIcon = document.querySelector(".search-box i");
const searchInput = document.getElementById("searchInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Search
searchInput.addEventListener("input", renderTasks);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  taskInput.value = "";

  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  const filtered = tasks.filter(task =>
    task.text.toLowerCase().includes(searchText)
  );

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    if (task.done) span.classList.add("completed");

    span.addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "✖";

    delBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t !== task);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();




// Click icon → focus input
searchIcon.addEventListener("click", () => {
  searchInput.focus();
});
