const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("btn");
const removeButton = document.getElementById("btn-remove");
const todoList = document.getElementById("todoList");
const errorEl = document.getElementById("error");

let state = {
  todos: [],
  error: "",
};

function refresh() {
  fetch("http://localhost:4730/todos")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      state = data;
      render();
    })
    .catch(() => {
      state.error = "Sorry, we couldn't reach the backend";
      render();
    });
}

function render() {
  todoList.innerHTML = "";
  errorEl.innerHTML = "";

  if (state.error) {
    errorEl.textContent = state.error;

    const errBtn = document.createElement("button");
    errBtn.textContent = "Close";
    errBtn.style.marginLeft = "1rem";
    errorEl.append(errBtn);

    errBtn.addEventListener("click", () => {
      state.error = "";
      refresh();
      render();
    });
  }

  state.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.description;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    li.appendChild(checkbox);
    todoList.appendChild(li);

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
  })
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      state.error = "Sorry, we couldn't reach the backend";
      render();
    });
  refresh();
});

removeButton.addEventListener("click", () => {
  todoList.innerHTML = "";

  state
    .forEach((todo) => {
      if (todo.done) {
        fetch(`http://localhost:4730/todos/${todo.id}`, {
          method: "DELETE",
        });
      }
    })
    .catch(() => {
      state.error = "Sorry, we couldn't reach the backend";
      render();
    });
  refresh();
});

refresh();
