const ChatMessges=require('../Model/chatMessges')
const { Op } = require("sequelize");
exports.chatMessages=(req,res,next)=>{

    const message=req.body.message;
      req.user.createChatmessage({
            message:message
         
          }
        ).then(result=>{
          res.status(200).json({message:result});
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

  exports.getNewMessage=async(req,res,next)=>{
    let id=req.query.lastMessageId;
    console.log(id)
    if(id===undefined || id===0){
      id=-1;
    }

    const count =await ChatMessges.count({where:{id:{[Op.gt]:id}}});
    console.log("Raj"+count)
    ChatMessges.findAll({where:{id:{[Op.gt]:id}}}).then(result=>{
        res.status(200).json({messages:result,count:count});
      }).catch(err=>{
        res.status(401).json({message:"Something went Wrong"});
      })
}
  