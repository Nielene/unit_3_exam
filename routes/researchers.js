let express = require('express');
let router = express.Router();
const db = require('../db/qResearchers');

router.get('/', db.getAllResearchers);
router.get('/:id', db.getSingleResearcher);

router.post('/', db.addNewResearcher);

router.patch('/:id', db.updateSingleResearcher);

router.delete('/:id', db.deleteSingleResearcher);


module.exports = router;
