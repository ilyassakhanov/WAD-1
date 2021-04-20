const express = require('express');
const session = require('express-session');
// const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//init session
app.use(session({
    secret: "yes",
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

const users = [{
    u: 'admin',
    p: 'admin'
}];

function checkUser(username, password) {
    for (i = 0; i < users.length; i++) {
        if (username == users[i].u && password == users[i].p) {
            return true;
        }
    }
    return false;
}

app.get('/', (req, res) => {
    if (checkUser(req.body.username, req.body.password)) {
        es.render('home', req.body);
    } else {
        res.render('login', { err: '' });
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/login', (req, res, next) => {
    var input_value = req.body.button;

    if (checkUser(req.body.username, req.body.password) && input_value == 'login') {
        req.session.username = req.body.username;
        req.session.password = req.body.password;
        res.render('home', req.body);
    } else if (input_value == 'register') {
        res.redirect('/register');
    } else {
        res.render('login', { err: 'Wrong username or password' });
    }

});

app.post('/register', (req, res) => {
    users.push(
        {
            u: req.body.username,
            p: req.body.password
        }
    );
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    res.redirect('/');
});

app.post('/home', (req, res) => { // Doesn't work
    users.push(
        {
            u: req.session.username,
            p: req.body.password
        }
    );
});


// /
// /register
// accessible if a user is logged in
// /user
// /user/delete


app.listen(3000, () => console.log('Server running'));