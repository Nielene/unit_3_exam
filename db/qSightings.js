const {db} = require('./index.js');


// get  '/'   researcher_id, species_id, habitat_id
const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings').then(sightings => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all Sightings.',
      body: sightings
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Sightings!😝 "
    })
    console.log(err);
    next();
  })
}

// get  '/species/:id'  researcher_id, species_id, habitat_id
const getAllSightingsOfSingleSpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE species_id = ${id}', {
    id: speciesId
  }).then ((data) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got ALL Taggings On this Species.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get the Taggings On this Species!😝"
    })
    console.log(err);
    next();
  })

}


// get  '/researchers/:id'   researcher_id, species_id, habitat_id
const getAllSightingsForSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE researcher_id = ${id}', {
    id: researcherId
  }).then ((data) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got ALL Sightings by this Researcher.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get the Sightings by this Researcher!😝"
    })
    console.log(err);
    next();
  })
}


// get  '/habitats/:id'   researcher_id, species_id, habitat_id
const getAllSightingsForSingleHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE habitat_id = ${id}', {
    id: habitatId
  }).then ((data) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got ALL Sightings for this Habitat.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get the Sightings for this Habitat!😝"
    })
    console.log(err);
    next();
  })
}

// post  '/'   researcher_id, species_id, habitat_id
const addNewSighting = (req, res, next) => {
  db.none(
    'INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(${newResearcherId}, ${newSpeciesId}, ${newHabitatId})', {
      newResearcherId: req.body.researcher_id,
      newSpeciesId: req.body.species_id,
      newHabitatId: req.body.habitat_id
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New Sighting ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a Sighting!😝"
    })
    console.log(err);
    next();
  })
}
// delete  /:id   researcher_id, species_id, habitat_id
const deleteSingleSighting = (req, res, next) => {
  let sightingId = parseInt(req.params.id);
  db.result('DELETE FROM sightings WHERE sightings.id = $1', [sightingId])
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You DELETED this Sighting.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't DELETE a Sighting!😝"
    })
    console.log(err);
    next();
  })
}




module.exports = { getAllSightings, getAllSightingsOfSingleSpecies, getAllSightingsForSingleResearcher, getAllSightingsForSingleHabitat, addNewSighting, deleteSingleSighting }
