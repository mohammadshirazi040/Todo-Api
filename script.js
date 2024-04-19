const todoList = document.getElementById("todoList");
const form = document.getElementById("addTodoForm");
const todoInput = document.getElementById("todo-input");

let state = {
  todos: [],
};

function render() {
  todoList.innerHTML = "";

  state.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.description;

    todoList.append(li);
  });
}
render();

function refresh() {
  fetch("http://localhost:4730/todos")
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((data) => {
      console.log("data", data);

      state.todos = data;
      render();
    });
}

refresh();
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = todoInput.value;

  const newTodo = {
    description: description,
    done: false,
  };

  fetch("http://localhost:4730/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((data) => {
      console.log("data", data);

      // state.todos = data;
      // render();
      refresh();
    });
});
