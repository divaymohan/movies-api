const mongoose =  require('mongoose');
const debugGet = require('debug')('movies:genre:Get');
const debugPost = require('debug')('movies:genre:Post');
const debugDelete = require('debug')('movies:genre:Delete');
const debugPut = require('debug')('movies:genre:Put');

//schema
const schema = new mongoose.Schema({
    genreName:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15
        //enum: ['Horror', 'Action','Romentic','Thriller','Love','Scifi','Science','Biography','Motivation']
    }
});
//model
const Genre = mongoose.model('Genre',schema);

//getting all the genres form database
async function getGenres(){
    debugGet('getting all the geners available in database.');
    const genres = await Genre.find();
    return genres; 
}
async function getGenreById(id){
    debugGet(`Getting one genre from database with id ${id}`);
    const genre = await Genre.findById(id);
    if(!genre) return;
    return genre;
}
async function deleteGenre(id){
    debugDelete(`deleting genre with id ${id}`);
    const genre = await Genre.findById(id);
    if(!genre) return;
    const result = await Genre.deleteOne({_id:id});
    return result;
}
async function updateGenre(id,new_genre){
    debugPut('updating genre.');
    let genre = await Genre.findById(id);
    if(!genre) return;
    genre.genreName = new_genre.genreName;
    
    genre = await genre.save();
    return genre;
}
async function addNewGenre(new_genre){
    debugPost('adding new genre in db.');
    let genre = new Genre({
        genreName: new_genre.genreName 
    });
    genre = await genre.save();
    return genre;
}

module.exports = {
    getGenres: getGenres,
    getGenreById: getGenreById,
    deleteGenre: deleteGenre,
    updateGenre: updateGenre,
    addNewGenre: addNewGenre
}



