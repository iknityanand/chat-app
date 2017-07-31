var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/', function(req,res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
  console.log('á user connected');

  var clientCount = io.sockets.clients();

  socket.on('user online', function(name, fn){
    var co=clientCount.server.eio.clientsCount;
    fn(co);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('á user disconnected');
  });
})

http.listen(3000, function(){
  console.log('listening on port *:3000');
});
