/**
 * Created by wenslow on 2017/6/18.
 */


/**
 * 显示可以文本
 * @param message
 * @returns {*|jQuery}
 */
function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

/**
 * 显示系统创建的受信内容
 * @param message
 * @returns {jQuery}
 */
function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

/**
 * 处理原始的用户输入
 * @param chatApp
 * @param socket
 */
function processUserInput(chatApp, socket) {
    var message = $('#send-messages').val();
    var systemMessage;

    //如果用户输入的内容已斜杠(/)开头，将其作为聊天命令
    if (message.charAt(0) === '/'){
        systemMessage = chatApp.processCommand(message);
        if (systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }else{
        //非命令输入广播给其他用户
        chatApp.sendMessage($('#room').text(), message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('messages').prop('scrollHeight'));
    }
    $('#send-messages').val('');
}

var socket = io.connect();

$(document).ready(function () {
    var chatApp = new Chat(socket);

    //显示更名尝试的结果
    socket.on('nameResult', function (result) {
        var message;

        if (result.success){
            message = 'You are now known as ' + result.name + '.';
        }else{
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });

    //显示房间变更结果
    socket.on('joinResult', function (result) {
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room changed.'));
    })

    //显示接收到的消息
    socket.on('message', function (message) {
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    })

    //显示可用的房间列表
    socket.on('rooms', function (rooms) {
        $('#room-list').empty();

        for (var room in rooms){
            room = room.substring(1, room.length);
            if (room != ""){
                $('#room-list').append(divSystemContentElement(room));
            }
        }

        //点击房间名切换房间
        $('#room-list div').click(function () {
            chatApp.processCommand('/join' + $(this).text());
            $('#send-messages').focus();
        });

        //定期请求可用房间列表
        setInterval(function () {
            socket.emit('rooms');
        }, 1000);

        $('#send-messages').focus();

        //提交表单可以发送聊天消息
        $('#send-form').submit(function () {
            processUserInput(chatApp, socket);
            return false;
        })
    });
});
