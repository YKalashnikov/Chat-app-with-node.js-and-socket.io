$(function(){
 var socket = io.connect('http://localhost:3000')

 var message = $("#message")
 var username = $("#username")
 var send_message = $("#send_message")
 var send_username = $("#send_username")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")

 send_message.click(function(){
     socket.emit('new_message', {message : message.val()})
 })

 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
 })

 send_username.click(function(){
     socket.emit('change_username', {username : username.val()})
 })

 message.bind("keypress", () => {
     socket.emit('typing')
 })

 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " печатает сообщение..." + "</i></p>")
 })
});

