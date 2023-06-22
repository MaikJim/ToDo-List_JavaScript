const form = document.getElementById('formulario');
const tasksList = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const input = document.getElementById('input');
const fragment = document.createDocumentFragment();
let tasks = {};

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  taskPaint();
});

tasksList.addEventListener('click', (e) => {btnAction(e);});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  setTask(e);
});

const setTask = (e) => {
  if (input.value.trim() === '') {
    console.log('Esta vacio');
    return;
  }
  const task = {
    id: Date.now(),
    text: input.value,
    state: false,
  };
  tasks[task.id] = task;

  form.reset();
  input.focus();

  taskPaint();
};

const taskPaint= () => {

  localStorage.setItem('tasks', JSON.stringify(tasks))

  if(Object.values(tasks).length === 0){
    tasksList.innerHTML = `
    <div id="lista-tareas" class="mt-2">
        <div class="alert alert-dark">Sin tareas pendientes 😍</div>
      </div>`
    return
  }

  tasksList.innerHTML = '';
  Object.values(tasks).forEach((task) => {
    const clone = template.cloneNode(true);
    clone.querySelector('p').textContent = task.text;

    if(task.state){
      clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
      clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt' )
      clone.querySelector('p').style.textDecoration = 'line-through'
    }


    clone.querySelectorAll('.fas')[0].dataset.id = task.id;
    fragment.appendChild(clone);
  });
  tasksList.appendChild(fragment);
};

const btnAction = e => {
  console.log(e.target.classList.contains('fa-check-circle'))
  if (e.target.classList.contains('fa-check-circle')) {
      tasks[e.target.dataset.id].state = true
      taskPaint()
  }

  if (e.target.classList.contains('fa-minus-circle')) {
      // console.log(e.target.dataset.id)
      delete tasks[e.target.dataset.id]
      taskPaint()
  }

  if (e.target.classList.contains('fa-undo-alt')) {
      tasks[e.target.dataset.id].state = false
      taskPaint()
  }

  e.stopPropagation()
}
