const express = require('express');
const route =  express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

function validateRequest(genre){
    const genreSchema = {
        genreName: Joi.string().max(15).min(4).required()
    }
    const result = Joi.validate(genre,genreSchema);
    return result;
}



module.exports = route;