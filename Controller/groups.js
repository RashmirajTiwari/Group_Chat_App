
const { Op } = require("sequelize");
const Groups=require('../Model/groups')
const Members=require('../Model/members');




exports.groups=(req,res,next)=>{

    const groupname=req.body.groupname;
      req.user.createGroup({
            name:groupname
        }
        ).then(result=>{
          res.status(200).json({result:result});
        }).catch(err=>{
          res.status(401).json({message:"Something went Wrong"});
        })
  }

  exports.getGroups=async(req,res,next)=>{
    
   const members= await Members.findAll({where:{userId:req.user.id}});
   var group_id;
   if(members.length==0){
    const count =await Groups.count({where:{userId:req.user.id}});
    Groups.findAll({where:{userId:req.user.id}}).then(result=>{
      
      res.status(200).json({result:result,count:count});
      }).catch(err=>{
        res.status(401).json({message:"Something went Wrong"});
      })
    
   }else{

    group_id=members[0].dataValues.groupId
    const count =await Groups.count({where:{userId:req.user.id}});
    Groups.findAll({where:{[Op.or]: [{userId:req.user.id}, {id:group_id}]}}).then(result=>{
        
      
      res.status(200).json({result:result,count:count});
      }).catch(err=>{
        res.status(401).json({message:"Something went Wrong"});
      })}
}