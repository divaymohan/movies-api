const expresss = require('express');
const Joi = require('joi');
const actorDB = require('../database/actordb');
const route = expresss.Router();

//client request validation
function validate(actor){
    const schema = {
        name: Joi.string().max(15).min(3).required(),
        age: Joi.number().max(100).min(3),
        dob: Joi.date(),
        birthplace: Joi.string().min(3).max(20),
        livingplace: Joi.string().min(3).max(20),
        description: Joi.string().min(10).max(1000)
    }
    return Joi.validate(schema,actor);
}



route.get('/',async (req,res)=>{
    try{
        res.send(await actorDB.getActors());
    }catch(err){
        res.send(err.message);
    }
});
route.post('/',async (req,res)=>{
    //const {error,value} = validate(req.body);
    //if(error) res.status(400).send(error.message);
    try{
        const result = await actorDB.addNewActor(req.body);
        res.send(result);
    }
    catch(err){
        res.send(err.message);
    }
    
});
route.get('/:id',async (req,res)=>{
    try{
        const actor = await actorDB.getActorByid(req.params.id);
        if(!actor) res.status(400).send(`No actor found with id: ${req.params.id}`);
        res.send(actor);
    }
    catch(err){
        res.send(err.message);
    }
});
route.put('/:id',async (req,res)=>{
    try{
        const result = await actorDB.updateActor(req.params.id,req.body);
        if(!result) res.status(400).send(`No user found with id: ${req.params.id}`);
        res.send(result);
    }catch(err){
        res.send(err.message);    
    }
    
});
route.delete('/:id',(req,res)=>{
    try{
        const result = actorDB.deleteActor(req.params.id);
        if(!result) res.status(400).send(`No user found with id: ${req.params.id}`);
        return result;
    }catch(err){
        res.send(err.message);
    }
});


module.exports = route;