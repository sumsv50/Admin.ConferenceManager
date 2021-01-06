const passport = require('passport');

class SiteController{
    //[GET] /
    index(req, res){
        res.redirect('/products');
    }

    //[GET] /login
    login(req, res){
        if(req.user && req.user.status == "ACTIVE") {
            res.redirect('/products');
        } else {
            res.render('login', { message: req.flash('error') });
        }
    }

}

module.exports = new SiteController;