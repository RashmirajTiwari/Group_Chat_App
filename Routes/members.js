const membersController=require('../Controller/members');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.post('/user/addMembers',userAuthentication.authenticate,membersController.addMembers);
router.get('/user/getMembers',userAuthentication.authenticate,membersController.getMembers);


module.exports=router;