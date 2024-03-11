import {toDo} from './interface.ts'
import {todo} from './constants.ts'

const heading = document.querySelector('#top');
const space = document.querySelector('#space') as HTMLInputElement;
const noticeButton = document.querySelector('#noticeButton') as HTMLButtonElement;
const ul = document.querySelector('ul') as HTMLElement;
const container = document.querySelector('#container') as HTMLElement;
const checkbox = document.querySelectorAll('.checkbox');
const deleteAll = document.querySelector('#deleteAll') as HTMLButtonElement;
const clock = document.querySelector('#clock');
let toDoList: toDo[] = [];
interface LocalStorage {
  setItem(key: string, value: string): void;
  getItem(key: string): string;
}
const localStorage = window.localStorage as LocalStorage;

if (localStorage.getItem(todo)) {
    toDoList = JSON.parse(localStorage.getItem(todo));
    createNewDoing();
} 

// проверка ну пустую строку в графе
noticeButton.addEventListener('click', function () {
    let toDo = {
      doing: space.value,
      checkbox: false,
      delete: false
    };
    if (toDo.doing.length > 0) {
      toDoList.push(toDo);
      createNewDoing();
      deleteBlock();
    }
    else {
      alert('Ваша строка не должна быть пустая. Заполните ее, пожалуйста!');
    }
  localStorage.setItem(todo, JSON.stringify(toDoList));
});

// новая строка списка
function createNewDoing() { 
  let pr = ""; 
  toDoList.forEach((el, index) => { 
    pr += ` 
      <li id = 'item${index}' class = 'li_item'> 
        <div class = 'checkTrash'>
          <div class = 'checkText'> 
              <input type = 'checkbox' class = 'checkbox'  id = 'item${index}' ${el.checkbox ? 'checked' : ''}> 
              <label for = 'item${index}' class = 'label'>${el.doing}</label> 
          </div> 
          <div>
            <img src = 'free-icon-garbage-158725.png' class = 'trash'> 
          </div>
        </div> 
        </li>`; 
    space.value = ""; 
    ul.innerHTML = pr; 
  }); 
}

// сохранение состояния checkbox 
container.addEventListener('change', function (e: Event) {
let targetTag = (e.target as HTMLElement).getAttribute('id');
toDoList.forEach((el, index) => {
  if ('item' + toDoList.indexOf(el) == targetTag) {
    el.checkbox = !el.checkbox;
    localStorage.setItem(todo, JSON.stringify(toDoList));
  }
 })
})

// удаление блока
function deleteBlock() {
  const deleteButton = document.querySelectorAll('.trash');
  deleteButton.forEach(el => {
    el.addEventListener('click', function (e: Event) {
    const liItem: HTMLElement | null = (e.target as HTMLElement).closest('.li_item');
      if (liItem != undefined) {
        const liItemIndex = liItem.dataset.index;
        if (liItemIndex !== undefined) {
          const indexToRemove = parseInt(liItemIndex);
          toDoList.splice(indexToRemove, 1);
          liItem.remove()
        localStorage.setItem('todo', JSON.stringify(toDoList))
        }
      }
    })
  })
}
deleteBlock();

// создание кнопки "удалить все"
deleteAll.addEventListener('click', function (e) {
  let liItem = document.querySelectorAll('.li_item');
  liItem.forEach(el => {
    el.remove();
  })
  toDoList = [];
  localStorage.setItem(todo, JSON.stringify(toDoList));
})

// создание часов
window.onload = function() {
  window.setInterval(function() {
    let date = new Date()
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    let time = hours +':'+ minutes + ':' + seconds;
    clock.innerText = time;
  }, 1000);
}