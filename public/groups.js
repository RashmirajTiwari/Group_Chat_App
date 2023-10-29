var submit = document.getElementById("submitBtn");
let k=0;
    submit.addEventListener("click", async (e) => {
  
        
            var groupname = document.getElementById('groupname');
            var table = document.getElementById('gtable');
            
            if(groupname.value=="" ){
                
                alert("Please Fill The Field");
            
            }else{
                let groups= {
                    groupname:groupname.value,
                    
                   }
                  
                   const token=localStorage.getItem('token');
            
                await axios.post("http://localhost:3000/user/Groups",groups,{headers:{"Authorization":token}}).then(res=>{
                    
                if(res.status===200){
                   let i=0;
                    alert("Groups Created Successfully");
                    

                   var list = document.getElementById('list');
                   list.innerHTML+=`<li><span class="span" style="display:none">${res.data.result.id}</span><span class="span" ">${k+1}</span>
                   <span class="span" ></span>
                <span class="span" style="position:fixed; width: 100px;">${res.data.result.name}</span>
                <span class="span" ></span><span class="span" ></span><span class="span" ></span> <span class="span" ></span><span class="span" ></span> <span class="span" ></span>
                <button class="addmembers" data-target="#membermodal" data-toggle="modal">Add Members</button>&nbsp&nbsp
                <button class="delete">Delete</button>
                </li>`;
                }

                
               
    
            }).catch(err=>{
                
                // const data=err.response.data.message;;

                // if(err.response.status===501){
                //     error.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                // }else (
                //     error.innerHTML=`<h5 style="text-align: center;color:red">Something went Wrong</h5>`
                // )
              
                
                
            })
            var list = document.getElementById('list1');
            list.addEventListener('click', async (e) => {
                var table = document.getElementById('mtable');
                    const li = e.target.parentElement;
                    var group_id = document.getElementById('group_id');
                       group_id.value=li.children[0].innerText; 
                       console.log("mmmm"+group_id.value)
                       $('input[type=checkbox]').prop('checked',false);

                       axios.get(`http://localhost:3000/user/getUsers?groupId=${group_id.value}`,{headers:{"Authorization":token}}).then(res=>{
                        
                        
                        for(let i=0;i<res.data.result.length;i++){
                        table.innerHTML+=`
                        <tr>
                        <td><input type="checkbox" class="member" id="member" name="members" value="`+res.data.result[i].id+`"/></td>
                        <td>${res.data.result[i].name}</td>
                        <tr>`
                    }
                   
                })
                
                       //getUsers
                    axios.get(`http://localhost:3000/user/getUsers?groupId=${group_id.value}`,{headers:{"Authorization":token}}).then(res=>{
                        var memberBtn = document.getElementById('memberBtn');
                        if(res.data.btn==true){
                            memberBtn.removeAttribute("disabled");
                            
                        }else{
                            memberBtn.setAttribute("disabled", "");
                        }
                        
                        //getMembers
                    for(let j=0;j<res.data.result.length;j++){
                        
                        
                        axios.get(`http://localhost:3000/user/getMembers?groupId=${group_id.value}`,{headers:{"Authorization":token}}).then(res1=>{
                        
                        for(let k=0;k<res1.data.result.length;k++){
                           
                         if(res.data.result[j].id===res1.data.result[k].userId || res.data.result[j].id===res1.data.userId){
        
                            var id = document.querySelectorAll('.member'); 
                            id[j].checked=true
                            
                         }
                         
                        
                        }
                     
                     }).catch(err=>{
                       console.log(err);
                     })
                    
                        
                }
            })


                //Delete group
                try {
                    if (e.target.classList.contains("delete")) {
                        const token=localStorage.getItem('token');
                        if (confirm("Are You Sure ?")) {
                            const li = e.target.parentElement;
                            const groupId = li.firstElementChild.innerText
                            
                            await axios.delete(`http://localhost:3000/deleteGroup/${groupId}`,{headers:{"Authorization":token}}).then(res=>{
                                alert(res.data.message);
                                if(res.data.success){
                                    list.removeChild(li);
                                }
                                
                            });
                        }
                    }
            
                } catch (err) {
                    console.log(err)
            
                }
                
                
                table.innerHTML="";     
            
            })
            
            groupname.value="";
           

        }
               
    })

 window.addEventListener("DOMContentLoaded", async() => {
    
            const token=localStorage.getItem('token');
           
             await axios.get(`http://localhost:3000/user/getGroups`,{headers:{"Authorization":token}}).then(res=>{
                var table = document.getElementById('gtable');
                var membermodal = document.getElementById('membermodal')
                k=res.data.result.length;
                var list = document.getElementById('list');
                for(let i=0;i<res.data.result.length;i++){
                list.innerHTML+=`<li><span class="span" style="display:none">${res.data.result[i].id}</span><span class="span" >${i+1}</span>
                <span class="span" ></span>
                <span class="span" style="position:fixed; width: 100px;">${res.data.result[i].name}</span>
                <span class="span" ></span><span class="span" ></span><span class="span" ></span><span class="span" ></span><span class="span" ></span><span class="span" ></span>
                <button class="addmembers" data-target="#membermodal" data-toggle="modal">Add Members</button>&nbsp&nbsp
                <button class="delete">Delete</button>
                </li>`;
                
                //table.innerHTML+=`<tr><td>${i+1}</td><td>${res.data.result[i].name}</td><td><a data-toggle="modal data-target="#membermodal" onclick="getValue(i+1);">Members<td></td></a></td><tr>`
                }
             
            list.addEventListener('click', async (e) => {
                var table = document.getElementById('mtable');
                    const li = e.target.parentElement;
                    var group_id = document.getElementById('group_id');
                       group_id.value=li.children[0].innerText; 
                       $('input[type=checkbox]').prop('checked',false);

                       axios.get(`http://localhost:3000/user/getUsers?groupId=${group_id.value}`,{headers:{"Authorization":token}}).then(res=>{
                        
                        
                        for(let i=0;i<res.data.result.length;i++){
                        table.innerHTML+=`
                        <tr>
                        <td><input type="checkbox" class="member" id="member" name="members" value="`+res.data.result[i].id+`"/></td>
                        <td>${res.data.result[i].name}</td>
                        <tr>`
                    }
                   
                })
                
                       //getUsers
                    axios.get(`http://localhost:3000/user/getUsers?groupId=${group_id.value}`,{headers:{"Authorization":token}}).then(res=>{
                        var memberBtn = document.getElementById('memberBtn');
                        if(res.data.btn==true){
                            memberBtn.removeAttribute("disabled");
                            
                        }else{
                            memberBtn.setAttribute("disabled", "");
                        }
                        
                        //getMembers
                    for(let j=0;j<res.data.result.length;j++){
                        
                        
                        axios.get(`http://localhost:3000/user/getMembers?groupId=${group_id.value}`,{headers:{"Authorization":token}}).then(res1=>{
                        
                        for(let k=0;k<res1.data.result.length;k++){
                           
                         if(res.data.result[j].id===res1.data.result[k].userId || res.data.result[j].id===res1.data.userId){
        
                            var id = document.querySelectorAll('.member'); 
                            id[j].checked=true
                            
                         }
                         
                        
                        }
                     
                     }).catch(err=>{
                       console.log(err);
                     })
                    
                        
                }
            })


                //Delete group
                try {
                    if (e.target.classList.contains("delete")) {
                        const token=localStorage.getItem('token');
                        if (confirm("Are You Sure ?")) {
                            const li = e.target.parentElement;
                            const groupId = li.firstElementChild.innerText
                            
                            await axios.delete(`http://localhost:3000/deleteGroup/${groupId}`,{headers:{"Authorization":token}}).then(res=>{
                                alert(res.data.message);
                                if(res.data.success){
                                    list.removeChild(li);
                                }
                                
                            });
                        }
                    }
            
                } catch (err) {
                    console.log(err)
            
                }
                
                
                table.innerHTML="";     
            
            })
            
        })
         

})

var memberBtn = document.getElementById('memberBtn');
memberBtn.addEventListener("click", async (e) => {
    
    let members=[] ;   
    var selectedmembers = document.getElementsByName('members');
    var group_id = document.getElementById('group_id');
    for (var checkbox of selectedmembers) { 
        
        if (checkbox.checked)  {
            members.push(checkbox.value);
        }
            
      }  
      const data={
        members:members,
        groupId:group_id.value
      }
      const token=localStorage.getItem('token');

      //Add members
        await axios.post("http://localhost:3000/user/addMembers",data,{headers:{"Authorization":token}}).then(res=>{
        var message = document.getElementById('message');
        console.log(res.data.success)
        if(res.data.success){
            alert(res.data.msg)
            $('#membermodal').modal('hide');
            $('input[type=checkbox]').prop('checked',false);
            
            
        }else{
            message.innerHTML=`<h5 style="text-align: center;color:red">${res.data.msg}</h5>`
            setTimeout(()=>{
                document.getElementById('message').style.visibility="hidden";
            },3000)
            
            
        }
        

    }).catch(err=>{
      
    })

    //getMembers

    
    
})