const router = require('express').Router();

const {
    pokemonsController,
} = require('../../controllers');

router.get('/', pokemonsController.getAll);
router.get('/spec/:id', pokemonsController.getByUrl);

module.exports = router;
