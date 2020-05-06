const val = require('validator'),
      filters = require('xss-filters');


module.exports = {
    validate: (req, res) => {
       var { email, password } = req.body,
           { isEmpty, isEmail, isLength, escape, trim, normalizeEmail } = val,
           { inHTMLData } = filters;
        if (isEmpty(email) || isEmpty(password)) {
            req.flash('error', 'All fields are required');
            return res.redirect('/login');
        }
        email = trim(normalizeEmail(escape(inHTMLData(email))));
        password = trim(escape(inHTMLData(password)));
        if (!isEmail(email)) {
            req.flash('error', 'Enter a valid Email');
            return res.redirect('/login');
        }
        if (!isLength(password, { min: 6 })) {
            req.flash('error', 'Password must not be less than six characters');
            return res.redirect('/login')
        }
        return {
            email: email,
            password: password
        }
    }
}