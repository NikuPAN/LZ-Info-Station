const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// console.log('Testing server');

// Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lzadmin1026',
    database: 'lz-info-station'
});

db.connect(function(err) {
    if(err) {
        console.log('Error Establishing Connection to DB');
        throw err;
        //return false;
    }
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),  // 5 years
    endCoonectionOnClose: false
}, db);

app.use(session({
    key: 'ffjnsgwnocnoVR09U42U5M82JCJIORJ2093U',
    secret: 'mseafij293293u3j29921U*(#@&@Y$#&@Y$114514',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),  // 5 years
        httpOnly: false
    }
}));

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(3000);