const express = require('express');
const port = 3000;

const app = express();
// const router = express.Router();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

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