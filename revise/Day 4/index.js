const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const prioInput = document.querySelector("#prio");
const taskList = document.querySelector("#taskList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  const prio = prioInput.value;

  if (text === "" || prio === "") return;

  const li = document.createElement("li");
  li.classList.add("task-item");
  li.textContent = `${text} - Priority: ${prio}`;

  taskList.appendChild(li);

  input.value = "";
  prioInput.value = "";
});