const Products = require('../Products');
const {bodyToMongoose} = require('../../util/bodyToMongoose');



module.exports.list = async (query, page, itemPerPage) => {
    const paginate = await Products.paginate(query, {
        page: page,
        limit: itemPerPage,
        lean: true,
    });
    return paginate;
}

module.exports.countBooks = async () => {
    const numOfBooks = await Products.countDocuments({});
    return numOfBooks;
}


module.exports.store = async (reqBody) => {
    const formData = bodyToMongoose(reqBody);
    const product = new Products(formData);
    await product.save();
}

module.exports.findByID = async (productID) => {
    product = await Products.findById(productID).lean();
    return product;   
}

module.exports.updateOne = async (id, reqBody) => {
    await Products.updateOne({_id: id}, bodyToMongoose(reqBody));
}

module.exports.deleteByID = async (id) => {
    await Products.deleteOne({_id: id});
}

