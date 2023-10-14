const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const User=require('./Model/user');
const ChatMessage=require('./Model/chatMessges');
const app=express();
const cors = require('cors');





const userRoutes=require('./Routes/user');
const chatMessageRoutes=require('./Routes/chatMessage');
const chatMessage = require('./Model/chatMessges');



app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(chatMessageRoutes);

User.hasMany(ChatMessage);
ChatMessage.belongsTo(User);


sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(process.env.PORT);
})
.catch(err=>console.log(err));
