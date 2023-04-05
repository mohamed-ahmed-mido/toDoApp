window.addEventListener('load', () => {
  locally = JSON.parse(localStorage.getItem("Todos")) || [];
  const form = document.querySelector("#task-form");

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // localstorage json values
    const todo = {
      content: e.target.elements.content.value,
      createdAt: new Date().getTime()
    }

    if (!e.target.elements.content.value){
      alert("Please fill out the input to add a task!");
      return
    } else {
      locally.push(todo);
      // Save in local storage
      localStorage.setItem('Todos', JSON.stringify(locally))
    }

    e.target.reset();
    DisplayTasks();
  });
  DisplayTasks();
});

function DisplayTasks(){
  const list_element = document.querySelector("#tasks");

  list_element.innerHTML = '';

  locally.forEach(todo => {
    // main div
    const task_element = document.createElement("div");
    task_element.classList.add("row");

    
    // task input
    const input_element = document.createElement("input");
    input_element.type = "text";
    input_element.classList.add("col-9");
    input_element.classList.add("col-sm-10");
    input_element.value = todo.content;
    input_element.setAttribute("readonly", "readonly");


    // Button div
    const button_div = document.createElement("div");
    button_div.classList.add("col-3");
    button_div.classList.add("col-sm-2");
    button_div.classList.add("text-center");


    // Buttons
    const edit_btn = document.createElement("button");
    edit_btn.classList.add("btn");
    edit_btn.classList.add("edit");
    edit_btn.innerText = "Edit";
    const delete_btn = document.createElement("button");
    delete_btn.classList.add("btn");
    delete_btn.classList.add("delete");
    delete_btn.innerText = "Delete";


    // Append elements to each others in order
    task_element.appendChild(input_element);
    button_div.appendChild(edit_btn);
    button_div.appendChild(delete_btn);
    task_element.appendChild(button_div);
    list_element.appendChild(task_element);

    // Edit button function
    edit_btn.addEventListener("click", () => {
      if(edit_btn.innerText.toLowerCase() == "edit") {
        input_element.removeAttribute("readonly");
        edit_btn.classList.replace("edit", "save")
        input_element.focus();
        edit_btn.innerText = "Save";
      } else {
        input_element.setAttribute("readonly", "readonly");
        edit_btn.classList.replace("save", "edit")
        edit_btn.innerText = "Edit";
        todo.content = input_element.value
        localStorage.setItem('Todos', JSON.stringify(locally))
        DisplayTasks()
      }
    });
    delete_btn.addEventListener("click", () =>{
      locally = locally.filter(t => t != todo);
      localStorage.setItem('Todos', JSON.stringify(locally))
        DisplayTasks()
    });
  });
}