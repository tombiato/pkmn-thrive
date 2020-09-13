const router = require('express').Router();

const {
    pokemonsController,
} = require('../../controllers');

router.get('/', pokemonsController.getAll);
router.get('/spec', pokemonsController.getByUrl);

module.exports = router;
