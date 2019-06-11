/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const mocha = require('mocha');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const app = require('../src/routes/router');
const Logger = require('../logger');
const { getAllFlights } = require('../src/api/kiwi');


// Configure chai
chai.use(chaiHttp);
chai.should();


mocha.beforeEach(async () => {
  Logger.msg('Before each mocha');
});

mocha.describe('Simple test suite', () => {
  /* Tests to see if creating a factory contract is successful */
  mocha.it('Test #1', () => {
    assert.ok(true);
  });
});

mocha.describe('Tests the functionality of the kiwi api', function() {
  this.timeout(15000);
  mocha.it('Retrieves the id of a given location', async () => {
    try {
      const { body } = await chai.request(app).get('/location/id?location=Bucharest');
      assert(body.id);
      assert(body.location === 'Bucharest');
    } catch(error) {
      assert(false);
    }
  });
  mocha.it('Retrieves all the flights between two destinations', async () => {
    try {
      const { body } = await chai.request(app).post('/flights').send({
        source: 'Bucharest',
        destination: 'Paris',
        date_from: '11/06/2019',
        date_to: '12/06/2019'
      });
      assert(true);
    } catch(error) {
      assert(false);
    }
  });
  mocha.it('Retrieves all the flights for a given path', async () => {
    try {
      const path = [
        {
          source: 'Bucharest',
          destination: 'Paris',
          date_from: '11/06/2019',
          date_to: '12/06/2019'
        },
        {
          source: 'Paris',
          destination: 'London',
          date_from: '13/06/2019',
          date_to: '14/06/2019'
        }
      ];
      const { body } = await chai.request(app).post('/path').send({
        path
      });
      console.log(body.flights);
    } catch(error) {
      console.log(error);
      assert(false);
    }
  });
});