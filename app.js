const formulario = document.getElementById('formulario');
const listaTarea = document.getElementById('lista-tarea');
const template = document.getElementById('template').content;
const input = document.getElementById('input');
const fragment = document.createDocumentFragment();
let tareas = {}

formulario.addEventListener('submit', e => {
  e.preventDefault();
  setTarea();
})

const setTarea = e => {
  if(input.value.trim() === ''){
    console.log('Esta vacio')
    return
  }
}