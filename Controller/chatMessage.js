const ChatMessges=require('../Model/chatMessges')
const User=require('../Model/user')
const { Op } = require("sequelize");
exports.chatMessages=async(req,res,next)=>{

    const message=req.body.message;
    const user = await User.findOne({where:{ id: req.user.id}}) 
      req.user.createChatmessage({
            message:message
         }
        ).then(result=>{
          res.status(200).json({message:result,user:user});
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
    
    if(id===undefined || id===0){
      id=-1;
    }
    const count =await ChatMessges.count({where:{id:{[Op.gt]:id}}});
    ChatMessges.findAll({where:{id:{[Op.gt]:id}},include: [{model: User, attribute: ['name']}]}).then(result=>{
        res.status(200).json({messages:result,count:count});
      }).catch(err=>{
        res.status(401).json({message:"Something went Wrong"});
      })
}
  