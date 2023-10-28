const groupsController=require('../Controller/groups');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.post('/user/Groups',userAuthentication.authenticate,groupsController.groups);
router.get('/user/getGroups',userAuthentication.authenticate,groupsController.getGroups);


module.exports=router;