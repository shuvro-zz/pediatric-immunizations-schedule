## About

#### [Demo](http://)

A small js library for displaying a pediatric immunizations schedule based on CDC recommendations.

## Install

The package can be installed with npm:

`npm install pediatric-immunizations-schedule`

## Usage

Include the library in your app using the CommonJS style:

`var ImmunizationTable = require('pediatric-immunizations-schedule/ImmunizationTable');`

Or in the ES6 import style:

`import {ImmunizationTable} from './pediatric-immunizations-chart.js';`

You can also include the JS file via UMD:

``<script type="text/javascript" src="./dist/pediatric-immunizations-chart.js" charset="utf-8"></script>`

To load the immunization table into your view:

`new ImmunizationTable([chartContainer], [options]);`

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

## Development and building

To setup the app for development:

1. `npm install`
2. `webpack-dev-server --inline` (*inline* enables automatic restarts upon code changes)

App will then be running at localhost:8080

To build a new release:

`webpack --optimize-minimize`
