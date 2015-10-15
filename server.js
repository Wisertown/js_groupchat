var express = require('express');
var app = express();
//static folder
app.use(express.static(__dirname+'/static'));

var server = app.listen(8008);

var io = require('socket.io').listen(server);
//socket stuff goes down here
var users =[];

io.sockets.on('connection', function(socket){
	console.log("socket connected with id:", socket.id);

	socket.on('newUser', function(data){
		console.log(data);
		users.push({ name: data.name, socket_id: socket.id});
		io.emit('updateUserList', users);

	});

	socket.on('newMessage', function(data){
		for(index in users){
			if(users[index].socket_id == socket.id){
				users[index].name
				data.message
				io.emit('addMessage', {
					message: "<p>"+users[index].name + ": "+ data.message+"</p>"
										
				})
				break;
			}
		}	
	})

	socket.on('disconnect', function(){
		console.log("Socket disconnected with id: ", socket.id);
		for(index in users){
			if(users[index].socket_id == socket.id){
				users.splice(index, 1);
				io.emit('updateUserList', users);
				break;
			}
		}//This is just a test to see how we push things 
		// on github
	})

})
	//-

