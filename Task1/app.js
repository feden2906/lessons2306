const express = require('express');
const fs = require('fs');
const handleBars = require('express-handlebars');
const path = require('path');

const app = express();

const publicDir = 'public';
const jsonFile = require('./public/users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');
app.engine('.hbs', handleBars({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, publicDir));

app.listen(3000, () => {
    console.log('App listen is 3000');
});

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res) => {
    let {email, password} = req.body;
    for (const user of jsonFile)
        {
        if (user.email === email && user.password === password)
            {
            res.render("user", {user})
            return;
            } else
            {
            res.render('login', {loginError: true})
            }
        }
});

app.get('/users', (req, res) => {
    res.render('users', {jsonFile})
})

app.get('/registration', (req, res) => {
    res.render('registration')
});

app.post('/registration', (req, res) => {
    const {email, password, age} = req.body;
    for (const user of jsonFile)
        {
        if (user.email === email || !age || !email || !password)
            {
            res.render('registration', {error: true});
            return;
            }
        }
    jsonFile.push(req.body);
    fs.writeFile(path.join(__dirname, publicDir, 'users.json'), JSON.stringify(jsonFile), err => {

    })
    res.render('home', {registration: true})
});