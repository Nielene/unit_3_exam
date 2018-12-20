const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const researchers = require('./routes/researchers');
const species = require('./routes/species');
const animals = require('./routes/animals');
// const habitats = require('./routes/habitats');
// const taggings = require('./routes/taggings');
// const sightings = require('./routes/sightings');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/researchers', researchers);
app.use('/species', species);
app.use('/animals', animals);
// app.use('/habitats', habitats);
// app.use('/taggings', taggings);
// app.use('/sightings', sightings);

app.get('/', (req, res) => {
  res.send('This is the HOMEPAGE!');
});

app.get('*', (req, res) => {
  res.send('🙀 😪 😲 Cats cry; Children weep ... for your error.')
});

const port = 3000;
app.listen(port, () => {
  console.log("Listening to ", port);
});






//
