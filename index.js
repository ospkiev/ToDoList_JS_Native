'use strict'

const form = document.querySelector('.form');
const inputTitle = document.querySelector('.inputTitle');
const inputTask = document.querySelector('.inputTask');
const button = document.querySelector('.button');
const btnSortByTime = document.querySelector('.btnSortByTime');
const btnSortByTitle = document.querySelector('.btnSortByTitle');
const list = document.querySelector('.list');
const now = new Date().getTime();
const date = new Date(now).toString('');

let arrayTask = [];

function card(timeParam, titleParam, taskParam, deleteParam, editParam) {
    let li = document.createElement('li');
    let title = document.createElement('h2');
    let task = document.createElement('h3');
    let time = document.createElement('p');
    let deleteItem = document.createElement('span');
    deleteItem.setAttribute('data-id', timeParam)
    let editItem = document.createElement('span');

    list.append(li);
    li.append(title);
    li.append(task);
    li.append(time);
    li.append(editItem);
    li.append(deleteItem);
    time.textContent = timeParam;
    title.textContent = titleParam;
    task.textContent = taskParam;
    deleteItem.textContent = deleteParam;
    editItem.textContent = editParam;
}

function addTask() {
    // let date = new Date().toString('');
    let date = Date.now();

    const taskItem = {
        title: inputTitle.value,
        task: inputTask.value,
        time: date,
        delete: 'delete',
        edit: 'edit',
    }

    let itemList = JSON.parse(localStorage.getItem('taskItem')) || [];
    itemList.push(taskItem);
    localStorage.setItem('taskItem', JSON.stringify(itemList));
    inputTitle.value = '';
    inputTask.value = '';
}

function sortByTime() {
    let sortedArr = arrayTask.sort((a, b) => (a.time > b.time) ? b.time - a.time : a.time - b.time);
    // if (b.time < a.time) {
    //     return b.time - a.time
    // } else {
    //     return a.time - b.time
    // }
    // );
    arrayTask = sortedArr;
    localStorage.setItem('taskItem', JSON.stringify(arrayTask));
    console.log(arrayTask);
    location.reload();
}

function sortByTitle(e) {
    e.preventDefault();
    let sortedArr = arrayTask.sort(function (a, b) {
        if (a.title > b.title) {
            return a.title - b.title;
        }
        else if (a.title < b.title) {
            return b.title - a.title;
        }
    }
    );
    arrayTask = sortedArr;
    localStorage.setItem('taskItem', JSON.stringify(arrayTask));
    console.log(arrayTask);
    // location.reload();
}

function deleteItem(e) {
    let id = e.target.dataset.id;
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    let deletedItem = result.filter(el => el.time !== +id);
    localStorage.setItem('taskItem', JSON.stringify(deletedItem));
    location.reload();
}

function getListTask() {
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    arrayTask = result;
    // console.log(result);
    renderArr();
}

function renderArr() {
    arrayTask.map(el =>
        card(el.time, el.title, el.task, el.delete, el.edit)
    );
    // console.log(arrayTask);
}


form.addEventListener('submit', addTask);
list.addEventListener('click', deleteItem);
btnSortByTime.addEventListener('click', sortByTime);
btnSortByTitle.addEventListener('click', sortByTitle)
// window.addEventListener('click', editItem);
window.addEventListener('DOMContentLoaded', getListTask);

