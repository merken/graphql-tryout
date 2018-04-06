var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./src/main.ts",
  target: 'node',

  output: {
    filename: 'main.js',
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      'src',
    ]
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        test: /\.ts$/,
        ts: {
          compiler: 'typescript',
          configFileName: 'tsconfig.json'
        },
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.ts$/,
      loaders: 'awesome-typescript-loader'
    },
    { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }]
  },


  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: [nodeExternals()]
};