"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var constants_js_1 = require("./constants.js");
import {todo} from './constants.js'
var heading = document.querySelector('#top');
var space = document.querySelector('#space');
var noticeButton = document.querySelector('#noticeButton');
var ul = document.querySelector('ul');
var container = document.querySelector('#container');
var checkbox = document.querySelectorAll('.checkbox');
var deleteAll = document.querySelector('#deleteAll');
var clock = document.querySelector('#clock');
var toDoList = [];
var localStorage = window.localStorage;
if (localStorage.getItem(todo)) {
    toDoList = JSON.parse(localStorage.getItem(todo));
    createNewDoing();
}
// проверка ну пустую строку в графе
noticeButton.addEventListener('click', function () {
    var toDo = {
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
    var pr = "";
    toDoList.forEach(function (el, index) {
        pr += " \n      <li id = 'item".concat(index, "' class = 'li_item'> \n        <div class = 'checkTrash'>\n          <div class = 'checkText'> \n              <input type = 'checkbox' class = 'checkbox'  id = 'item").concat(index, "' ").concat(el.checkbox ? 'checked' : '', "> \n              <label for = 'item").concat(index, "' class = 'label'>").concat(el.doing, "</label> \n          </div> \n          <div>\n            <img src = 'free-icon-garbage-158725.png' class = 'trash'> \n          </div>\n        </div> \n        </li>");
        space.value = "";
        ul.innerHTML = pr;
    });
}
// сохранение состояния checkbox 
container.addEventListener('change', function (e) {
    var targetTag = e.target.getAttribute('id');
    toDoList.forEach(function (el, index) {
        if ('item' + toDoList.indexOf(el) == targetTag) {
            el.checkbox = !el.checkbox;
            localStorage.setItem(todo, JSON.stringify(toDoList));
        }
    });
});
// удаление блока
function deleteBlock() {
    var deleteButton = document.querySelectorAll('.trash');
    deleteButton.forEach(function (el) {
        el.addEventListener('click', function (e) {
            var liItemsAll = document.querySelectorAll('.li_item');
            var liItemIndex = Array.from(liItemsAll).indexOf(e.target);
            var liItem = e.target.closest('.li_item');
            if (liItem != undefined) {
                // const liItemIndex = liItemIndex.indexOf(e.target);
                if (liItemIndex !== undefined) {
                    // const indexToRemove = parseInt(liItemIndex);
                    toDoList.splice(liItemIndex, 1);
                    liItem.remove();
                    localStorage.setItem(todo, JSON.stringify(toDoList));
                }
            }
        });
    });
}
deleteBlock();
// создание кнопки "удалить все"
deleteAll.addEventListener('click', function (e) {
    var liItem = document.querySelectorAll('.li_item');
    liItem.forEach(function (el) {
        el.remove();
    });
    toDoList = [];
    localStorage.setItem(constants_js_1.todo, JSON.stringify(toDoList));
});
// создание часов
window.onload = function () {
    window.setInterval(function () {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var hoursTime = '';
        var minutesTime = '';
        var secondsTime = '';
        if (hours < 10) {
            hoursTime = '0' + hours;
        }
        if (minutes < 10) {
            minutesTime = '0' + minutes;
        }
        if (seconds < 10) {
            secondsTime = '0' + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        clock.innerText = time;
    }, 1000);
};
