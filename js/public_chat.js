
  
     	    var socket=io.connect('http://127.0.0.1:3000/');
      var $messageFormArea=$('#messageFormArea');
      var $messageForm=$('#messageForm');
      var $message=$('#message');
      var $chat=$('#chat');
      var $users=$('#chat-list');
      var $userFormArea=$('#userFormArea');
      var $username=$('#username');
      var $userForm=$('#userForm');
      var currentuser; 
         var snd = new Audio("audio/chat_public.wav"); 
      


      $messageForm.submit(function (e) {
      	e.preventDefault();
        // buffers automatically when created
        snd.play();
      	socket.emit('send message',$message.val())
      	$message.val('');

      });

      $userForm.submit(function (e) {
        
        currentuser=$username.val();
        $('#hidden').val(currentuser);
      	e.preventDefault();
      	socket.emit('new user',$username.val(),function(data){
           
            if (data) {
             $userFormArea.hide();
             $messageFormArea.show();
            }

      	});
      	$username.val('');

      });

      socket.on('new message',function(data){
        
      	$chat.append('<div class="well"><strong>'+data.user+' : </stong>'+data.msg+'</div>');
      });


      socket.on('get users',function(data){   
      	var html='';
       
      	for (var i = 0; i < data.length; i++) {
          if (currentuser!==data[i]) {
             //html+='<li class="list-group-item"  ><a href="javascript:register_popup(\''+data[i]+'\', \''+data[i]+'\');"> '+data[i]+'</a></item>'
              html+='<tr><td><a href="javascript:register_popup(\''+data[i]+'\', \''+data[i]+'\');" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-user"></span></a></td><td>'+data[i]+'</td><td><i class="fa fa-camera" aria-hidden="true"></i></td></tr>'  
            //html+='<tr><td ><a href="javascript:register_popup(\''+data[i]+'\', \''+data[i]+'\');"  class="btn btn-default btn-xs"><span class="glyphicon glyphicon-user"></span></a></td><td>'+data[i]+'</td><td><i class="fa fa-camera" aria-hidden="true"></i></td></tr>'

          };
      		
      	}
      	$users.html(html);
      });

 

   

     


   

