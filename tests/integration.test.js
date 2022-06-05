const request = require('supertest');

const createServer = require('../server/server.js');
const com_1 = require('./sample_data/com-1.json');
const com_42 = require('./sample_data/com-42.json');
const com_64 = require('./sample_data/com-64.json');

const app = createServer();

describe('Risk in Micromorts - Integration', () => {

  test('POST /commute', async () => {
    console.log('COM ', typeof com_1)
    const res = await request(app)
      .post('/commute')
      .send({ com_1 })
      // .set('Accept', 'application/json');

    expect(res.status).toBe(200);
  });

});
