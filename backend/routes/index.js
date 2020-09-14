const express = require('express');

const router = express.Router();

// mount user's routes
router.use('/pokemons', require('./pokemons'));

router.use('/users', require('./users'));

module.exports = router;
