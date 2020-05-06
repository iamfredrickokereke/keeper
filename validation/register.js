const val = require('validator'),
      filters = require('xss-filters');


module.exports = {
    validate: (req, res) => {
       var { name, email, password } = req.body,
           { isEmpty, isEmail, isLength, escape, trim, normalizeEmail } = val,
           { inHTMLData } = filters;
        if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
            req.flash('error', 'All fields are required');
            return res.redirect('/register');
        }
        name = trim(escape(inHTMLData(name)));
        email = trim(normalizeEmail(escape(inHTMLData(email))));
        password = trim(escape(inHTMLData(password)));
        if (!isEmail(email)) {
            req.flash('error', 'Enter a valid Email');
            return res.redirect('/register');
        }
        if (!isLength(password, { min: 6 })) {
            req.flash('error', 'Password must not be less than six characters');
            return res.redirect('/register')
        }
        return {
            name: name,
            email: email,
            password: password
        }
    }
}