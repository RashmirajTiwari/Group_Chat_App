const userController=require('../Controller/user');
const loginController=require('../Controller/login');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.post('/user/SignUp',userController.User);
router.get('/user/getUsers',userAuthentication.authenticate,userController.getUsers);
router.get('/user/getAllUsers',userAuthentication.authenticate,userController.getAllUsers);
router.post('/user/Login',loginController.postLogin);

module.exports=router;