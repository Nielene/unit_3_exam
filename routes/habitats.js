let express = require('express');
let router = express.Router();
const db = require('../db/qHabitats');



router.get('/', db.getAllHabitats);
router.get('/:id', db.getSingleHabitat);

router.post('/', db.addNewHabitat);





module.exports = router;
