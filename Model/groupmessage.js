const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const GroupMessage=sequelize.define('groupmessage',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
    groupId:{
      type:Sequelize.INTEGER,
     
    },
    userId:{
        type:Sequelize.INTEGER,
       
      },
    message:Sequelize.STRING,
   
})
  module.exports=GroupMessage;