const express = require('express');
const api = require('../api/kiwi');
const router = express.Router();

router.get('/location/id', async (req, res) => {
  const { location } = req.query;
  const id = (await api.getLocationId(location)).locations[0].id;
  res.send({
    location,
    id
  });
});

router.post('/flights', async (req, res) => {
  const { source, destination, date_to, date_from } = req.body;
  const flights = await api.getAllFlights(source, destination, date_from, date_to);
  res.send({
    flights
  });
});

router.post('/path', async (req, res) => {
  const { path } = req.body;
  let flights  = [];
  for(let i = 0; i < path.length; i++) {
    const {source, destination, date_from, date_to} = path[i];
    flights.push(api.getAllFlights(source, destination, date_from, date_to));
  }
  flights = await Promise.all(flights);
  flights = flights.reduce((combinedArray, flightChunk) => combinedArray.concat(flightChunk));
  res.send({ 
    flights 
  }); 
});

module.exports = router;