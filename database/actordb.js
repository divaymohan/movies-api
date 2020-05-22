//load the db middlewares
const mongoose = require('mongoose');
//load debug tools
const debugGet = require('debug')('movies:actor:Get');
const debugPost = require('debug')('movies:actor:Post');
const debugDelete = require('debug')('movies:actor:Delete');
const debugPut = require('debug')('movies:actor:Put');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 15,
        minlength:3
    },
    age: {
        type: Number,
        //required: true,
        max: 100,
        min: 3
    },
    dob:{
        type: Date,
    },
    birthplace:{
        type: String,
        minlength:3,
        maxlength: 15
    },
    livingplace:{
        type: String,
        minlength:3,
        maxlength:15

    },
    description:{
        type: Text,
        minlength: 10,
        maxlength: 1000
    }

});

//model
const Actor = mongoose.model('Actor',schema);

//get all actors
async function getActors(){
    const actors = await Actor.find();
    return actors; 
}
//get actor by id
async function getActorByid(id){
    const actor = await Actor.findById(id);
    if(!actor) return;
    return actor;
}
//delete actor
async function deleteActor(id){
    return await Actor.deleteOne({_id: id});
}
//update user
async function updateActor(id,new_actor){
    const actor = await Actor.findById(id);
    
    if(!actor) return;
    if(new_actor.name) actor.name = new_actor.name;
    if(new_actor.age) actor.age = new_actor.age;
    if(new_actor.dob) actor.dob = new_actor.dob;
    if(new_actor.birthplace) actor.birthplace = new_actor.birthplace;
    if(new_actor.livingplace) actor.livingplace = new_actor.livingplace;
    if(new_actor.description) actor.description = new_actor.description;
    
    const result = await actor.save();
    return result;
}
//create new actor
async function addNewActor(new_user){
    const actor = new Actor({
        name: new_user.name,
        age: new_user.age,
        dob: new_user.dob,
        birthplace: new_user.birthplace,
        livingplace: new_user.livingplace,
        description: new_user.description

    });

    return await actor.save();
}

module.exports = {
    getActors : getActors,
    getActorByid: getActorByid,
    updateActor: updateActor,
    deleteActor: deleteActor,
    addNewActor: addNewActor
}


