const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const passport = require('passport');
require('../../config/passport')(passport);

module.exports = {
    getAll: async (req, res) => {
        res.send('Hello');
    },
    loginUser: async (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: 'http://localhost:8888/frontend',
            failureRedirect: 'http://localhost:8888/frontend',
            failureFlash: true
        })(req, res, next);
    },
    registerUser: async (req, res) => {
        const {
            email,
            password
        } = req.body;

        const newUser = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You are registered');
                        res.redirect('http://localhost:8888/frontend')
                    })
                    .catch((err) => console.log(err));
            })
        )
    }
};
