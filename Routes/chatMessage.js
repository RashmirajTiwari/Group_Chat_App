const ChatMessage=require('../Controller/chatMessage');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.post('/user/ChatMessage',userAuthentication.authenticate,ChatMessage.chatMessages);
router.get('/user/getAllChatMessages',ChatMessage.getAllChatMessages);

module.exports=router;