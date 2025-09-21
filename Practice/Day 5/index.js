function add_task(){
    //add task
    const select_task = document.getElementById("to_do_list");
    const task_value = select_task.value;

    const li = document.createElement("li");
    li.textContent = task_value;

    const task_list = document.getElementById("task_list");
    task_list.appendChild(li);
    li.classList.add("ul");

    //delete button
    const delete_button = document.createElement("button");
    delete_button.textContent = "❌";
    delete_button.classList.add("button");

    delete_button.onclick = () => {
        li.remove();
    }

    li.appendChild(delete_button);
}