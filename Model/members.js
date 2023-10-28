const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Members=sequelize.define('members',{
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
   
})
  module.exports=Members;