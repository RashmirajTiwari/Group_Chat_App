var send=document.getElementById("sendBtn");
var list=document.getElementById("MyList");
send.addEventListener("click", async() =>{
    var chat=document.getElementById("chat");

    if(chat.value==""){
                
        alert("Please fill the field");
    
    }else{
        let chatMessage= {
            message:chat.value,
           }
        const token=localStorage.getItem('token');
            await axios.post("http://localhost:3000/user/ChatMessage",chatMessage,{headers:{"Authorization":token}}).then(res=>{
        
            console.log(res);
            list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${res.data.message.message}</li></center>`
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

    

   // setInterval(async() => {
       
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
                message:res.data.messages[i].message
            }
            if(oldChatData == null || oldChatData.length>=5) oldChatData = [];
        oldChatData.push(chatData);
        localStorage.setItem('chatDataObj', JSON.stringify(oldChatData));
        }
       
        
     })
            
            list.innerHTML=""
            if(oldChatData!=null){
                for (let i = 0; i < oldChatData.length; i++) {
                
                    list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${oldChatData[i].message}</li></center>`
        
                }
                var liTag = document.getElementsByTagName('li');
             
                for(i=0;i<liTag.length;i++){
                    if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
                        else liTag[i].style.backgroundColor = '#ffffff';
                    }
            }
           
        
               
       
   //}, 2000);





})