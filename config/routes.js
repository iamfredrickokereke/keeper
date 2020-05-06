const express = require('express'),
      app = require('../controllers/app'),
      user = require('../controllers/user'),
      contact = require('../controllers/contact'),
      router = express.Router();

router.get('/', app.home);
router.get('/login', user.login);
router.get('/register', user.register);
router.get('/logout', user.logout);
router.get('/contact/edit/:id', contact.edit);
router.post('/register', user.save);
router.post('/login', user.signin);
router.post('/contact', contact.create);
router.post('/contact/update/:id', contact.update);
router.get('/contact/delete/:id', contact.delete);

module.exports = router;