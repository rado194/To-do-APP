//--------- Variables ----------
var clearList = document.getElementById("ClearList");
var todoInput = document.getElementById("input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var filterOption = document.querySelector(".filter-todo")


//------ Event listeners -------
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", todoCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);
clearList.addEventListener("click", clearTodos);

//-------- Functions ---------
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Create Todo div
    listItem(todoInput.value);
    //Clear Todo Input Value
    todoInput.value = "";
}

function todoCheck(e) {
    var item = e.target;
    console.log(e);
    //DELETE TODO
    if (item.classList[0] === "delete-btn") {
        var todo = item.parentElement;
        //ANIMATION
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
        var todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//FILTER TODOS 
function filterTodo(e) {
    var todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check if there are things in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //Check if there are things in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = ["Rado", "Max"];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todos);
    todos.forEach(listItem);
}

function listItem(todo) {
    //Create Todo div
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create li
    var newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK COMPLETED BUTTON
    var completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class = 'fas fa-check'></i>";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Delete BUTTON
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //APPEND TO OL LIST
    todoList.appendChild(todoDiv);
};

function removeLocalTodos(todo) {
    //Check if there are things in there
    let todos = [];
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    var todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function clearTodos() {
    todoList.innerHTML = "";
    localStorage.removeItem("todos");
}