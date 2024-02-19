const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalLink : {
        type:String,
        required:true
    },

    shortId : {
        type:String,
        required:true
    },

    expirationTime : {
        type:Date
    },

    password : {
        type:String
    },

},{timestamps:true})

const urlModel = mongoose.model("url",urlSchema)

module.exports = urlModel