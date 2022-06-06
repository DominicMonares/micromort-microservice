const { dateValid, timeValid } = require('./timestamps.js');
const { unitRules } = require('../rules.js');

const validateCommuterID = (id) => {
  if (typeof id !== 'string' || id.split('-').length !== 2) { return false }

  id = id.split('-');
  id[0] === 'COM' && Number(id[1] > 0) ? true : false;
}

const validateTimestamps = (timestamps) => {
  return timestamps.every(t => {
    if (typeof t !== 'string' || t.split(' ').length !== 2) { return false }

    t = t.split(' ');
    dateValid(t[0]) && timeValid(t[1]) ? true : false;
  });
}

const validateActions = (actions) => {
  return actions.every(a => typeof actions === 'string');
}

const validateUnits = (units) => {
  return units.every(u => {
    unitRules[u] ? true : false;
  })
}

const validateQuantities = (quantities) => {
  return quantities.every(q => {
    typeof q !== 'number' || q <= 0 ? false : true;
  });
}

module.exports = {
  validateCommuterID: validateCommuterID,
  validateTimestamps: validateTimestamps,
  validateActions: validateActions,
  validateUnits: validateUnits,
  validateQuantities: validateQuantities
}
