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

        }).catch(err=>{
            
            const data=err.response.data.message;
            if(err.response.status===401){
                console.log(data);
               // message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
            }
           
            
        })

    // list.innerHTML+=`<center><li style="text-align:left; width: 40%; background-color: rgb(195, 210, 218);padding: 0.5em;";>${chat.value}</li></center>`
    // var liTag = document.getElementsByTagName('li');

    // for(i=0;i<liTag.length;i++){
    //     if(i%2==0) liTag[i].style.backgroundColor ='#C5D4D6 ';
    //         else liTag[i].style.backgroundColor = '#ffffff';
    //     }
    // chat.value="";
    }
})