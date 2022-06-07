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
    const pyshell = new PythonShell('micromorts.py');

    pyshell.send(JSON.stringify(req.body));

    // awaiting in case actual model function contains async code
    await pyshell.on('message', (message) => {
      res.send({
        commuterID: commuterID,
        micromorts: Number(message)
      });
    });

    pyshell.end(function (err, code, signal) {
      if (err) {
        res.status(500).send({
          errors: { micromort: true }
        });
      }
    });
  } else {
    res.status(500).send({
      errors: {
        commuterID: commuterIDValid,
        timestamps: timestampsValid,
        actions: actionsValid,
        units: unitsValid,
        quantities: quantitiesValid
      }
    });
  }
})

module.exports = router;
