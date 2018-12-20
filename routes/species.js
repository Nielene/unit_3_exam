let express = require('express');
let router = express.Router();
const db = require('../db/qSpecies');


router.get('/', db.getAllSpecies);
router.get('/:id', db.getSingleSpecies);

router.post('/', db.addNewSpecies);




module.exports = router;
