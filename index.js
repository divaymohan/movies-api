//databse module
const mongoose =  require('mongoose');

//third party modules
const Joi = require('joi');
const debugConnect = require('debug')('movies:Connect');
const debugEnv = require('debug')('movies:Env');
const helmet = require('helmet');
const morgan = require('morgan');

//express for restFul api
const express =  require('express');

//custom module
const movies = require('./routes/movies');

//main app
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());

if(app.get('env') === "development"){
    debugEnv('welcome to development environment.');
    debugEnv('Loading morgan for help');
    app.use(morgan('tiny'));
    debugEnv('Morgan enabled.');
}

//connection to database
mongoose.connect('mongodb://localhost/movies-backend-service')
        .then(()=>debugConnect('Connected to database.'))
        .catch(err=> debugConnect(`Error in connecting: ${err.message}`));


        
app.get('/',(req,res)=>{
    res.send('Hello i am from a movie api..!!');
})
app.use('/api/movies',movies);


const port = process.env.PORT | 3000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
});


