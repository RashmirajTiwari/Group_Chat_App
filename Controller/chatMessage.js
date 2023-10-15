const ChatMessges=require('../Model/chatMessges')
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
      
     
  exports.getAllChatMessages=(req,res,next)=>{
    
      ChatMessges.findAll().then(result=>{
          res.status(200).json({messages:result});
        }).catch(err=>{
          res.status(401).json({message:"Something went Wrong"});
        })
  }
  