const express = require('express');

const router = express.Router();

// mount user's routes
router.use('/pokemons', require('./pokemons'));

module.exports = router;
