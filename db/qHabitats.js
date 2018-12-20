const {db} = require('./index.js');

// get  '/'    category
const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats').then(habitats => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all Habitats.',
      body: habitats
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get the Habitats!😝 "
    })
    console.log(err);
    next();
  })
}


// get  '/:id'      category
const getSingleHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.one('SELECT * FROM habitats WHERE id=$1', [habitatId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'Yout got this Habitat.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Habitat!😝 "
    })
    console.log(err);
    next();
  })
}


// post '/'     category
const addNewHabitat = (req, res, next) => {
  db.none(
    'INSERT INTO habitats(category) VALUES(${newCategory})', {
      newCategory: req.body.category
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New Habitat ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a Habitat!😝"
    })
    console.log(err);
    next();
  })
}



module.exports = { getAllHabitats, getSingleHabitat, addNewHabitat }
//
