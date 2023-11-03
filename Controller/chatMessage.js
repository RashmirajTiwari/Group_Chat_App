const ChatMessges=require('../Model/chatMessges')
const User=require('../Model/user')
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
require('dotenv').config();
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
  
exports.uploadFiles=async(req,res,next)=>{
    const groupId = req.params.groupId;
    const userId = req.user.id;
    const data = req.body.data;
    console.log(">>>>>>>>>>>>>>>>>.",groupId, userId, data);
  try{
    const bufferData = Buffer.from(req.file.buffer, "binary");
    const filename = `${userId}/${req.file.originalname}`;
    const mimetype = req.file.mimetype;
    const url = await uploadToS3(bufferData, filename, mimetype);
    res.status(200).json({success: true, url, message: "file uploaded successfully"});
  }catch(err){
    res.status(500).json({success: false, message: "upload failed at backend", error: err.message})
  }
  }
  
  function uploadToS3(data, filename){
    //get credentials, login to AWS and upload the file.
    const BUCKET_NAME = process.env.BUCKET_NAME; //change bucket name
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
  
    const s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    })
  
     //params Bucket, Key, Body as required by AWS S3
    const params = {                               
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: 'public-read'
    }
  
  
    // return promise instead direct return as uploading is an asynchronous task
    return new Promise((resolve, reject)=>{
      s3bucket.upload(params, async (err, s3response)=>{
        try{
          if(err) {
            console.log("Error uploading file", err);
            reject(err);
          }else{
            console.log('File uploaded successfully', s3response)
            resolve(s3response.Location);
          }
        }catch(err){
          console.log("Waiting to login in AWS for upload", err)
        }
  
      })
    })
}