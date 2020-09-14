const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new localStrategy({
            usernameField: 'name'
        }, (name, password, done) => {
            User.findOne({
                name: name
            })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: 'Not registered'
                        });
                    };

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Not registered' });
                        };
                    });
                })
                .catch(err => console.log(err));
        }
    ),

    passport.serializeUser((user, done) => {
        done(null, user.id);
    }),

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    }))
};