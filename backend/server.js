var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/test', function(req, res){
  res.send("<h1>success</h1>");
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('coordinates', function(nb){
    console.log('number: ' + nb);
    // io.emit('input number', nb);
  })
});

http.listen(8000, function() {
  console.log('listening on *:8000');
});
