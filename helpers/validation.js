const validateCommuterID = (commuterID) => {
  if (typeof id !== 'string' || commuterID.split('-').length !== 2) {
    return false;
  }

  const id = commuterID.split('-');
  const validNumber = Number(id[1]) > 0;
  if (id[0] === 'COM' && validNumber) {
    return true;
  } else {
    return false;
  }
}

const validateTimestamps = () => {

}

const validateActions = () => {

}

const validateUnits = () => {

}

const validateQuantities = () => {

}

module.exports = {
  validateCommuterID: validateCommuterID,
  validateTimestamps: validateTimestamps,
  validateActions: validateActions,
  validateUnits: validateUnits,
  validateQuantities: validateQuantities
}
