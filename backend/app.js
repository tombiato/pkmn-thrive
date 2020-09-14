const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const port = 3000;
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// BD config
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash())

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api', require('./routes'));

// run our app
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

// router.use('/pokemons')
// app.use((req, res) => {
//     https.get('https://pokeapi.co/api/v2/pokemon-species', (resp) => {
//         let data = '';

//         resp.on('data', (chunk) => {
//             data += chunk;
//         });

//         resp.on('end', () => {
//             let pokeTab = [];
//             for (let pokemon of JSON.parse(data).results) {
//                 console.log(pokemon.url);
//                 https.get(pokemon.url, (resp) => {
//                     let data = '';

//                     resp.on('data', (chunk) => {
//                         data += chunk;
//                     });

//                     resp.on('end', () => {
//                         //console.log(JSON.parse(data));
//                         pokeTab.push(JSON.parse(data));
//                         pokeTab.sort((a, b) => {
//                             return a.id - b.id;
//                         });
//                         pokeTab.forEach((poke) => {
//                             console.log(poke.id);
//                         })
//                     })
//                 }).on("error", (err) => {
//                     console.log("Error: " + err.message);
//                 });
//             };
//             res.render('index', {pokemon: JSON.parse(data).results});
//         });

//     }).on("error", (err) => {
//         console.log("Error: " + err.message);
//     });
// });

module.exports = app;