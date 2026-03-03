const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const prioInput = document.querySelector("#prio");
const taskList = document.querySelector("#taskList");
const filter = document.querySelector("#filter");

function saveTasks() {
  localStorage.setItem("tasksHTML", taskList.innerHTML);
}

function loadTasks() {
  const saved = localStorage.getItem("tasksHTML");
  if (saved) taskList.innerHTML = saved;
}

loadTasks();

filter.addEventListener("change", (e) =>{
  const chosen = filter.value;

  const task = taskList.querySelectorAll("li");
  task.forEach((li) => {
    if (chosen === "all" || li.dataset.prio === chosen){
      li.style.display = "";
    }
    else{
      li.style.display = "none";
    }
  });
});

taskList.querySelectorAll("li").forEach((li) => {
  if (!li.dataset.prio){
    const m = li.textContent.match(/Priority:\s*(\d)/);
    if (m) li.dataset.prio = m[1];
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    saveTasks();
    return;
  }
});

taskList.addEventListener("dblclick", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  li.classList.toggle("done");
  saveTasks();
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
  li.dataset.prio = prio;
  li.appendChild(delete_button);

  taskList.appendChild(li);
  saveTasks();

  input.value = "";
  prioInput.value = "";
});