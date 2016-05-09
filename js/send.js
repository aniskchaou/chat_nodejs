      

         
  function send() {
        var writed;
        var tab=new Array();
        var tab2=new Array();
          var to=$(event.target).attr('class');
                            var message=event.target.value;
                            var currentuser =$(event.target).attr('user');
       if(event.which ===13 && event.shiftKey === false)
                        { 
                            socket.emit('input',{to:to, message:message ,user:currentuser})
                           $("#chat_"+to).append('<strong style="color:black;">'+currentuser+' : </stong>'+message+'</br>');
                           var v='<strong>'+currentuser+' : </stong>'+message+'</br>';
                           tab.push(v);
                           $(event.target).val('');
                          // alert("user:"+currentuser+":"+message+"to"+to);
                        }
        
         var snd = new Audio("audio/audio.wav"); // buffers automatically when created

          socket.on('newprivatemessage',function(data){
               
                if(data.to==currentuser)
                {
                  snd.play();
                $("#chat_"+data.user).html('<strong style="color:black;" id="msg">'+data.user+' : </stong>'+data.msg+'</br>');
                  
                   
                } 
        
                
            
          
             // alert("user:"+data.user+":"+data.msg+"to"+data.to);
            // alert("#chat_"+data.to);

          });
       
      }    