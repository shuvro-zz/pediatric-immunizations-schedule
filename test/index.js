import { expect } from 'chai';
import { firstReceivedImmInfo } from './helpers.js';
import { ImmunizationTable } from '../src/main.js';

describe('pediatrics immunizations schedule', () => {
  let immunizationTable;

  describe('when there are unused immunizations', () => {
    let unusedPatientImmunizations;

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
      unusedPatientImmunizations = immunizationTable.unusedPatientImmunizations;
    });

    it('sets them on unusedPatientImmunizations', () => {
      expect(unusedPatientImmunizations.length).to.equal(1);
      expect(unusedPatientImmunizations[0].product.name).to.equal('Cooties Shot');
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
