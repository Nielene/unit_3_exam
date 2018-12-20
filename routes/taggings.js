let express = require('express');
let router = express.Router();
const db = require('../db/qTaggings');



router.get('/', db.getAllTaggings);
router.get('/:id', db.getSingleTagging);
router.get('/researchers/:id', db.getAllTaggingsBySingleResearcher);
router.get('/animals/:id', db.getAllTaggingsOnSingleAnimal);

router.post('/', db.addNewTagging);




module.exports = router;
