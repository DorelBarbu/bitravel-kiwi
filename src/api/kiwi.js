const axios = require('axios');
const server = require('../utils/server');

const getLocationId = async location => {
  try {
    const response = await server.get(`locations?term=${location}&locale=ro-RO&limit=1`);
    return response;
  } catch(error) {
    return error;
  }
}

const getAllFlights = async (source, destination, date_from, date_to) => {
  try {
    const fly_from = (await getLocationId(source)).locations[0].id;
    const fly_to = (await getLocationId(destination)).locations[0].id;
    const response = await server.get(`flights?fly_to=${fly_to}&fly_from=${fly_from}&locale=ro-RO&date_from=${date_from}&date_to=${date_to}&max_stopovers=0`);
    const flights = response.data.map(flight => ({
      countryFrom: flight.countryFrom,
      countryTo: flight.countryTo,
      price: flight.price,
      dTime: flight.dTime,
      aTime: flight.aTime,
      flyFrom: flight.flyFrom,
      flyTo: flight.flyTo,
      mapIdFrom: flight.mapIdFrom,
      mapIdTo: flight.mapIdTo,
      cityFrom: flight.cityFrom,
      cityTo: flight.cityTo,
      distance: flight.distance
    }));;
    return flights;
  } catch(error) {
    return error;
  }
}

module.exports = {
    getLocationId, 
    getAllFlights
};