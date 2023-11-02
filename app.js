const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const User=require('./Model/user');
const ChatMessage=require('./Model/chatMessges');
const Groups=require('./Model/groups');
const app=express();
const server=require('http').createServer(app);
const cors = require('cors');


const io=require('socket.io')(server);

io.on("connection",socket=>{
    console.log(socket.id)
    socket.on("send-message",(message)=>{
        socket.broadcast.emit("receive-message",message)
        
    })
})



const userRoutes=require('./Routes/user');
const chatMessageRoutes=require('./Routes/chatMessage');
const groupRoutes=require('./Routes/groups');
const membersRoutes=require('./Routes/members');
const groupMessageRoutes=require('./Routes/groupmessage');


server.prependListener("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
 });

app.use(cors());

app.use(bodyParser.json());
app.use(userRoutes);
app.use(chatMessageRoutes);
app.use(groupRoutes);
app.use(membersRoutes);
app.use(groupMessageRoutes);

User.hasMany(ChatMessage);
ChatMessage.belongsTo(User);

User.hasMany(Groups);
Groups.belongsTo(User);


sequelize.sync().then(result=>{
    //console.log(result);
    server.listen(process.env.PORT);
})
.catch(err=>console.log(err));
