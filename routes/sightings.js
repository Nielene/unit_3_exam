let express = require('express');
let router = express.Router();
const db = require('../db/qSightings');



router.get('/', db.getAllSightings);
router.get('/species/:id', db.getAllSightingsOfSingleSpecies);
router.get('/researchers/:id', db.getAllSightingsForSingleResearcher);
router.get('/habitats/:id', db.getAllSightingsForSingleHabitat);

router.post('/', db.addNewSighting);

router.delete('/:id', db.deleteSingleSighting)



module.exports = router;
