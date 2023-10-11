const User=require('../Model/user')
const bcrypt=require('bcrypt');
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