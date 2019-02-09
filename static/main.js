/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const display = document.querySelector('#display');
const todoForm = document.querySelector('#todoForm');
const todoUserInput = document.querySelector('#todoUserInput');

const resetTodosInput = () => {
  todoUserInput.value = '';
};
const buildIDS = todo => {
  return {
    editID: `edit_${todo._id}`,
    deleteID: `delete_${todo._id}`,
    todoID: `todo_${todo._id}`
  };
};

const buildTemplate = (todo, ids) => {
  return `<li id="${ids.listItemID}">
              <div class="grid">
                <div class="grid-equal" id="${ids.todoID}>${todo.todo}</div>
                <div class="grid-equal"></div>
                <div class="grid-equal">
                  <button type="button" class="btn edit" id="${ids.editID}">Edit</button>
                  <button type="button" class="btn delete" id="${ids.deleteID}">Delete</button>
                </div>
              </div>
           </li>`;
};

const displayTodos = data => {
  data.forEach(todo => {
    const ids = buildIDS(todo);
    display.append(buildTemplate(todo, ids));
    // editTodo(todo, ids.todoId, ids.editId);
    // deleteTodo(todo, ids.listItemID, ids.deleteID);
  });
};

const getTodos = () => {
  fetch('/getTodos', { method: 'get' })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      displayTodos(data);
    });
};

getTodos();
