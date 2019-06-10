/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const mocha = require('mocha');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const app = require('../src/routes/router');
const Logger = require('../logger');


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