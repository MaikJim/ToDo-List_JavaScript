const formulario = document.getElementById('formulario');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const input = document.getElementById('input');
const fragment = document.createDocumentFragment();
let tareas = {};

document.addEventListener('DOMContentLoaded', () => {
  pintarTareas();
});

listaTarea.addEventListener('click', (e) => {
  btnAccion(e);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  setTarea();
});

const setTarea = (e) => {
  if (input.value.trim() === '') {
    console.log('Esta vacio');
    return;
  }
  const tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false,
  };
  tareas[tarea.id] = tarea;

  formulario.reset();
  input.focus();

  pintarTareas();
};

const pintarTareas = () => {
  listaTarea.innerHTML = '';
  Object.values(tareas).forEach((tarea) => {
    const clone = template.cloneNode(true);
    clone.querySelector('p').textContent = tarea.texto;
    clone.querySelectorAll('.fas')[0].dataset.id = tarea.id;
    fragment.appendChild(clone);
  });
  listaTarea.appendChild(fragment);
};

const btnAccion = (e) => {
  if (e.target.classList.contains('fa-check-circle')) {
    console.log(e.target.dataset.id);
    tareas[e.target.dataset.id].estado = true;
    pintarTareas();
  }

  if (e.target.classList.contains('fa-minus-circle')) {
    delete tareas[e.target.dataset.id];
    pintarTareas();
    console.log(tareas);
  }
  e.stopPropagation();
};
