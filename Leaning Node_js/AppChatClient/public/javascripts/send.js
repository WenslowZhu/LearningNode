var socket = io.connect('http://localhost:3000');
var sendButton = window.document.getElementById('send');
var messageContainer = window.document.getElementById('message');
var input = window.document.getElementById('name');
var textarea = window.document.getElementById('inputMessage');
function addMessage(message) {
    console.log(messageContainer);
    messageContainer.innerHTML = "<h4> " + message.name + " </h4> <p> " + message.message + " </p>" + messageContainer.innerHTML;
}
sendButton.addEventListener('click', function () {
    // addMessage({name: 'Tim', message: 'Hello'});
    // getMessages();
    var message = { name: input.value, message: textarea.value };
    postMessage(message);
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
    socket.emit('postMessage', message, function (err) {
        console.log(err);
    });
}
socket.on('message', function (data) {
    addMessage(data);
});
socket.on('messagesArray', function (data) {
    console.log(data);
    data.forEach(addMessage);
});
getMessages();
