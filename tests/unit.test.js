const { dateValid, timeValid, sameDay } = require('../helpers/timestamps.js');
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
      expect(validateCommuterID('COM-101')).toBe(true);
    });

    it('should return false for invalid commuter ID numbers', () => {
      expect(validateCommuterID('COM-Z')).toBe(false);
    });

    it('should return false for invalid commuter ID prefixes', () => {
      expect(validateCommuterID('MOC-101')).toBe(false);
    });

    it('should return false for invalid commuter ID type', () => {
      expect(validateCommuterID(101)).toBe(false);
    });

    it('should return false for improperly separated commuter IDs', () => {
      expect(validateCommuterID('COM:101')).toBe(false);
    });

  });

  describe('Timestamps', () => {

    describe('Validation', () => {

      it('should return true for valid timestamps', () => {
        const timestamps = ['2022-01-01 10:05:11', '2022-01-01 10:16:52'];
        expect(validateTimestamps(timestamps)).toBe(true);
      });

      it('should return false for invalid timestamp type', () => {
        const timestamps = [20220101100511];
        expect(validateTimestamps(timestamps)).toBe(false);
      });

      it('should return false for invalid timestamp length', () => {
        const timestamps = ['2022-01-01 10:05:11:53'];
        expect(validateTimestamps(timestamps)).toBe(false);
      });

    })

    describe('Dates', () => {

      it('should return true for valid dates', () => {
        expect(dateValid('2022-11-23')).toBe(true);
      });

      it('should return false for improperly separated dates', () => {
        expect(dateValid('2022/11/23')).toBe(false);
      })

      it('should return false for invalid year', () => {
        expect(dateValid('20221-11-23')).toBe(false);
      })

      it('should return false for invalid months', () => {
        expect(dateValid('2022-13-01')).toBe(false);
      });

      it('should return false for invalid days', () => {
        expect(dateValid('2022-01-32')).toBe(false);
      });

    });

    describe('Times', () => {

      it('should return true for valid times', () => {
        expect(timeValid('10:05:11')).toBe(true);
      });

      it('should return false for improperly separated times', () => {
        expect(timeValid('25-05-11')).toBe(false);
      });

      it('should return false for invalid hours', () => {
        expect(timeValid('25:05:11')).toBe(false);
      });

      it('should return false for invalid minutes', () => {
        expect(timeValid('10:60:11')).toBe(false);
      });

      it('should return false for invalid seconds', () => {
        expect(timeValid('10:05:60')).toBe(false);
      });

    });

    describe('Same Day', () => {

      it('should return true for same day results', () => {
        const timestamps = ['2022-01-01 10:05:11', '2022-01-01 10:16:52'];
        expect(sameDay(timestamps)).toBe(true);
      })

      it('should return false for improperly separated timestamps', () => {
        const timestamps = ['2022 01 01 10:05:11'];
        expect(sameDay(timestamps)).toBe(false);
      })

      it('should return false for improperly separated dates', () => {
        const timestamps = ['2022-01-01-12 10:05:11'];
        expect(sameDay(timestamps)).toBe(false);
      })

      it('should return false for different day results', () => {
        const timestamps = ['2022-01-01 10:05:11', '2022-01-11 10:16:52'];
        expect(sameDay(timestamps)).toBe(false);
      })

    });

  });

  describe('Actions', () => {

    it('should return true for valid actions', () => {
      const actions = ['surfed through lava', 'unicycled in bike lane'];
      expect(validateActions(actions)).toBe(true);
    });

    it('should return false for invalid actions', () => {
      const actions = ['swam through cola', 101];
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

    it('should return false for invalid quantities', () => {
      const quantities = [54, '63'];
      expect(validateQuantities(quantities)).toBe(false);
    });

  });

})
