const express =  require('express');
const route = express.Router();

const genreRoute = require('./genre');
const actorRoute = require('./actors');

route.use('/genre',genreRoute); 
route.use('/actor',actorRoute);

module.exports = route;