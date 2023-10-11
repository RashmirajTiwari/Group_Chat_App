const userController=require('../Controller/user');
const express=require('express');
const router=express.Router();

router.post('/user/SignUp',userController.User);

module.exports=router;