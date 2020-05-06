const register = require('../validation/register'),
      login = require('../validation/login'),
      User = require('../models/User'),
      bcrypt = require('bcrypt')
      rounds = 10;

module.exports = {
    login: (req, res) => {
        if(req.session.userid){
            res.redirect('/')
        }else {
         res.render('login', { title: "Login", session: { userid: req.session.userid } });
        }
    },
    register: (req, res) => {
        if(req.session.userid){
            res.redirect('/')
        }else {
        res.render('register', { title: "Register", session: { userid: req.session.userid } });
        }
    },
    save: (req, res) => {

        var userData = register.validate(req, res),
            { name, email, password } = userData;
        User.findOne({ where: { email: email }})
            .then(user => {
                if (user) {
                    req.flash('error', 'Email already Exist');
                    res.redirect('/register');
                }else {
                    bcrypt.hash(password, rounds, (err, hash) => {
                        userData.password = hash;
                        User.create(userData)
                        .then(user => {
                            req.session.userid = user.id;
                            req.session.username = user.name;
                            req.flash('success', 'Registration Successful');
                            res.redirect('/');
                        }).catch(err => {
                            req.flash('error', 'Unable to create account, try again');
                            res.redirect('/register');
                        })
                    })
                }
            })       
            .catch(err => {
                req.flash('error', 'Unable check for Email, try again');
                res.redirect('/register');
        });
    },
    signin: (req, res) => {
        var userData = login.validate(req, res),
            { email, password } = userData;

        User.findOne({ where: { email: email }})
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            req.session.userid = user.id;
                            req.session.username = user.name;
                            req.flash('success', 'Login Successful');
                            res.redirect('/');   
                        }else {
                            req.flash('error', 'Password is incorrect');
                            res.redirect('/login');
                        }
                    });
                }else {
                    req.flash('error', 'Email does not Exist');
                    res.redirect('/login');
                }
            })       
            .catch(err => {
                req.flash('error', 'Unable check for Email, try again');
                res.redirect('/login');
        })
    },
    logout: (req, res) => {
        req.session.userid = null;
        res.redirect('/');
    }
}