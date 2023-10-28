const GroupMessage=require('../Model/groupmessage')
const { Op } = require("sequelize");
exports.GroupMessage=(req,res,next)=>{

    const message=req.body.message;
    const userId=req.user.id;
    const groupId=req.body.groupId;
    GroupMessage.create({
            groupId:groupId,
            userId:userId,
            message:message
         
          }
        ).then(result=>{
          res.status(200).json({message:result});
        }).catch(err=>{
          res.status(501).json({message:"Something went Wrong"});
        })
  }
      
     
  exports.getAllChatMessages=(req,res,next)=>{
    
    GroupMessage.findAll().then(result=>{
          res.status(200).json({messages:result});
        }).catch(err=>{
          res.status(401).json({message:"Something went Wrong"});
        })
  }

  exports.getNewMessage=async(req,res,next)=>{

    
    let id=req.query.lastMessageId;
    let groupId=req.query.groupId;
    if(id===undefined || id===0){
      id=-1;
    }
    GroupMessage.findAll({ 
      where: {
          [Op.and] : [
              {
                  id: { [Op.gt]: id }
              },
              {
                  groupId:groupId
              }
          ]        
      } 
  })
      .then(result=>{
        console.log("Rajneesh "+ result)
        res.status(200).json({messages:result});
      }).catch(err=>{
        res.status(501).json({message:"Something went Wrong"});
      })
}
  