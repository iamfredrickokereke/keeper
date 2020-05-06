const val = require('validator'),
      filters = require('xss-filters');


module.exports = {
    validate: (req, res) => {
       var { name, email, phone } = req.body,
           { isEmpty, isEmail, isLength, escape, trim, normalizeEmail } = val,
           { inHTMLData } = filters;
        if (isEmpty(name) || isEmpty(email) || isEmpty(phone)) {
            req.flash('error', 'All fields are required');
            return res.redirect('/register');
        }
        name = trim(escape(inHTMLData(name)));
        email = trim(normalizeEmail(escape(inHTMLData(email))));
        phone = trim(escape(inHTMLData(phone)));
        if (!isEmail(email)) {
            req.flash('error', 'Enter a valid Email');
            return res.redirect('/register');
        }
        if (!isLength(phone, { min: 10, max: 15 })) {
            req.flash('error', 'Enter a Valid Phone Number');
            return res.redirect('/')
        }
        return {
            name: name,
            email: email,
            phone: phone,
            userid: req.session.userid
        }
    }
}