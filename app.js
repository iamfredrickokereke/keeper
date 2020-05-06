const express = require('express'),
      path = require('path'),
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      flash = require('express-flash'),
      routes = require('./config/routes'),
      app = express(),
      PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(PORT, () => console.log(`Dev Server started on http://localhost:${PORT}`));