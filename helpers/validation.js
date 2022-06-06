const { dateValid, timeValid } = require('./timestamps.js');
const { unitRules } = require('../rules.js');

const validateCommuterID = (commuterID) => {
  if (typeof commuterID !== 'string' || commuterID.split('-').length !== 2) {
    return false
  }

  const id = commuterID.split('-');
  return id[0] === 'COM' && Number(id[1] > 0) ? true : false;
}

const validateTimestamps = (timestamps) => {
  return timestamps.every(t => {
    if (typeof t !== 'string' || t.split(' ').length !== 2) { return false }

    const time = t.split(' ');
    return dateValid(time[0]) && timeValid(time[1]) ? true : false;
  });
}

const validateActions = (actions) => {
  return actions.every(a => { return typeof a === 'string' });
}

const validateUnits = (units) => {
  return units.every(u => {
    return unitRules[u] ? true : false;
  })
}

const validateQuantities = (quantities) => {
  return quantities.every(q => {
    return typeof q === 'number' && q > 0 ? true : false;
  });
}

module.exports = {
  validateCommuterID: validateCommuterID,
  validateTimestamps: validateTimestamps,
  validateActions: validateActions,
  validateUnits: validateUnits,
  validateQuantities: validateQuantities
}
