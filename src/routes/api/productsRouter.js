const express = require('express');
const router = express.Router();

const productsController = require('../../controllers/api/productsController');

// [GET] api/products
router.get('/', productsController.index);

module.exports = router;