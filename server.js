var express = require('express');
const http = require('http');
const socketIo = require('socket.io');

var app = express();
const server = http.createServer(app);
const io = socketIo(server); // Attach socket.io to the server

var PORT = 3000;
console.log("server started");

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {

    res.render("chat.ejs");
});

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('chat message', (message) => {
      console.log("inside server.js socket chat message");
      io.emit('chat message', {user:message.user, msg: message.msg}); // Broadcast the message to everyone
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });