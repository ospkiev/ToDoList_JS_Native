'use strict'

let form = document.querySelector('.form');
let inputTitle = document.querySelector('.inputTitle');
let inputTask = document.querySelector('.inputTask');
let button = document.querySelector('.button');
let list = document.querySelector('.list');
let li = document.createElement('li');
let deleteItem = document.createElement('span');
deleteItem.textContent = 'delete';
let editItem = document.createElement('span');
editItem.textContent = 'edit';



function addTask(e) {
    e.preventDefault();

    let title = document.createElement('h3');
    let task = document.createElement('p');
    let time = document.createElement('p');
    title.textContent = inputTitle.value;
    task.textContent = inputTask.value;


    let now = new Date().getTime();
    let date = new Date(now);
    time.textContent = date.toString();

    list.appendChild(li);
    li.append(title);
    li.append(task);
    li.append(time);
    li.append(deleteItem);
    li.append(editItem);


    let taskItem = {
        id: date,
        task: inputTask.value,
        title: inputTitle.value,
        // delete: deleteItem,
    }

    let itemList = JSON.parse(localStorage.getItem('taskItem')) || [];
    itemList.push(taskItem);
    localStorage.setItem('taskItem', JSON.stringify(itemList));

    inputTitle.value = '';
    inputTask.value = '';
}

function deleteItemFromLS(e) {
    let id = e.target;
    console.log(id);
}

function getListTask() {
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    // li.append(deleteItem);
    console.log(result);
    result.map(el => {
        list.append(li);
        li.append(el.title);
        li.append(el.task);
        li.append(el.id);
        li.append(el.delete);
    })
}


form.addEventListener('submit', addTask);
window.addEventListener('click', deleteItemFromLS);
window.addEventListener('DOMContentLoaded', getListTask);
