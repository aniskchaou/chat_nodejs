var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
var mongo=require('mongodb').MongoClient;
users=[];
connections=[];

server.listen(process.env.PORT||3000);

console.log('server is running ...');

app.get('/',function  (req,res) {
 res.sendFile(__dirname+'/index.html');
});


io.sockets.on('connection',function(socket){

   socket.on('stream',function (image) {
    
    socket.broadcast.emit('stream',image);
  });



    socket.on('drawClick', function(data) {
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });




connections.push(socket);
console.log('connected : %s sockets',connections.length);



socket.on('disconnect',function(data){
	if (!socket.username) return;
	users.splice(users.indexOf(socket),1);
connections.splice(connections.indexOf(socket),1);
updateusers();
console.log('disconnected :%s connected',connections.length);



});



   
//mongo.connect('mongodb://127.0.0.1/chat',function(err,db){
 // if (err) throw err;

    /*   var user=data.user;
       var    message=data.message;
       var  to=data.to;         
         console.log(data);
    io.sockets.emit('newprivatemessage',{msg:message,user:user,to:to});
   */


   // var col=db.collection('messages');
       socket.on('input',function(data){
              
        /*      var name=data.user;
                  message=data.message;
             if (name==="" ||message==="") {
                  console.log('incorrect');

             }else
             {
                 col.insert({name :name,message:message },function() {
                
                console.log('inserted');
              });
             }
           });
   col.find().limit(1).toArray(function(err,res) {
    io.sockets.emit('newprivatemessage',res);
   })
   */
     var user=data.user;
       var    message=data.message;
       var  to=data.to;         
         console.log(data);
    io.sockets.emit('newprivatemessage',{msg:message,user:user,to:to});

});     









socket.on('send message',function(data){
      console.log(data);
    io.sockets.emit('new message',{msg:data,user:socket.username});

});


socket.on('new user',function(data,callback){
      callback(true);
    socket.username=data;
    users.push(socket.username);
    updateusers();

});




function updateusers () {
	io.sockets.emit('get users',users);
}
})