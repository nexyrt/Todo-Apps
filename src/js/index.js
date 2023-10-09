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
  const uncompletedTODOList = document.getElementById('todos');
  uncompletedTODOList.innerHTML = '';

  const completedTODOList = document.getElementById('completed-todos');
  completedTODOList.innerHTML = '';

  for (const todoItem of todos) {
    const todoElement = showTodo(todoItem);

    if (todoItem.isCompleted == false) {
      uncompletedTODOList.append(todoElement);
    } else {
      completedTODOList.append(todoElement);
    }
  }
});

// Event Handler yang akan dijalankan saat tombol Submit pada form ditekan
const addTodo = () => {
  const textTodo = document.getElementById('inputToDo').value;
  const timestamp = document.getElementById('inputDate').value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

const showTodo = (todoObject) => {
  // Data
  const textTitle = document.createElement('h2');
  textTitle.innerText = todoObject.task;

  const textTimestamp = document.createElement('p');
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement('div');
  textContainer.append(textTitle, textTimestamp);
  // END OF Data

  const container = document.createElement('div');
  container.classList.add('flex', 'p-7', 'rounded-xl', 'bg-slate-200', 'shadow-xl', 'justify-between');
  container.append(textContainer);
  container.setAttribute('id', `todo-${todoObject.id}`);

  // Condition For Button
  if (todoObject.isCompleted) {
    const containerButton = document.createElement('div');

    const undoButton = document.createElement('button');
    undoButton.classList.add('w-10', 'h-10', 'bg-[url(../../assets/undo-ouline.svg)]');

    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('w-10', 'h-10', 'bg-[url(../../assets/trash-fill.svg)]', 'hover:bg-[url(../../assets/trash-outline.svg)]', 'transform', 'transition-all', 'duration-300');

    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(todoObject.id);
    });

    containerButton.append(undoButton, trashButton);
    container.append(containerButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('w-10', 'h-10', 'bg-[url(../../assets/check-outline.svg)]', 'hover:bg-[url(../../assets/check-solid.svg)]', 'transform', 'transition-all', 'duration-300');

    checkButton.addEventListener('click', function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
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

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  let value = 0;

  if (todoTarget == null) return;

  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      break
    }
    value+=1;
  }

  todos[value].isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}