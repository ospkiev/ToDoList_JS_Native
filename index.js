'use strict'

let form = document.querySelector('.form');
let inputTitle = document.querySelector('.inputTitle');
let inputTask = document.querySelector('.inputTask');
let button = document.querySelector('.button');
let list = document.querySelector('.list');
let deleteItem = document.createElement('span');
deleteItem.textContent = 'delete';
// let editItem = document.createElement('span');
// editItem.textContent = 'edit';



function addTask(e) {
    e.preventDefault();

    let li = document.createElement('li');
    let time = document.createElement('p');
    let title = document.createElement('h3');
    let task = document.createElement('p');


    list.append(li);
    li.append(title);
    li.append(task);
    li.append(time);

    let now = new Date().getTime();
    let date = new Date(now);
    time.textContent = date.toString('');

    title.textContent = inputTitle.value;
    task.textContent = inputTask.value;

    let taskItem = {
        id: date,
        task: inputTask.value,
        title: inputTitle.value,
    }

    let itemList = JSON.parse(localStorage.getItem('taskItem')) || [];
    itemList.push(taskItem);
    localStorage.setItem('taskItem', JSON.stringify(itemList));

    inputTitle.value = '';
    inputTask.value = '';
}

// function deleteItemFromLS(e) {
//     let id = e.target;
//     console.log(id);
// }

function getListTask() {
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    console.log(result);
    result.map(el => {
        let li = document.createElement('li');
        let time = document.createElement('p');
        let title = document.createElement('h3');
        let task = document.createElement('p');

        list.append(li);
        li.append(title);
        li.append(task);
        li.append(time);

        title.textContent = el.title;
        task.textContent = el.task;
        time.textContent = el.id;
    })
}


form.addEventListener('submit', addTask);
// window.addEventListener('click', deleteItemFromLS);
window.addEventListener('DOMContentLoaded', getListTask);
