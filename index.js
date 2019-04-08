'use strict'

const form = document.querySelector('.form');
const inputTitle = document.querySelector('.inputTitle');
const inputTask = document.querySelector('.inputTask');
const button = document.querySelector('.button');
const btnSortByTime = document.querySelector('.btnSortByTime');
const btnSortByTitle = document.querySelector('.btnSortByTitle');
const list = document.querySelector('.list');
// const now = new Date().getTime();
// const date = new Date(now).toString('');
let arrayTask = [];
let flag = {
    flag: true,
}

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
    time.textContent = `${new Date(timeParam).toLocaleDateString("en-US")} ${new Date(timeParam).toLocaleTimeString("en-US")}`;
    title.textContent = titleParam;
    task.textContent = taskParam;
    deleteItem.textContent = deleteParam;
    editItem.textContent = editParam;
}

function addTask() {
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
    arrayTask.push(taskItem);
    inputTitle.value = '';
    inputTask.value = '';
}

function sortByTime() {
    arrayTask.sort((a, b) => (a.time > b.time) ? b.time - a.time : a.time - b.time);
    // if (b.time < a.time) {
    //     return b.time - a.time
    // } else {
    //     return a.time - b.time
    // }
    // );
    localStorage.setItem('taskItem', JSON.stringify(arrayTask));
    location.reload();
}

function sortByTitle() {

    function compare(a, b) {
        if (a.title > b.title) {
            return 1;
        } else {
            return -1;
        }
    }
    if (flag.flag === true) {
        let sorted = arrayTask.sort(compare);
        localStorage.setItem('taskItem', JSON.stringify(sorted));
        // arrayTask = sorted;
        flag.flag = false;
    } else {
        let sorted = arrayTask.sort(compare).reverse();
        localStorage.setItem('taskItem', JSON.stringify(sorted));
        // arrayTask = sorted;
        flag.flag = true;
    }
    // console.log(arrayTask);
    setTimeout(() => location.reload(), 1000);
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
    renderArr();
}

function renderArr() {
    // location.reload();
    arrayTask.map(el =>
        card(el.time, el.title, el.task, el.delete, el.edit)
    );
}

window.addEventListener('DOMContentLoaded', getListTask);
form.addEventListener('submit', addTask);
list.addEventListener('click', deleteItem);
btnSortByTime.addEventListener('click', sortByTime);
btnSortByTitle.addEventListener('click', sortByTitle);
// window.addEventListener('click', editItem);

