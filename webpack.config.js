var path = require("path");
module.exports = {
  entry: {
    app: ["./src/main.js"]
  },
  output: {
    libraryTarget: 'umd',
    filename: "./dist/pediatric-immunizations-chart.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
