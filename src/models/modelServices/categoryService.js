const Category = require('../Category');

module.exports.list = async () => {
    const category = await Category.find({}).lean();
    return category;
}

module.exports.store = async (reqBody) => {
    if(reqBody.name!=''){
        const category = new Category(reqBody);
        await category.save();
    }
}

module.exports.increaseNum = async (id) => {
    await Category.findOneAndUpdate({_id:id}, { $inc: {numOfBook: 1} });
}

module.exports.decreaseNum = async (id) => {
    await Category.findOneAndUpdate({_id:id}, { $inc: {numOfBook: -1} });
}