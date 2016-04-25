var yaml = require('js-yaml');
var vacSchedYml = require('raw!./immunization-schedule.yml');
var _ = require('underscore');

var ImmunizationTable = function ImmunizationTable(container, options) {
  var defaults = {
    patientImmunizationHistory: [],
    ccdaImport: null, // TODO: accept passing in a CCDA XML string
    highlightDosesDue: false, // TODO: allow disabling recommended dose highlighting
    patientAgeMonths: null
  };
  this.options = _.extend(defaults, options);

  this.vacSched = yaml.load(vacSchedYml);

  this.nameMatchTester = function(name, patientImmunization) {
    return new RegExp('\\b'+name+'\\b').test( patientImmunization.product.name.toLowerCase() );
  }

  this.patientImmunizationMatchesVacSchedItem = function(patientImmunization, vacSchedItem) {
    if ( vacSchedItem.name_matches.some((name) => { return this.nameMatchTester(name, patientImmunization) } )) {
      return true;
    }
  }

  this.mergeImmunizationHistoryWithSchedule = function(vacSched, patientImmunizationHistory) {
    patientImmunizationHistory.map((patientImmunization) => {
      vacSched.immunizations.map((vacSchedItem, idx) => {
        if (this.patientImmunizationMatchesVacSchedItem(patientImmunization, vacSchedItem)) {
          vacSched.immunizations[idx].patientImmunizations.push(patientImmunization);
        }
      });
    });
  }

  this.populateRecommendedAgeText = function(cell, vac, dose_number) {
    if(typeof vac.dose_age_recommendation !== "undefined") {
      var recSpan = cell.appendChild(document.createElement('span'));
      recSpan.className = 'recommended-age';
      recSpan.innerHTML = "Rec: " + vac.dose_age_recommendation[dose_number-1].name;
    }
  }

  this.populatePatientImmunization = function(cell, vac, dose_number, options) {
    var immunization = vac.patientImmunizations[dose_number-1];
    if(vac.patientImmunizations.length > 0) {
      if(typeof immunization !== 'undefined') {
        var span = document.createElement('span');
        span.innerHTML = immunization.product.name + ' - ' + immunization.date;
        cell.className = 'received';
        cell.appendChild(span);
      }
    }
  }

  this.checkForDue = function(cell, vac, dose_number, options) {
    if(typeof vac.dose_age_recommendation !== 'undefined' && typeof vac.dose_age_recommendation[dose_number-1] !== 'undefined') {
      if(options.patientAgeMonths) {
        if(options.patientAgeMonths > vac.dose_age_recommendation[dose_number-1]['month_span'][0]) {
          cell.className = 'due';
        };
      };
    };
  }

  this.mergeImmunizationHistoryWithSchedule(this.vacSched, this.options.patientImmunizationHistory);

  var table = document.createElement('table'),
      tbody = document.createElement('tbody');

  table.className = 'immunization-table';
  table.appendChild(tbody);

  this.vacSched.immunizations.map((vac, idx) => {
    var row = tbody.insertRow(idx);
    var mainCell = row.insertCell();
    mainCell.appendChild(document.createTextNode(vac.name));
    mainCell.className = 'main-cell';
    if(typeof vac.combo_vaccines !== "undefined") {
      mainCell.appendChild(document.createTextNode(vac.combo_vaccines));
    }

    for (var i = 1; i <= this.vacSched.max_dose_count; i++) {
      var cell = row.insertCell(i);
      if (i > vac.total_doses) {
        cell.className = 'disabledCell';
      } else {
        this.checkForDue(cell, vac, i, this.options);
        this.populateRecommendedAgeText(cell, vac, i);
        this.populatePatientImmunization(cell, vac, i, this.options);
      }
    }
  }, this);

  container.innerHTML = '';
  container.appendChild(table);
}

exports.ImmunizationTable = ImmunizationTable;
