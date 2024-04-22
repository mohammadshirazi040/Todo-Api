const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("btn");
const removeButton = document.getElementById("btn-remove");
const todoList = document.getElementById("todoList");

let state = null;

function refresh() {
  fetch("http://localhost:4730/todos")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      state = data;
      render();
    });
}

function render() {
  state.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.description;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    li.appendChild(checkbox);
    todoList.appendChild(li);
    console.log(state);

    checkbox.addEventListener("click", (e) => {
      if (e.target.checked) {
        todo.done = true;
      }
    });
  });
}

addButton.addEventListener("click", () => {
  todoList.innerHTML = "";

  const newTodo = {
    description: todoInput.value,
    done: false,
  };

  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  }).then((res) => {
    return res.json();
  });
  refresh();
});

removeButton.addEventListener("click", () => {
  todoList.innerHTML = "";

  state.forEach((todo) => {
    if (todo.done) {
      fetch(`http://localhost:4730/todos/${todo.id}`, {
        method: "DELETE",
      });
    }
  });
  refresh();
});

refresh();
