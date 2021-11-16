const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


// Load User Model
const User = require('../models/User')

// Passport uses what are termed strategies to authenticate requests. Strategies range from verifying a username and password, 
// delegated authentication using OAuth or federated authentication using OpenID.
// Before asking Passport to authenticate a request, the strategy (or strategies) used by an application must be configured.
// Strategies, and their configuration, are supplied via the use() function. For example, the following uses the LocalStrategy for username/password authentication.

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' },  (email, password, done) => {
            // Match User
            User.findOne({ email: email })
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return done(null, user);
                    } else{
                        return done(null, false, { message: 'Password is incorrect' })
                    }
                });
            })
            .catch(err => console.log(err));
        })
    )

// In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. 
// If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
// Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. 
// In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}