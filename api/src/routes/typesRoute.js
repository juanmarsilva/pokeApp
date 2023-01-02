const { Router } = require('express');
const { getPokemonTypes } = require('../controllers/typeControllers');

const router = Router();

router.get('/', getPokemonTypes );


module.exports = router;