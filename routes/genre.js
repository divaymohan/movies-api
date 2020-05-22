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
    try{
        const genre = await genreDB.getGenreById(req.params.id);
        if(!genre) res.status(400).send(`No genre found with id ${req.params.id}`);
        res.send(genre);
    }catch(err){
        res.send(err.message);
    }

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
route.put('/:id',async (req,res)=>{
    let {err,val} = validateRequest(req.body);
    if(err) res.status(400).send(err.message);
    try{
        const result = await genreDB.updateGenre(req.params.id,req.body);
        if(!result) res.status(400).send(`No genre found with id ${req.params.id}`);
        res.send(result);
     }
     catch(err){
         res.send(err.message);
     }
    
});
route.delete('/:id',async (req,res)=>{
    try{
        const result = await genreDB.deleteGenre(req.params.id);
        if(!result) res.status(400).send(`No genre found with id ${req.params.id}`);
        res.send(result);
    }
    catch(err){
        res.send(err.message);
    }
});


module.exports = route;