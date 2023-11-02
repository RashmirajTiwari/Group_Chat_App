var send=document.getElementById("sendBtn");
var list=document.getElementById("MyList1");

const socket = io('http://localhost:3000')

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
        var group_id = localStorage.getItem('groupId')
        let groupChatMessage= {
            message:chat.value,
            groupId:group_id
           }
        
            const token=localStorage.getItem('token');
            const decode=parseJwt(token);
            const userId=decode.userId;
            await axios.post("http://localhost:3000/user/GroupMessage",groupChatMessage,{headers:{"Authorization":token}}).then(res=>{
            const name=userId===res.data.message.userId?'You':res.data.user.name;
            list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${name}:${res.data.message.message}</li></center>`
            socket.emit('send-message',{name:res.data.user.name,message:res.data.message.message})
            var liTag = document.getElementsByTagName('li');
        
            for(i=0;i<liTag.length;i++){
                if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
                    else liTag[i].style.backgroundColor = '#ffffff';
                }
            chat.value="";
   
           }).catch(err=>{
               
               const data=err.response.data.message;
               if(err.response.status===501){
               
                  message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
               }
              
               
           })
   

      
        
    
    }
})
window.addEventListener("DOMContentLoaded", async() => {

    var group_id = localStorage.getItem('groupId')

    // setInterval(async() => {
        var groupData=[];
         var oldChatData = JSON.parse(localStorage.getItem('groupChatDataObj'));
         var id;
         if(oldChatData!=null ){
             

             for(let i=0;i<oldChatData.length;i++){
                if(oldChatData[i].groupId==group_id){
                    groupData.push(oldChatData[i])
                }
             }
             
             if(groupData.length!=0){
                id=groupData[groupData.length-1].id;
             }
             
         }
         
        const token=localStorage.getItem('token');
         await axios.get(`http://localhost:3000/user/getNewGroupMessage?lastMessageId=${id}&groupId=${group_id}`,{headers:{"Authorization":token}}).then(res=>{
         console.log(res)
         for(let i=0;i<res.data.messages.length;i++){
             const chatData={
                 id:res.data.messages[i].id,
                 userId:res.data.messages[i].userId,
                 groupId:res.data.messages[i].groupId,
                 message:res.data.messages[i].message,
                 name:res.data.user.name
             }
             if(oldChatData == null || oldChatData.length>=5){
                oldChatData = [];

             }
              
         oldChatData.push(chatData);
         groupData.push(chatData)
         localStorage.setItem('groupChatDataObj', JSON.stringify(oldChatData));
         }
        
         
      })
             
             list.innerHTML=""
             const decode=parseJwt(token);
            const userId=decode.userId;
             if(groupData.length!=0){
                 for (let i = 0; i < groupData.length; i++) {
                    const name=userId===groupData[i].userId?'You':groupData[i].name;
                     list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${name}:${groupData[i].message}</li></center>`
         
                 }
                 var liTag = document.getElementsByTagName('li');
              
                 for(i=0;i<liTag.length;i++){
                     if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
                         else liTag[i].style.backgroundColor = '#ffffff';
                     }
             }
            
         
                
        
    //}, 2000);
 
 
 
 
 
 })
