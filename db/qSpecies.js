const {db} = require('./index.js');

// get /
const getAllSpecies = (req, res, next) => {
  db.any('SELECT * FROM species').then (species => {
    res.status(200)
    res.json ({
      status: 'success',
      message: 'Got all Species.',
      body: species
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get the Species!😝"
    })
    console.log(err);
    next();
  })
}


// get /:id
const getSingleSpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.one('SELECT * FROM species WHERE id =$1', [speciesId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got this Species.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get this Species!😝 ",
      body: err
    })
    console.log(err);
    next();
  })
}

//post  /
const addNewSpecies = (req, res, next) => {
  db.none(
    'INSERT INTO species(name, is_mammal) VALUES (${newName}, ${newBoolean})', {
      newName: req.body.name,
      newBoolean: req.body.is_mammal
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New Species ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a Species!😝"
    })
    console.log(err);
    next();
  })
}


module.exports = { getAllSpecies, getSingleSpecies, addNewSpecies }
//
