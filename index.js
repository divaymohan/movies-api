const mongoose =  require('mongoose');
const Joi = require('joi');
const express =  require('express');
const debug = require('debug');
const helmet = require('helmet');
const morgan = require('morgan');
//main app
const app = express();
 //middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());


app.get('/',(req,res)=>{
    res.send('Hello i am from a movie api..!!');
})


const port = process.env.PORT | 3000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
});


