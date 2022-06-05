const {
  validateCommuterID,
  validateTimestamps,
  validateActions,
  validateUnits,
  validateQuantities
} = require('../helpers/validation.js');

describe('Risk in Micromorts - Unit', () => {

  describe('Commuter IDs', () => {

    it('should return true for valid commuter IDs', () => {
      expect(validateCommuterID('COM-1')).toBe(true);
    });

    it('should return false for invalid commuter ID numbers', () => {
      expect(validateCommuterID('COM-Z')).toBe(false);
    });

    it('should return false for invalid commuter ID prefixes', () => {
      expect(validateCommuterID('MOC-1')).toBe(false);
    });

  });

  describe('Timestamps', () => {

    it('should return true for valid timestamps', () => {
      const timestamps = ['2022-01-01 10:05:11', '2022-01-01 10:16:52'];
      expect(validateTimestamps(timestamps)).toBe(true);
    });

    it('should return false for invalid timestamps', () => {
      const timestamps = ['2022-01-01 10:05:11', '2022-01-11 10:16:52'];
      expect(validateTimestamps(timestamps)).toBe(false);
    });

  });

  describe('Actions', () => {

    it('should return true for valid actions', () => {
      const actions = ['surfed through lava', 'unicycled in bike lane'];
      expect(validateActions(actions)).toBe(true);
    });

    it('should return false for invalid actions', () => {
      const actions = ['swam through cola', 123];
      expect(validateActions(actions)).toBe(false);
    });

  });

  describe('Units', () => {

    it('should return true for valid units', () => {
      const units = ['mile', 'minute', 'floor', 'quantity'];
      expect(validateUnits(units)).toBe(true);
    });

    it('should return false for invalid units', () => {
      const units = ['mile', 'minute', 'parsec', 'quantity'];
      expect(validateUnits(units)).toBe(false);
    });

  });

  describe('Quantities', () => {

    it('should return true for valid quantities', () => {
      const quantities = [54, 63];
      expect(validateQuantities(quantities)).toBe(true);
    });

    it('should return true for valid quantities', () => {
      const quantities = [54, '63'];
      expect(validateQuantities(quantities)).toBe(true);
    });

  });

})
