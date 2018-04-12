module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'commons.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
