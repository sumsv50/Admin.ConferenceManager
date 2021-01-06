const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema({
    name: String,
    numOfBook: {type: Number, default: 0},
});


// Model name => collection
module.exports = mongoose.model('Category', Category);

