const todos = [];
const RENDER_EVENT = 'render-todo';

// Event Listener saat tombol Submit pada form ditekan
document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });
});

document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);
});

// Event Handler yang akan dijalankan saat tombol Submit pada form ditekan
function addTodo() {
  const textTodo = document.getElementById('inputToDo').value;
  const timestamp = document.getElementById('inputDate').value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

// Fungsi Helper untuk digunakan dalam Event Handler
function generateId() {
  return +new Date();
}
 
function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted
  }
}