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

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    saveTasks();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value;
  const prio = prioInput.value;
  if (text === "" || prio === "") return;

  const delete_button = document.createElement("button");
  delete_button.textContent = "Delete";
  delete_button.classList.add("del"); 

  const li = document.createElement("li");
  li.classList.add("task-item");
  li.textContent = `${text} - Priority: ${prio}`;
  li.appendChild(delete_button);

  taskList.appendChild(li);
  saveTasks();

  input.value = "";
  prioInput.value = "";
});