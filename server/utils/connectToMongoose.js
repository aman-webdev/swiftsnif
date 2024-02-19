const mongoose = require('mongoose');

module.exports = function(connURL){
    return mongoose.connect(connURL)
}