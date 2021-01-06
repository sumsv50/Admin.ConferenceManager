const allowUrl = ['login'];


const authenticationMiddleware = (req, res, next) => {
    if(req.url == '/login' || (req.user && req.user.status == "ACTIVE")) {
       return next();
    } 

    
    res.redirect('/login');
}

module.exports = authenticationMiddleware;