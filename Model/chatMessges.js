const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const chatMessage=sequelize.define('chatmessage',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    message:Sequelize.STRING,
   
})
  module.exports=chatMessage;