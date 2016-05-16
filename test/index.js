import { expect } from 'chai';
import { firstReceivedImmInfo } from './helpers.js';
import { ImmunizationTable } from '../src/main.js';

describe('pediatrics immunizations schedule', () => {
  let targetContainer, immunizationTable, patientImmunizationHistory, options;

  beforeEach(() => {
    targetContainer = document.createElement('div');
    patientImmunizationHistory = [
      {
        date: '05/10/2016',
        product: {
          name: 'Pediatric Measles, Mumps and Rubella Vaccine (MMRV)'
        }
      }
    ];
    options = {
      patientImmunizationHistory: patientImmunizationHistory
    }

    document.body.appendChild(targetContainer);
    immunizationTable = new ImmunizationTable(targetContainer, options);
  });

  afterEach(() => {
    document.body.removeChild(targetContainer);
  });

  describe('the generated table in the dom', () => {
    let generatedTable;

    beforeEach(() => {
      generatedTable =  document.querySelector('.pediatric-immunizations-schedule');
    });

    it('should exist', () => {
      expect(generatedTable).to.not.equal(null);
    });

    it('should contain 12 table rows, one for each immunization in default schedule', () => {
      const numberOfRows = document.querySelector('.pediatric-immunizations-schedule')
                            .querySelectorAll('tr')
                            .length;
      expect(numberOfRows).to.equal(12);
    });

    it('should show the matched items from the patient immunization history', () => {
      const expectedText = 'Pediatric Measles, Mumps and Rubella Vaccine (MMRV) - 05/10/2016';
      const varicellaReceivedInfo = firstReceivedImmInfo('varicella');
      const mmrReceivedInfo = firstReceivedImmInfo('mmr');

      expect(varicellaReceivedInfo).to.equal(expectedText);
      expect(mmrReceivedInfo).to.equal(expectedText);
    });
  });
});
