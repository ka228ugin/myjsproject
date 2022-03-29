//https://www.youtube.com/watch?v=uM3RycN_k3c
const getResource = async (url) => {
        const responce = await fetch(url);
        console.log(responce);
        if (!responce.ok){
                throw new Error(`Ошибка статус ${responce.status}`);
        }
        return await responce.json();
};
const sendData = async (url, data) {
        const responce = await fetch(url, {
                method: "POST",
                body : JSON.stringify(data),
        })
        if (!responce.ok){
                throw new Error(`Ошибка статус ${responce.status}`);
        }
        return await responce.json();   
}
let message = {
        name: 'Математика'
    }
     message = JSON.stringify(message);
   
     //
     function handleFormSubmit(event) {
        // Просим форму не отправлять данные самостоятельно
        event.preventDefault();
        serialize();
        let information = new Info(input);
        sendData("http://localhost:3000/items");}
    const applicantForm = document.getElementById('plus');
    applicantForm.addEventListener('click', handleFormSubmit);
    let input = '';
    function serialize() {
        input = document.querySelector('input');
        input = input.value;
        console.log(input); //отслеживание, что input сохраняется
        console.log(typeof(input));
    }
    function Info(data) {
        this.data = data;
        id = '20';
    }
    const sendData = async (url) => {
        const responce = await fetch(url, {
                method: "POST",
                body : JSON.stringify(information),
        });
       // console.log(data)
        if (!responce.ok){
                throw new Error(`Ошибка статус ${responce.status}`);
        }
    }
    
    
    
