const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const _ = require('lodash');
const User = require('../models/User');

/**
 * setup middleware for registration
 */
passport.use('register',
    new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    },
        async (req,username,password, done) => {
            try {
                console.log({username,password, done});
                let user = await User.findOne({ email:username });
                if (!_.isEmpty(user)) return done(null, false)
                let guest = new User(req.body)
                await guest.save();
                return done(null, guest);
            } catch (error) {
               return done(error)
            }
        }
    )
)

passport.use("login",
    new LocalStrategy({
        usernameField: "email",
        passwordField: 'password',
        passReqToCallback: true,
        session:false
    }, async (req,email, password, done) => {
        try {
            let user = await User.findOne({ email })
            if (_.isEmpty(user)) return done(null, false, { message: 'user not found' })
            if (!user.comparePassword(password)) return done(null, false, { message: 'wrong password' })
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
           return done(error)
        }
    }
    )
)