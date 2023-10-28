const User=require('../Model/user')
const Groups=require('../Model/groups')
const Members=require('../Model/members')
const bcrypt=require('bcrypt');
const { Op } = require("sequelize");
exports.User=(req,res,next)=>{

    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;
    const saltRound=10;

    bcrypt.hash(password,saltRound,async(err,hash)=>{
      if(err){
        console.log(err);
      }

      const user =  await User.findOne({where : { email:email }});
      if(user){
        res.status(501).json({message:"User Already Exist Please Login!!!"});
      }else{
        await User.create({
          name:name,
          email:email,
          phone:phone,
          password:hash,
          }
        ).then(result=>{
          res.status(200).json({result:result});
        }).catch(err=>{
          res.status(504).json({message:"Something went Wrong"});
        })
      }

   })
    

}
exports.getUsers=async (req,res,next)=>{
const groupId=req.query.groupId;
const groups  =await Groups.findAll({where:{id:groupId}})

  if(groups[0].userId===req.user.id){
    await User.findAll({where:{id:{[Op.ne]:req.user.id}}}
      ).then(result=>{
        res.status(200).json({result:result,btn:true});
      }).catch(err=>{
        res.status(504).json({message:"Something went Wrong"});
      })
  }else{
    await User.findAll(
  ).then(result=>{
    res.status(200).json({result:result,btn:false});
  }).catch(err=>{
    res.status(504).json({message:"Something went Wrong"});
  })}
 }

 exports.getAllUsers=async (req,res,next)=>{
  
   
      await User.findAll({where:{id:{[Op.ne]:req.user.id}}}
        ).then(result=>{
          res.status(200).json({result:result});
        }).catch(err=>{
          res.status(504).json({message:"Something went Wrong"});
        })
      }
