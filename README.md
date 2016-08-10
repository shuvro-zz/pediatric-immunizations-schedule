## About

#### [Demo](http://icu.iorahealth.com/pediatric-immunizations-schedule/)

A small js library for displaying a pediatric immunizations schedule based on CDC recommendations.

The immunization schedule is defined in YAML format here: https://github.com/IoraHealth/pediatric-immunization-schedule/blob/master/src/immunization-schedule.yml Customizing the schedule for different organizations and patient populations is as simple as updating that file. Vaccine name matches that satisfy an immunization "dose" can also be tuned in that file. Matching on codes is currently not supported.

## Install

The package can be installed with npm:

`npm install pediatric-immunizations-schedule`

## Usage

Include the library in your app using the CommonJS style:

`var ImmunizationTable = require('pediatric-immunizations-schedule/ImmunizationTable');`

Or in the ES6 import style:

`import {ImmunizationTable} from 'pediatric-immunizations-schedule';`

You can also include the JS file via UMD:

``<script type="text/javascript" src="./dist/pediatric-immunizations-chart.js" charset="utf-8"></script>`

To load the immunization table into your view:

```
immunizationTable = new ImmunizationTable([options]);
immunizationTable.append(chartContainer)

```

`chartContainer` needs to be a reference to the a dom element and `options` is an object. The bare minimum for the options object is an empty object `{}`.

Example `options` object:

```
options = {
  patientImmunizationHistory: {
    {
      "date": "05/10/2012",
      "product": {
        "name": "HepB Vaccine"
      }
    },
    {
      "date": "08/10/2012",
      "product": {
        "name": "HepB Vaccine"
      }
    },
    {
      "date": "08/10/2012",
      "product": {
        "name": "DTaP-Hib-IPV"
      }
    }
  },
  patientAgeMonths: 12
};
```

Passing in the patient age months will cause the table to highlight doses that the patient may have missed.

A JSON object using the BlueButton.js immunization data structure can be passed into the library to display a patient's immunization history.

See the source code of the demo for an example.

If you pass in an item in the patientImmunizationHistory object that doesn't match any of the configured immunizations (and therefore won't show up in the table), they are collected and accessible on ```immunizationTable.unusedPatientImmunizations```

## Development

To setup the app for development:

1. `npm install`
2. `webpack-dev-server --inline` (*inline* enables automatic restarts upon code changes)

App will then be running at localhost:8080

#### Testing

This library uses mocha for testing w/ the Karma runner. Right now it requires Chrome as the launcher (TODO: support phantomjs runs).

To run karma in continuous mode that re-runs tests when files change:

`karma start`

To run tests in single-run mode (for CI):

`karma start --single-run`

#### Build and publish a new release

1. Create dist files: `webpack --optimize-minimize`
- `npm version <update_type>` (See: https://docs.npmjs.com/getting-started/publishing-npm-packages#updating-the-package)
- Push changed files to master

To update the demo in gh-pages:

1. `git checkout gh-pages`
2. `git rebase master`
3. `git push origin gh-pages`
