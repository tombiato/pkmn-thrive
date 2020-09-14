const router = require('express').Router();

const {
    usersController,
} = require('../../controllers');

router.post('/login', usersController.loginUser);
router.post('/register', usersController.registerUser);
//router.get('/spec', usersController.getByUrl);

module.exports = router;
