
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

    let groups=[];
    let unique = new Set();
   for(let i=0;i<members.length;i++){
    group_id=members[i].dataValues.groupId
    console.log(group_id)
    const result=await Groups.findAll({where:{[Op.or]: [{userId:req.user.id}, {id:group_id}]}});
    
      for(let j=0;j<result.length;j++){
        
        if(unique.has(result[j].dataValues.id)){

          }else{
            groups.push(result[j].dataValues)
          }
         unique.add(result[j].dataValues.id)
         
    }
      
   }
   
   console.log(groups)
   res.status(200).json({result:groups});
  }
    
}

exports.deleteGroup= async (req,res,next)=>{

  const groupId=req.params.groupId;
  const group= await Groups.findOne({where:{[Op.and]: [{userId:req.user.id}, {id:groupId}]}})

  try{
    if(group){
      group.destroy();
      res.status(200).json({success:true,message:'Group Deleted Successfully...!!'});
    }else{
      res.status(201).json({success:false,message:"You are not a Admin"});
    }
  }catch(err){
    res.status(501).json({err:err});
  }

    // req.user.createGroup({
    //       name:groupname
    //   }
    //   ).then(result=>{
    //     res.status(200).json({result:result});
    //   }).catch(err=>{
    //     res.status(401).json({message:"Something went Wrong"});
    //   })
}