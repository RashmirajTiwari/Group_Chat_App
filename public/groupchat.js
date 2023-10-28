var send=document.getElementById("sendBtn");
var list=document.getElementById("MyList1");
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
           console.log(groupChatMessage)
        const token=localStorage.getItem('token');
            await axios.post("http://localhost:3000/user/GroupMessage",groupChatMessage,{headers:{"Authorization":token}}).then(res=>{
        
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
             id=oldChatData[oldChatData.length-1].id;

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
         
         for(let i=0;i<res.data.messages.length;i++){
             const chatData={
                 id:res.data.messages[i].id,
                 groupId:res.data.messages[i].groupId,
                 message:res.data.messages[i].message
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
             if(groupData.length!=0){
                 for (let i = 0; i < groupData.length; i++) {
                 
                     list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${groupData[i].message}</li></center>`
         
                 }
                 var liTag = document.getElementsByTagName('li');
              
                 for(i=0;i<liTag.length;i++){
                     if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
                         else liTag[i].style.backgroundColor = '#ffffff';
                     }
             }
            
         
                
        
    //}, 2000);
 
 
 
 
 
 })
