const Contact = require('../models/Contact');

module.exports = {
    home: (req, res) => {
        if (!req.session.userid) {
            res.status(400).redirect('/login');
        }else {
            Contact.findAll({ where: { userid: req.session.userid }})
                .then(contacts => {
                    if (contacts) {
                        res.render('home', { title: "Home", data: { contacts: contacts }, session: { userid: req.session.userid, username: req.session.username } });
                    }else {
                        res.render('home', { title: "Home", session: { userid: req.session.userid } });
                    }
                }).catch(err => {
                    throw err;
            })
        }
    }
}