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

describe('Risk in Micromorts - Integration', () => {

  const app = createServer();

  describe('Valid Data Handling', () => {
    test('POST /commute COM-1', async () => {
      const res = await request(app)
        .post('/commute')
        .send(com_1)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body.commuterID).toBe('COM-1');
      expect(res.body.micromorts).toBe(10);
    });

    test('POST /commute COM-42', async () => {
      const res = await request(app)
        .post('/commute')
        .send(com_42)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body.commuterID).toBe('COM-42');
      expect(res.body.micromorts).toBe(105124);
    });

    test('POST /commute COM-64', async () => {
      const res = await request(app)
        .post('/commute')
        .send(com_64)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body.commuterID).toBe('COM-64');
      expect(res.body.micromorts).toBe(90);
    });
  })

  describe('Invalid Data Handling', () => {
    it('should handle invalid commuter ID number', async () => {
      const res = await request(app)
        .post('/commute')
        .send(commuterID1)
        .set('Accept', 'application/json')
        .expect(500)
        .expect('Content-Type', /json/);

      const body = res.body;
      const commuterID = body.commuterID;
      const errors = body.errors;
      expect(commuterID).toBe('COM-Z');
      expect(errors.commuterID).toBe(false);
      expect(errors.timestamps).toBe(true);
      expect(errors.actions).toBe(true);
      expect(errors.units).toBe(true);
      expect(errors.quantities).toBe(true);
    });

    it('should handle invalid commuter ID prefix', async () => {
      const res = await request(app)
        .post('/commute')
        .send(commuterID2)
        .set('Accept', 'application/json')
        .expect(500)
        .expect('Content-Type', /json/);

        const body = res.body;
        const commuterID = body.commuterID;
        const errors = body.errors;
        expect(commuterID).toBe('MOC-1');
        expect(errors.commuterID).toBe(false);
        expect(errors.timestamps).toBe(true);
        expect(errors.actions).toBe(true);
        expect(errors.units).toBe(true);
        expect(errors.quantities).toBe(true);
    });

    it('should handle invalid timestamps', async () => {
      const res = await request(app)
        .post('/commute')
        .send(timestamp)
        .set('Accept', 'application/json')
        .expect(500)
        .expect('Content-Type', /json/);

        const body = res.body;
        const commuterID = body.commuterID;
        const errors = body.errors;
        expect(commuterID).toBe('COM-42');
        expect(errors.commuterID).toBe(true);
        expect(errors.timestamps).toBe(false);
        expect(errors.actions).toBe(true);
        expect(errors.units).toBe(true);
        expect(errors.quantities).toBe(true);
    });

    it('should handle invalid actions', async () => {
      const res = await request(app)
        .post('/commute')
        .send(action)
        .set('Accept', 'application/json')
        .expect(500)
        .expect('Content-Type', /json/);

        const body = res.body;
        const commuterID = body.commuterID;
        const errors = body.errors;
        expect(commuterID).toBe('COM-1');
        expect(errors.commuterID).toBe(true);
        expect(errors.timestamps).toBe(true);
        expect(errors.actions).toBe(false);
        expect(errors.units).toBe(true);
        expect(errors.quantities).toBe(true);
    });

    it('should handle invalid units', async () => {
      const res = await request(app)
        .post('/commute')
        .send(unit)
        .set('Accept', 'application/json')
        .expect(500)
        .expect('Content-Type', /json/);

        const body = res.body;
        const commuterID = body.commuterID;
        const errors = body.errors;
        expect(commuterID).toBe('COM-64');
        expect(errors.commuterID).toBe(true);
        expect(errors.timestamps).toBe(true);
        expect(errors.actions).toBe(true);
        expect(errors.units).toBe(false);
        expect(errors.quantities).toBe(true);
    });

    it('should handle invalid quantity type', async () => {
      const res = await request(app)
        .post('/commute')
        .send(quantity1)
        .set('Accept', 'application/json')
        .expect(500)
        .expect('Content-Type', /json/);

        const body = res.body;
        const commuterID = body.commuterID;
        const errors = body.errors;
        expect(commuterID).toBe('COM-42');
        expect(errors.commuterID).toBe(true);
        expect(errors.timestamps).toBe(true);
        expect(errors.actions).toBe(true);
        expect(errors.units).toBe(true);
        expect(errors.quantities).toBe(false);
    });

    it('should handle negative quantities', async () => {
      const res = await request(app)
        .post('/commute')
        .send(quantity2)
        .set('Accept', 'application/json')
        .expect(500)
        .expect('Content-Type', /json/);

        const body = res.body;
        const commuterID = body.commuterID;
        const errors = body.errors;
        expect(commuterID).toBe('COM-42');
        expect(errors.commuterID).toBe(true);
        expect(errors.timestamps).toBe(true);
        expect(errors.actions).toBe(true);
        expect(errors.units).toBe(true);
        expect(errors.quantities).toBe(false);
    });

  });

});
