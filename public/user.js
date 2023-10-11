var submit = document.getElementById("submitBtn");
    submit.addEventListener("click", async (e) => {
  
        
            var name = document.getElementById('name');
            var email = document.getElementById('email');
            var phone = document.getElementById('phone');
            var password = document.getElementById('password');
            if(name.value=="" || email.value==""|| password.value=="" || phone==""){
                
                alert("Please fill the fields");
            
            }else{
                let SignUp= {
                    name:name.value,
                    email:email.value,
                    phone:phone.value,
                    password:password.value
                   }
                  
                
                await axios.post("http://localhost:3000/user/SignUp",SignUp).then(res=>{
                    
                if(res.status===200){
                    
                    //window.location.href="../views/login.html"
                    //message.innerHTML=`<h5 style="text-align: center;color:green">${res.data.message}</h5>`
                }
    
            }).catch(err=>{
                
                const data=err.response.data.message;;

                if(err.response.status===501){
                    error.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                }else (
                    error.innerHTML=`<h5 style="text-align: center;color:red">Something went Wrong</h5>`
                )
              
                
                
            })
           
            
            name.value="";
            email.value="";
            phone.value="";
            password.value="";

        }
               
    })
