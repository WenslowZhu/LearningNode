const socket = io.connect('http://localhost:3000');

const sendButton = window.document.getElementById('send') as HTMLButtonElement;
const messageContainer = window.document.getElementById('message') as HTMLDivElement;
const input = window.document.getElementById('name') as HTMLInputElement;
const textarea = window.document.getElementById('inputMessage') as HTMLTextAreaElement;

function addMessage(message) {
    console.log(messageContainer);
    messageContainer.innerHTML = `<h4> ${message.name} </h4> <p> ${message.message} </p>` + messageContainer.innerHTML;
}

sendButton.addEventListener('click', () => {
    // addMessage({name: 'Tim', message: 'Hello'});
    // getMessages();
    const message = {name: input.value, message: textarea.value};
    postMessage(message)
});

function getMessages() {
    // $.get('http://localhost:3000/messages', (data) => {
    //     console.log(data);
    //     data.forEach(addMessage);
    // });
    //请求主页数据
    socket.emit('getMessage');
}

function postMessage(message) {
    // console.log(message);
    // $.post('http://localhost:3000/messages', message);
    socket.emit('postMessage', message, (err) => {
        console.log(err);
    });
}

socket.on('message', (data) => {
    addMessage(data);
});

socket.on('messagesArray', (data) => {
    console.log(data);
    data.forEach(addMessage);
});

getMessages();