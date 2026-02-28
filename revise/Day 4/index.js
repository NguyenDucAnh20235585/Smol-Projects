const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const prioInput = document.querySelector("#prio");
const taskList = document.querySelector("#taskList");

function saveTasks() {
  localStorage.setItem("tasksHTML", taskList.innerHTML);
}

function loadTasks() {
  const saved = localStorage.getItem("tasksHTML");
  if (saved) taskList.innerHTML = saved;
}

loadTasks();

taskList.addEventListener("dblclick", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
    saveTasks();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  const prio = prioInput.value;
  if (text === "" || prio === "") return;

  const li = document.createElement("li");
  li.classList.add("task-item");
  li.textContent = `${text} - Priority: ${prio}`;

  taskList.appendChild(li);
  saveTasks();

  input.value = "";
  prioInput.value = "";
});