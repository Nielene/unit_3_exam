const {db} = require('./index.js');

// get /
const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals').then(animals => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all Animals.',
      body: animals
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get your Animals!😝"
    })
    console.log(err);
    next();
  })
}

// get /:id
const getSingleAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.one('SELECT * FROM animals WHERE id=$1', [animalId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got your Animal.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get your Animal!😝"
    })
    console.log(err);
    next();
  })
}

// post /       species_id, nickname
const addNewAnimal = (req, res, next) => {
  db.none(
    'INSERT INTO animals(species_id, nickname) VALUES(${newSpeciesId}, ${newNickname})', {
      newSpeciesId: req.body.species_id,
      newNickname: req.body.nickname
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New Animal ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD an Animal!😝"
    })
    console.log(err);
    next();
  })
}

//PATCH /:id        species_id, nickname
const updateSingleAnimal = (req, res, next) => {
  const animalId = parseInt(req.params.id);
  let queryString = 'UPDATE animals SET ';

  if (req.body.species_id && req.body.nickname) {
    queryString += `species_id = '${req.body.species_id}', nickname = '${req.body.nickname}' `;
  } else if (req.body.species_id) {
    queryString += `species_id ='${req.body.species_id}' `;
  } else if (req.body.nickname) {
    queryString += `nickname = '${req.body.nickname}' `;
  }

  queryString += `WHERE id = ${animalId}`;

  db.none(queryString)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You PATCHED/EDITTED an Animal!'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't PATCH an Animal!😝"
    })
    console.log(err);
    next();
  })
}

// delete /:id
const deleteSingleAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE animals.id =$1', [animalId])
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You DELETED this Animal.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't DELETED an Animal!😝"
    })
    console.log(err);
    next();
  })
}


module.exports = { getAllAnimals, getSingleAnimal, addNewAnimal, updateSingleAnimal, deleteSingleAnimal }
//
