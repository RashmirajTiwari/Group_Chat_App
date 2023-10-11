const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express();
const cors = require('cors');





const userRoutes=require('./Routes/user');



app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);



sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(process.env.PORT);
})
.catch(err=>console.log(err));
