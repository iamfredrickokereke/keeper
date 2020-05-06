const Contact = require('../models/Contact');
const contactVal = require('../validation/contact');

module.exports = {
    create: (req, res) => {
        var data = contactVal.validate(req, res);
        Contact.findOne({ where: { email: data.email, userid: req.session.userid } })
            .then(contact => {
                if (contact) {
                    req.flash('error', 'Contact Exists');
                    res.status(400).redirect('/');
                } else {
                    Contact.create(data)
                        .then(contact => {
                            if (contact) {
                                req.flash('success', 'Contact created');
                                res.status(200).redirect('/');
                        }else {
                            req.flash('error', 'Unable to create user');
                            res.status(400).redirect('/');
                        }
                    }).catch(err => {
                        req.flash('error', 'Server Error, Try again');
                        res.status(500).redirect('/');
                    })
                }
            }).catch(err => {
                req.flash('error', 'Server Error, Try again');
                res.status(500).redirect('/');
        });
    },
    edit: (req, res) => {
        if (req.session.userid) {
            Contact.findOne({ where: { id: req.params.id }})
            .then(contact => {
                if (contact) {
                    res.render('edit', { title: `Edit ${contact.name}`, contact: contact, session:{ userid: req.session.userid }})
                } else {
                    req.flash('error', "Contact does not Exist");
                    res.status(404).redirect('/')
                }
            }).catch(err => { throw err })   
        } else {
            res.status(400).redirect('/login')
        }
    },
    update: (req, res) => {
        var data = contactVal.validate(req, res);
        Contact.update(data, { where: { id: req.params.id } })
            .then(id => {
                req.flash('success', 'Contact Updated');
                res.status(200).redirect('/');
            }).catch(err => { 
                req.flash('error', 'failed to Update');
                res.status(500).redirect('/');
            })
    },
    delete: (req, res) => {
        Contact.destroy({ where: { id: req.params.id }})
             .then(contacts => {
                req.flash('success', 'Contact Deleted');
                res.status(200).redirect('/');
            }).catch(err => { 
                req.flash('error', 'failed to delete');
                res.status(500).redirect('/');
            })
    }
}