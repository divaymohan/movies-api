const express = require('express');
const route =  express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const genreDB = require('../database/genredb');

function validateRequest(genre){
    const genreSchema = {
        genreName: Joi.string().max(15).min(4).required()
    }
    const result = Joi.validate(genre,genreSchema);
    return result;
}

route.get('/',async (req,res)=>{
    try{
        const genres = await genreDB.getGenres();
        res.send(genres);
    }catch(err){
        res.send(err.message);
    }
});
route.get('/:id',async (req,res)=>{

});
route.post('/',async (req,res)=>{
    const {err,value} = validateRequest(req.body);
    if(err) res.status(400).send(err.message);
    try{
        const result = await genreDB.addNewGenre(req.body);
        res.send(result);

    }
    catch(err){
        res.send(err.message);
    }
});


module.exports = route;