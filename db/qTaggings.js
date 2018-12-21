const {db} = require('./index.js');


// get  '/'   animal_id, researcher_id
const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings').then(taggings => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all Taggings.',
      body: taggings
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Taggings!😝 "
    })
    console.log(err);
    next();
  })
}

// get  '/:id'  animal_id, researcher_id
const getSingleTagging = (req, res, next) => {
  let taggingId = parseInt(req.params.id);
  db.one('SELECT * FROM taggings WHERE id=$1', [taggingId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got your Tagging.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get your Tagging!😝 "
    })
    console.log(err);
    next();
  })
}


// get  '/researchers/:id'   animal_id, researcher_id
const getAllTaggingsBySingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any('SELECT taggings.*, researchers.* FROM taggings JOIN researchers ON taggings.researcher_id = researchers.id WHERE researcher_id = ${id}', {
    id: researcherId
  }).then ((data) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got ALL Taggings by this Researcher.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get the Taggings by this Researcher!😝"
    })
    console.log(err);
    next();
  })

}


// get  '/animals/:id'   animal_id, researcher_id
const getAllTaggingsOnSingleAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.any('SELECT taggings.*, animals.* FROM taggings JOIN animals ON taggings.animal_id = animals.id WHERE animal_id = ${id}', {
    id: animalId
  }).then ((data) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got ALL Taggings ON this Animal.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get the Taggings on this Animal!😝"
    })
    console.log(err);
    next();
  })

}


// post  '/'   animal_id, researcher_id
const addNewTagging = (req, res, next) => {
  db.none(
    'INSERT INTO taggings(animal_id, researcher_id) VALUES(${newAnimalId}, ${newResearcherId})', {
      newAnimalId: req.body.animal_id,
      newResearcherId: req.body.researcher_id
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New Taggings ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD an Tagging!😝"
    })
    console.log(err);
    next();
  })
}


module.exports = { getAllTaggings, getSingleTagging, getAllTaggingsBySingleResearcher, getAllTaggingsOnSingleAnimal, addNewTagging }
