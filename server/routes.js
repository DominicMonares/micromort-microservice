const express = require('express');
const { PythonShell } = require('python-shell');
const pyshell = new PythonShell('../micromort.py');

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
    let micromort;
    pyshell.send(JSON.stringify(req.body));


    // awaiting in case actual model function contains async code
    await pyshell.on('message', function(message) {
      console.log('PYTHON RES ', message);
      micromort = message;
    });

    pyshell.end(function(err) {
      console.log('END')
      if (err) { throw err }
    });

    res.send({
      commuterID: commuterID,
      micromort: micromort
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
