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
  const factors = req.body.action;
  const commuterIDValid = validateCommuterID(commuterID);
  const timestampsValid = validateTimestamps(factors.map(f => f.ts));
  const actionsValid = validateActions(factors.map(f => f.action));
  const unitsValid = validateUnits(factors.map(u => u.unit));
  const quantitiesValid = validateQuantities(factors.map(q => q.unit));
  const requestValid = commuterIDValid && timestampsValid && actionsValid && unitsValid && quantitiesValid;

  if (requestValid) {
    // await model function
    // return model function result

    res.send({ //temporary hardcode
      commuterID: 'COM-1',
      risk: 10
    })
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
