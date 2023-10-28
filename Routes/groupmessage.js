const GroupMessage=require('../Controller/groupmessage');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.post('/user/GroupMessage',userAuthentication.authenticate,GroupMessage.GroupMessage);
router.get('/user/getNewGroupMessage',userAuthentication.authenticate,GroupMessage.getNewMessage);
//router.get('/user/getAllChatMessages',GroupMessage.getAllChatMessages);

module.exports=router;