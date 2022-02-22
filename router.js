const express = require('express');
const router = express.Router();

const credentials = {
    email: 'admin@test.com',
    password: 'admin'
}

router.post('/login', (req, res) => {
    if (req.body.email === credentials.email && req.body.password === credentials.password) {
        req.session.user = req.body.email;
        res.redirect('/router/dashboard');
    } else {
        res.send('login failed');
    }
    res.end();
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user, title: "Dashboard" });
    } else {
        res.send('Unathorized user');
    }
    res.end();
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.send('Error logging out');
        } else {
            res.render('base', {title: 'Login', logoutMessage: 'Logged out successfully!'})
        }
    })
});

module.exports = router;
