const User=require('../Model/user')
exports.chatMessages=(req,res,next)=>{

    const message=req.body.message;
    

         req.user.createChatmessage({
            message:message
         
          }
        ).then(result=>{
          res.status(200).json({message:message});
        }).catch(err=>{
          res.status(401).json({message:"Something went Wrong"});
        })
      }
      
     

  