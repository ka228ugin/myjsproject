let numofcurrenttasks = 0;
let content = '';
const getData = async (url) => {
    let responce = await fetch(url);
    if (!responce.ok) {
        throw new Error('Ошибка');
    }
     content = await responce.text();
    content = JSON.parse(content);
    numofcurrenttasks = content.length; // сохранили количество актуальных задач
    renewableurl("http://localhost:3000/items");
}

getData("http://localhost:3000/items"); //чтобы при обновлении страницы не слетало
let information = '';
let chbox = '';
let priority = '';
const applicantForm = document.getElementById('plus');
applicantForm.addEventListener('click', handleFormSubmit);
let input = '';
function handleFormSubmit(event) {
    // Просим форму не отправлять данные самостоятельно
    event.preventDefault();
    serialize();
    priority = selector(); 
    //console.log(priority);
    information = new Information(input,priority);
   // console.log(information);
    sendData("http://localhost:3000/items");
    makeblock();
    getData("http://localhost:3000/items",numofcurrenttasks);
}

function serialize() {
    input = document.querySelector('input');
    input = input.value;
    //console.log(input); //отслеживание, что input сохраняется
}

function Information(data,priority) { //конструктор объектов
    this.data = data;
    this.priority = priority;
}

const sendData = async (url) => { //отправка на сервер
    const responce = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
            body : JSON.stringify(information),
    });
   // console.log(data)
    if (!responce.ok){
            throw new Error(`Ошибка статус ${responce.status}`);
    }
}

function makeblock() { //Создает блоки
    let block = document.createElement('div');
    let main = document.getElementById('main');
    block.className = 'task';
    main.appendChild(block);
    let text = document.createElement('span');
    text.className = 'text';
    text.innerHTML = information.data;
    block.appendChild(text); 
    let prior = document.createElement('div');
    block.appendChild(prior);
    prior.className = 'prior';
    prior.innerHTML = information.priority;
}

function selector() { // Возращает значение приоритета выбранного
   let vazhnost = document.getElementById('priority');
    vazhnost = vazhnost.options[vazhnost.selectedIndex].text;
    return vazhnost;
}

function renewableurl (url,num) { //создание блоков при обновлении страницы
    for (let i = 0; i<num; i++) {
      information = new Information(content[i].data,content[i].priority);
      makeblockupdate(information)
    }
}

function makeblockupdate(information) { //Создает блоки при обновлении
    let block = document.createElement('div');
    let main = document.getElementById('main');
    block.className = 'task';
    main.appendChild(block);
    let text = document.createElement('span');
    text.className = 'text';
    text.innerHTML = information.data;
    block.appendChild(text); 
    let prior = document.createElement('div');
    block.appendChild(prior);
    prior.className = 'prior';
    prior.innerHTML = information.priority;
}