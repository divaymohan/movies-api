const express =  require('express');
const route = express.Router();

const genreRoute = require('./genre');

route.use('/genre',genreRoute); 

module.exports = route;