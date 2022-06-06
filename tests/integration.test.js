const request = require('supertest');

const createServer = require('../server/server.js');
const com_1 = require('./sample_data/com-1.json');
const com_42 = require('./sample_data/com-42.json');
const com_64 = require('./sample_data/com-64.json');
const {
  commuterID1,
  commuterID2,
  timestamp,
  action,
  unit,
  quantity1,
  quantity2
} = require('./sample_data/error_samples');

xdescribe('Risk in Micromorts - Integration', () => {

  const app = createServer();

  describe('Valid Data Handling', () => {

    test('POST /commute COM-1', async () => {
      const res = await request(app)
        .post('/commute')
        .send(com_1)
        .set('Accept', 'application/json');

      expect(res.status).toBe(200);
      expect(res.headers['Content-Type']).toMatch(/json/);
      expect(res.body.commuterID).toBe('COM-1');
      expect(res.body.riskFactor).toBe(10);
    });

    test('POST /commute COM-42', async () => {
      const res = await request(app)
        .post('/commute')
        .send(com_42)
        .set('Accept', 'application/json');

      expect(res.status).toBe(200);
      expect(res.headers['Content-Type']).toMatch(/json/);
      expect(res.body.commuterID).toBe('COM-1');
      expect(res.body.riskFactor).toBe(105124);
    });

    test('POST /commute COM-64', async () => {
      const res = await request(app)
        .post('/commute')
        .send(com_64)
        .set('Accept', 'application/json');

      expect(res.status).toBe(200);
      expect(res.headers['Content-Type']).toMatch(/json/);
      expect(res.body.commuterID).toBe('COM-1');
      expect(res.body.riskFactor).toBe(90);
    });

  })

  describe('Invalid Data Handling', () => {

    it('should handle invalid commuter ID number', async () => {
      const res = await request(app)
        .post('/commute')
        .send(commuterID1)
        .set('Accept', 'application/json');

      expect(res.status).toBe(500);
      expect(res.headers['Content-Type']).toMatch(/json/);

      const body = res.body.errors;
      expect(body.commuterID).toBe(false);
      expect(body.timestamp).toBe(true);
      expect(body.action).toBe(true);
      expect(body.unit).toBe(true);
      expect(body.quantity).toBe(true);
    });

    it('should handle invalid commuter ID prefix', async () => {
      const res = await request(app)
        .post('/commute')
        .send(commuterID2)
        .set('Accept', 'application/json');

      expect(res.status).toBe(500);
      expect(res.headers['Content-Type']).toMatch(/json/);

      const body = res.body.errors;
      expect(body.commuterID).toBe(false);
      expect(body.timestamp).toBe(true);
      expect(body.action).toBe(true);
      expect(body.unit).toBe(true);
      expect(body.quantity).toBe(true);
    });

    it('should handle invalid timestamps', async () => {
      const res = await request(app)
        .post('/commute')
        .send(timestamp)
        .set('Accept', 'application/json');

      expect(res.status).toBe(500);
      expect(res.headers['Content-Type']).toMatch(/json/);

      const body = res.body.errors;
      expect(body.commuterID).toBe(true);
      expect(body.timestamp).toBe(false);
      expect(body.action).toBe(true);
      expect(body.unit).toBe(true);
      expect(body.quantity).toBe(true);
    });

    it('should handle invalid actions', async () => {
      const res = await request(app)
        .post('/commute')
        .send(action)
        .set('Accept', 'application/json');

      expect(res.status).toBe(500);
      expect(res.headers['Content-Type']).toMatch(/json/);

      const body = res.body.errors;
      expect(body.commuterID).toBe(true);
      expect(body.timestamp).toBe(true);
      expect(body.action).toBe(false);
      expect(body.unit).toBe(true);
      expect(body.quantity).toBe(true);
    });

    it('should handle invalid units', async () => {
      const res = await request(app)
        .post('/commute')
        .send(unit)
        .set('Accept', 'application/json');

      expect(res.status).toBe(500);
      expect(res.headers['Content-Type']).toMatch(/json/);

      const body = res.body.errors;
      expect(body.commuterID).toBe(true);
      expect(body.timestamp).toBe(true);
      expect(body.action).toBe(true);
      expect(body.unit).toBe(false);
      expect(body.quantity).toBe(true);
    });

    it('should handle invalid quantity type', async () => {
      const res = await request(app)
        .post('/commute')
        .send(quantity1)
        .set('Accept', 'application/json');

      expect(res.status).toBe(500);
      expect(res.headers['Content-Type']).toMatch(/json/);

      const body = res.body.errors;
      expect(body.commuterID).toBe(true);
      expect(body.timestamp).toBe(true);
      expect(body.action).toBe(true);
      expect(body.unit).toBe(true);
      expect(body.quantity).toBe(false);
    });

    it('should handle negative quantities', async () => {
      const res = await request(app)
        .post('/commute')
        .send(quantity2)
        .set('Accept', 'application/json');

      expect(res.status).toBe(500);
      expect(res.headers['Content-Type']).toMatch(/json/);

      const body = res.body.errors;
      expect(body.commuterID).toBe(true);
      expect(body.timestamp).toBe(true);
      expect(body.action).toBe(true);
      expect(body.unit).toBe(true);
      expect(body.quantity).toBe(false);
    });

  });

});
