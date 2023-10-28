const Members=require('../Model/members')



exports.addMembers=(req,res,next)=>{

    let length=req.body.members.length;
    let members=req.body.members;
    let groupId=req.body.groupId;
   

    
    if(length==0){
        res.status(201).json({success:false,msg:"Please Select Any one Member"});
    }else{
        Members.destroy({where:{groupId:groupId}});
        for(let i=0;i<length;i++){
            Members.create({
                groupId:groupId,
                userId:members[i]
            }
            ).then(result=>{
                res.status(200).json({success:true,msg:"Member Added successfully"});
            }).catch(err=>{
              res.status(501).json({message:"Something went Wrong"});
            })

        }
        
    }
    
   
  }
  exports.getMembers=async(req,res,next)=>{

    let groupId=req.query.groupId
   
        Members.findAll({where:{groupId:groupId}
               
            }
            ).then(result=>{
                res.status(200).json({success:true,result:result,userId:req.user.id});
            }).catch(err=>{
              res.status(501).json({message:"Something went Wrong"});
            })

        
}