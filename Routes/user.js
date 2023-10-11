const userController=require('../Controller/user');
const loginController=require('../Controller/login');
const express=require('express');
const router=express.Router();

router.post('/user/SignUp',userController.User);
router.post('/user/Login',loginController.postLogin);

module.exports=router;