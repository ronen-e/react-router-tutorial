var fs = require('fs')
var path = require('path')

function getExternals() {
    const nodeModules = fs.readdirSync(path.resolve(__dirname, 'node_modules'))
            .concat([
                'react-dom/server',
                'react/addons',
            ]);

    const externals = nodeModules.reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext;
    }, {});

    return externals;
}

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: getExternals(),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

}
