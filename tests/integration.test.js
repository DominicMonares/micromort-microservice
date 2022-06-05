const request = require('supertest');

const createServer = require('../server/server.js');

const app = createServer();

describe('Jest Integration Test', () => {
  test('GET /test', async () => {
    await request(app)
      .get('/test')
      .expect(200)
      .then(response => {
        const res = response.body;
        console.log('RES ', res)
        expect(typeof res === 'object').toBe(true);
        expect(res.message).toBe('Success!');
      })
  })
})
