import { expect } from 'chai';
import { firstReceivedImmInfo } from './helpers.js';
import { ImmunizationTable } from '../src/main.js';

describe('pediatrics immunizations schedule', () => {
  let immunizationTable;

  describe('when there are unmatched immunizations', () => {
    let unmatchedPatientImmunizations;

    beforeEach(() => {
      let options = {
        patientImmunizationHistory: [
          {
            date: '05/10/2016',
            product: {
              name: 'Pediatric Measles, Mumps and Rubella Vaccine (MMRV)'
            }
          },
          {
            date: '05/11/2016',
            product: {
              name: 'Cooties Shot'
            }
          }
        ]
      }

      immunizationTable = new ImmunizationTable(options);
      unmatchedPatientImmunizations = immunizationTable.unmatchedPatientImmunizations;
    });

    it('sets them on unmatchedPatientImmunizations', () => {
      expect(unmatchedPatientImmunizations.length).to.equal(1);
      expect(unmatchedPatientImmunizations[0].product.name).to.equal('Cooties Shot');
    });
  });

  describe('the generated table in the dom', () => {
    let targetContainer, generatedTable;

    beforeEach(() => {
      let options = {
        patientImmunizationHistory: [
          {
            date: '05/10/2016',
            product: {
              name: 'Pediatric Measles, Mumps and Rubella Vaccine (MMRV)'
            }
          }
        ]
      }

      immunizationTable = new ImmunizationTable(options);
      targetContainer = document.createElement('div');
      document.body.appendChild(targetContainer);
      immunizationTable.append(targetContainer);
      generatedTable =  document.querySelector('.pediatric-immunizations-schedule');
    });

    afterEach(() => {
      document.body.removeChild(targetContainer);
    });


    it('should exist', () => {
      expect(generatedTable).to.not.equal(null);
    });

    it('should contain 10 table rows, one for each immunization in default schedule', () => {
      const numberOfRows = document.querySelector('.pediatric-immunizations-schedule')
                            .querySelectorAll('tr')
                            .length;
      expect(numberOfRows).to.equal(10);
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
