const applicantForm = document.getElementById('plus');
applicantForm.addEventListener('click', handleFormSubmit); //вытаскиваем плюсик со страницы и добавляем слушателя на событие 'клик'
const getData = async (url) => {
    let responce = await fetch(url);
    if (!responce.ok) {
        throw new Error('Ошибка');
    }
    let content = await responce.text();
    content = await JSON.parse(content);
    let numofcurrenttasks = content.length; //сохранили количество актуальных задач
    console.log(numofcurrenttasks);
    for (let i = 0; i< numofcurrenttasks; i++) {
         let information = new Information(content[i].data,content[i].priority);
         makeblock(information.data,information.priority);
    }
}



getData("http://localhost:3000/items"); 

function serialize() { //Возращает информацию поля 'input'
    input = document.querySelector('input');
    input = input.value;
    return input;
}

function selector() { // Возращает значение приоритета выбранного
    let priority = document.getElementById('priority');
     priority = priority.options[priority.selectedIndex].text;
     return priority;
 }
 
 function Information(data,priority) { //конструктор объектов
    this.data = data;
    this.priority = priority;
}

const sendData = async (url,information) => { //отправка на сервер
    const responce = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
            body : JSON.stringify(information),
    });
    if (!responce.ok){
            throw new Error(`Ошибка статус ${responce.status}`);
    }
}

async function makeblock(information,priority) { //Создает блоки
    let block = document.createElement('div');
    let main = document.getElementById('main');
    let prior = document.createElement('div');
    block.className = 'task';
    main.appendChild(block);
    block.appendChild(prior);
    prior.className = 'prior';
    prior.innerHTML = priority;
    let text = document.createElement('span');
    text.className = 'text';
    text.innerHTML = information;
    let tasktext = document.createElement('div');
    tasktext.className ='tasktext';
    block.appendChild(tasktext); 
    tasktext.appendChild(text);
    let trashbin = document.createElement("img");
    trashbin.src =  'http://cdn.onlinewebfonts.com/svg/img_329318.png';
    block.appendChild(trashbin);
    trashbin.className = 'trashbin';
    let responce = await fetch("http://localhost:3000/items");
    let content = await responce.text();
    content = await JSON.parse(content);
    var num = await content.length;
    console.log(num);
    trashbin.id = num;
    addAction(num);
}

function handleFormSubmit(event) {
    event.preventDefault(); //отменяем обновление страницы
    information = new Information(serialize(),selector());
    sendData("http://localhost:3000/items",information);
    makeblock(information.data,information.priority);
}

function addAction(id) {
    let bin = document.getElementById(String(id));
    bin.addEventListener('click',deletetask(id));
}
async function deletetask (id) {
    await fetch(`http://localhost:3000/items/${id}`), {
        method: 'DELETE',
    };

}

