const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    type: String,
    name: String,
    price: String,
    img: [Object],
    slug: String,
    author:String,
    overview: String,
    description: String,
    detail: Object,
    slug: { type: String, slug: ['name', 'author'], unique: true },
    categoryID: ObjectId,
}, { timestamps: true });

Product.plugin(mongoosePaginate);

// Model name => collection
module.exports = mongoose.model('Product', Product);

