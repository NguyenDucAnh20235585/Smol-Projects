const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

    const text = input.value;

    const li = document.createElement("li");
    li.classList.add("#taskList");
    li.textContent = text;

    taskList.appendChild(li);

    input.value ="";
});