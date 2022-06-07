const express = require('express');
const router = express.Router();

const {
  validateCommuterID,
  validateTimestamps,
  validateActions,
  validateUnits,
  validateQuantities
} = require('../helpers/validation.js');


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
    const { PythonShell } = require('python-shell');
    const pyshell = new PythonShell('micromort.py');

    pyshell.send(JSON.stringify(req.body));

    // awaiting in case actual model contains async code
    await pyshell.on('message', (message) => {
      res.send({
        commuterID: commuterID,
        micromort: message
      });
    });

    pyshell.end(function (err, code, signal) {
      if (err) throw err;
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
