const express = require('express')
const router = express.Router()

//Controller
const accountsController = require('../controllers/accountsController');

// define the accounts page route
router.get('/', accountsController.index);

// [GET] accounts/my-profile
router.get('/my-profile', accountsController.showMyProfile);

// [POST] accounts/store-admin-account
router.post('/store-admin-account', accountsController.storeAdminAccount);

// [GET] accounts/:id/view
router.get('/:type/:id/view', accountsController.view);

module.exports = router;