const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');


router.get('/', productsController.index);
router.get('/create-product', productsController.createProduct);

router.post('/store', productsController.storeProduct);
router.post('/store-category', productsController.storeCategory);

router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);
router.delete('/:id/:categoryID', productsController.delete);

module.exports = router;


