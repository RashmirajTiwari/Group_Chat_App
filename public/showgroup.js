window.addEventListener("DOMContentLoaded", async() => {
    //var group_id = document.getElementById('group_id');
    //console.log(group_id)
    const token=localStorage.getItem('token');
   
     await axios.get(`http://localhost:3000/user/getGroups`,{headers:{"Authorization":token}}).then(res=>{
    
       
        var list = document.getElementById('list');
        for(let i=0;i<res.data.result.length;i++){
        list.innerHTML+=`<li><span class="span" style="display:none">${res.data.result[i].id}</span><span class="span" >${i+1}</span>
        <span class="span" ></span><span class="span" ></span><span class="span" ></span>
        <span class="span" >${res.data.result[i].name}</span><span class="span" ></span><span class="span" ></span>
        <button type="button" class="box" id="box">Let's Chat</button>

        </li><br>`;
        
        }
    })
    list.addEventListener('click', async (e) => {
        const li = e.target.parentElement;
        localStorage.setItem('groupId',li.children[0].innerText);
        window.location.href="../views/GroupChat.html"    
           
    })
})

