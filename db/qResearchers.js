const {db} = require('./index.js');

const getAllResearchers = (req, res, next) => {
  db.any('SELECT * FROM researchers').then(researchers => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all Researchers.',
      body: researchers
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get your Researchers!😝"
    })
    console.log(err);
    next();
  })
}

const getSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.one('SELECT * FROM researchers WHERE id=$1', [researcherId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got your Researcher.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get your Researcher!😝"
    })
    console.log(err);
    next();
  })
}

const addNewResearcher = (req, res, next) => {
  db.none(
    'INSERT INTO researchers(name, job_title) VALUES(${newName}, ${newJobTitle})', {
      newName: req.body.name,
      newJobTitle: req.body.job_title
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New Researcher ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a Researcher!😝"
    })
    console.log(err);
    next();
  })
}

//PATCH /researchers/:id    name,job_title
const updateSingleResearcher = (req, res, next) => {
  const researcherId = parseInt(req.params.id);
  let queryString = 'UPDATE researchers SET ';

  if (req.body.name && req.body.job_title) {
    queryString += `name = '${req.body.name}', job_title = '${req.body.job_title}' `;
  } else if (req.body.name) {
    queryString += `name = '${req.body.name}' `;
  } else if (req.body.job_title) {
    queryString += `job_title = '${req.body.job_title}' `;
  }

  queryString += `WHERE id = ${researcherId}`;

  db.none(queryString)
  .then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You PATCHED/EDITTED a researcher!'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't PATCH a Researcher!😝"
    })
    console.log(err);
    next();
  })
}


const deleteSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE researchers.id = $1', [researcherId])
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You DELETED this Researcher.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't DELETE a Researcher!😝"
    })
    console.log(err);
    next();
  })
}


module.exports = { getAllResearchers, getSingleResearcher, addNewResearcher, updateSingleResearcher, deleteSingleResearcher }
//
