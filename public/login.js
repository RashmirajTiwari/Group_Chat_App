var login = document.getElementById("loginBtn");

    login.addEventListener("click", async (e) => {
  
            var message=document.getElementById('message');
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            if(email.value==""|| password.value==""){
                
                alert("Please fill the fields");
            
            }else{
                let login= {
                    email:email.value,
                    password:password.value
                   }
                  
                 await axios.post("http://localhost:3000/user/Login",login).then(res=>{
                    
                    if(res.status===200){
                        alert(res.data.message);
                        localStorage.setItem('token',res.data.token)
                        window.location.href="../views/Chat.html"
                        //message.innerHTML=`<h5 style="text-align: center;color:green">${res.data.message}</h5>`
                    }
        
                }).catch(err=>{
                    
                    const data=err.response.data.message;
                    if(err.response.status===401){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    if(err.response.status===404){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    if(err.response.status===500){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    
                })
               
                email.value="";
                password.value="";
    
            }
            
    
    })
