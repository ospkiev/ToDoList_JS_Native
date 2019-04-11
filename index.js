'use strict'

const form = document.querySelector('.form');
const buttonEdit = document.querySelector('.button_edit');
const inputTitle = document.querySelector('.inputTitle');
const inputTask = document.querySelector('.inputTask');
const button = document.querySelector('.button');
const btnSortByTime = document.querySelector('.btnSortByTime');
const btnSortByTitle = document.querySelector('.btnSortByTitle');
const list = document.querySelector('.list');

let arrayTask = [];

function card(timeParam, titleParam, taskParam, deleteParam, editParam, editedParam) {

    let li = document.createElement('li');
    let title = document.createElement('h2');
    let task = document.createElement('h3');
    let time = document.createElement('p');
    let deleteItem = document.createElement('button');
    deleteItem.setAttribute('data-id', timeParam);
    let editItem = document.createElement('button');
    editItem.setAttribute('data-key', +timeParam + 10);
    let edited = document.createElement('p');
    edited.style.color = 'red';

    list.append(li);
    li.append(title);
    li.append(task);
    li.append(time);
    li.append(edited);
    li.append(editItem);
    li.append(deleteItem);
    time.textContent = `${new Date(timeParam).toLocaleDateString("en-US")} ${new Date(timeParam).toLocaleTimeString("en-US")}`;
    title.textContent = titleParam;
    task.textContent = taskParam;
    deleteItem.textContent = deleteParam;
    editItem.textContent = editParam;
    edited.textContent = editedParam;
}

function addTask() {
    let date = Date.now();

    const taskItem = {
        title: inputTitle.value,
        task: inputTask.value,
        time: date,
        delete: 'delete',
        edit: 'edit',
        key: +date + 10,
        edited: '',
    }

    let itemList = JSON.parse(localStorage.getItem('taskItem')) || [];
    itemList.push(taskItem);
    localStorage.setItem('taskItem', JSON.stringify(itemList));

    inputTitle.value = '';
    inputTask.value = '';
}

function sortByTime() {
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    arrayTask = result;
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
    // e.preventDefault();
    let flag = localStorage.getItem('flag');
    function compare(a, b) {
        if (a.title < b.title) {
            return 1;
        } else {
            return -1;
        }
    }

    if (flag === 'true') {
        let sorted = arrayTask.sort(compare);
        localStorage.setItem('taskItem', JSON.stringify(sorted));
        localStorage.setItem('flag', false);
    } else {
        let sorted = arrayTask.sort(compare).reverse();
        localStorage.setItem('taskItem', JSON.stringify(sorted));
        localStorage.setItem('flag', true);
    }
    location.reload();
}

function deleteFunc(e) {
    // e.preventDefault();
    let id = e.target.dataset.id;
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    let deletedItem = result.filter(el => el.time !== +id);
    localStorage.setItem('taskItem', JSON.stringify(deletedItem));
    location.reload();
}

function editDetectItem(e, callback) {
    // e.preventDefault();
    let key = e.target.dataset.key;
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    let item = result.find(el => el.key === +key);
    inputTitle.value = item.title;
    inputTask.value = item.task;
    localStorage.setItem('editKey', JSON.stringify(item.key));

    // localStorage.setItem('taskItem', JSON.stringify(item));
    // console.log(item);
}

function getListTask() {
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    arrayTask = result;
    renderArr();
}

function renderArr() {
    arrayTask.map(el =>
        card(el.time, el.title, el.task, el.delete, el.edit, el.edited)
    );
}

function handleFunc(e) {
    if (e.target.dataset.key !== undefined) {
        editDetectItem(e);
    } else if (e.target.dataset.id !== undefined) {
        deleteFunc(e);
    }
}

function editFunc(e) {
    e.preventDefault();
    let editKey = JSON.parse(localStorage.getItem('editKey'));
    let result = JSON.parse(localStorage.getItem('taskItem')) || [];
    console.log(result);
    let item = result.find(el => el.key === +editKey);
    item.title = inputTitle.value;
    item.task = inputTask.value;
    item.edited = 'edited';
    localStorage.setItem('taskItem', JSON.stringify(result));
    location.reload();
}

window.addEventListener('DOMContentLoaded', getListTask);
form.addEventListener('submit', addTask);
btnSortByTime.addEventListener('click', sortByTime);
btnSortByTitle.addEventListener('click', sortByTitle);
list.addEventListener('click', handleFunc);
buttonEdit.addEventListener('click', editFunc);

