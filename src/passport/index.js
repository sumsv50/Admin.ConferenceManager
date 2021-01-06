const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const adminAccountService = require('../models/modelServices/adminAccountService');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const admin = await adminAccountService.checkCredential(username, password);
    if(!admin) {
        return done(null, false, { message: 'Incorrect username or password!' });
    } else {
        if(admin.status != "ACTIVE") {
          return done(null, false, { message: 'Your account has been blocked!' });
        } else {
          return done(null, admin);
        }
    }

  }
));

passport.serializeUser(function (admin, done) {
    done(null, admin._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const admin = await adminAccountService.getAdmin(id);
        done(null, admin);
    } catch (err) { done(err, null) }
});


module.exports = passport;