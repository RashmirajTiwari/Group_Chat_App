
const socket = io('http://localhost:3000')

var send=document.getElementById("sendBtn");
var list=document.getElementById("MyList");
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

socket.on("receive-message",(message)=>{
    
    list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${message.name}:${message.message}</li></center>`
    var liTag = document.getElementsByTagName('li');
        
    for(i=0;i<liTag.length;i++){
        if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
            else liTag[i].style.backgroundColor = '#ffffff';
        }
})

send.addEventListener("click", async() =>{
    var chat=document.getElementById("chat");

    if(chat.value==""){
                
        alert("Please fill the field");
    
    }else{
        let chatMessage= {
            message:chat.value,
           }
           const token=localStorage.getItem('token'); 
           const decode=parseJwt(token);
           const userId=decode.userId;
           
            await axios.post("http://localhost:3000/user/ChatMessage",chatMessage,{headers:{"Authorization":token}}).then(res=>{
                const name=userId===res.data.message.userId?'You':res.data.user.name;
                list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${name}:${res.data.message.message}</li></center>`
                socket.emit('send-message',{name:res.data.user.name,message:res.data.message.message,userId:res.data.message.userId})
            
            var liTag = document.getElementsByTagName('li');
        
            for(i=0;i<liTag.length;i++){
                if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
                    else liTag[i].style.backgroundColor = '#ffffff';
                }
               
            chat.value="";
           
           }).catch(err=>{
               
               const data=err.response.data.message;
               if(err.response.status===401){
               
                  message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
               }
              
               
           })
   

      
        
    
    }
})

window.addEventListener("DOMContentLoaded", async() => {

        var oldChatData = JSON.parse(localStorage.getItem('chatDataObj'));
        var id;
        if(oldChatData!=null ){
            id=oldChatData[oldChatData.length-1].id;
        }
        
        console.log(id);
        const token=localStorage.getItem('token');
        await axios.get(`http://localhost:3000/user/getNewMessage?lastMessageId=${id}`,{headers:{"Authorization":token}}).then(res=>{
        
        for(let i=0;i<res.data.count;i++){
            const chatData={
                id:res.data.messages[i].id,
                userId:res.data.messages[i].userId,
                message:res.data.messages[i].message,
                name:res.data.messages[i].user.name
            }
            if(oldChatData == null || oldChatData.length>=5) oldChatData = [];
        oldChatData.push(chatData);
        localStorage.setItem('chatDataObj', JSON.stringify(oldChatData));
        }
       
        
     })
            
            list.innerHTML=""
            const decode=parseJwt(token);
            const userId=decode.userId;
            if(oldChatData!=null){
                for (let i = 0; i < oldChatData.length; i++) {
                    const name=userId===oldChatData[i].userId?'You':oldChatData[i].name;
                    console.log(userId+" "+oldChatData[i].userId)
                    list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${name}:${oldChatData[i].message}</li></center>`
        
                }
                var liTag = document.getElementsByTagName('li');
             
                for(i=0;i<liTag.length;i++){
                    if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
                        else liTag[i].style.backgroundColor = '#ffffff';
                    }
            }
           
        
               
})