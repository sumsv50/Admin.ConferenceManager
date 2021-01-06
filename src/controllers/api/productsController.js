const productService = require('../../models/modelServices/productService');
const categoryService = require('../../models/modelServices/categoryService');

const currentTab= 'product';
const ITEM_PER_PAGE = 7;

class ProductsController {

    // [GET] api/products
    async index(req, res, next) {
        try{
            const page = req.query.page || 1;
            const category = req.query.category;
            const key = req.query.key;

            const query = {}; 
            const numOfBooks = await productService.countBooks();
            
            if(key) {
                query.name = new RegExp(key,'i');
            }
            if(category) {
                query.categoryID = category;
            };


            const paginate = await productService.list(query, page, ITEM_PER_PAGE);
            const categories = await categoryService.list();
            res.json({
                products: paginate.docs,
                numOfBooks,
                categories,
                currentTab,
                currentPage: paginate.page,
                hasPrevPage: paginate.hasPrevPage,
                hasNextPage: paginate.hasNextPage,
                totalPages: paginate.totalPages,
                currentCategory: category,
                key,
            });
         } catch(err) { next(err) };
    }

}

module.exports = new ProductsController;