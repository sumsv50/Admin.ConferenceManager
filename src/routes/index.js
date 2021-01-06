// Define Routers
const dashboardRouter = require('./dashboardRouter');
const productsRouter = require('./productsRouter');
const siteRouter = require('./siteRouter');
const accountsRouter = require('./accountsRouter');
const apiAccountRouter = require('./api/accountsRouter');
const apiProductsRouter = require('./api/productsRouter');

function route(app){
    app.use('/', siteRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/products', productsRouter);
    app.use('/accounts', accountsRouter);

    //API
    app.use('/api/accounts', apiAccountRouter);
    app.use('/api/products', apiProductsRouter);
}

module.exports = route;