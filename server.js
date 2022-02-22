const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuid } = require('uuid');
const router = require('./router');

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true,
}));
app.use('/router', router);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('base', { title: "Login" });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));