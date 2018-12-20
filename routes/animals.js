let express = require('express');
let router = express.Router();
const db = require('../db/qAnimals');



router.get('/', db.getAllAnimals);
router.get('/:id', db.getSingleAnimal);

router.post('/', db.addNewAnimal);

router.patch('/:id', db.updateSingleAnimal);

router.delete('/:id', db.deleteSingleAnimal);




module.exports = router;
