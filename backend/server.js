require("dotenv").config()
const express=require('express');
const { sequelize } = require('./models/user');
const path=require("path");
const bodyParser=require("body-parser");
const cors=require("cors");
const routes=require('./routes/routes')


const app=express();
app.use(express.json());
app.use(cors());
app.use(routes);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

const port=process.env.PORT;
sequelize
    .sync()
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Server is running on ${port}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })