const express = require('express');
const ejs = require('ejs');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    https.get('https://pokeapi.co/api/v2/pokemon-species', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let pokeTab = [];
            for (let pokemon of JSON.parse(data).results) {
                console.log(pokemon.url);
                https.get(pokemon.url, (resp) => {
                    let data = '';

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        //console.log(JSON.parse(data));
                        pokeTab.push(JSON.parse(data));
                        pokeTab.sort((a, b) => {
                            return a.id - b.id;
                        });
                        pokeTab.forEach((poke) => {
                            console.log(poke.id);
                        })
                    })
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            };
            res.render('index', {pokemon: JSON.parse(data).results});
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

module.exports = app;