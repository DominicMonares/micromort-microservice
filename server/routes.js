const express = require('express');

const {
  validateCommuterID,
  validateTimestamps,
  validateActions,
  validateUnits,
  validateQuantities
} = require('../helpers/validation.js');

const router = express.Router();

router.post('/commute', async (req, res) => {
  const commuterID = req.body.commuterID;
  const factors = req.body.actions;
  const commuterIDValid = validateCommuterID(commuterID);
  const timestampsValid = validateTimestamps(factors.map(f => f.ts));
  const actionsValid = validateActions(factors.map(f => f.action));
  const unitsValid = validateUnits(factors.map(f => f.unit));
  const quantitiesValid = validateQuantities(factors.map(f => f.quantity));
  const requestValid = commuterIDValid && timestampsValid && actionsValid && unitsValid && quantitiesValid;

  if (requestValid) {
    // await model function
    // return model function result
    console.log('DATA IS VALID');

    res.send({ //temporary hardcode
      commuterID: 'COM-1',
      riskFactor: 10
    });
  } else {
    res.status(500).send({
      commuterID: commuterIDValid,
      timestamp: timestampsValid,
      action: actionsValid,
      unit: unitsValid,
      quantities: quantitiesValid
    });
  }
})

module.exports = router;
