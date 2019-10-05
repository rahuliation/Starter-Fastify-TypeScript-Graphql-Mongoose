const path = require('path');
const config = require('./tsconfig.json');
const nodeExternals = require('webpack-node-externals');
const shell = require('shelljs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

const outDir = config.compilerOptions.outDir;
const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
              }
            ]
        }
    ]
  },
  node: {
    __dirname: false
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, outDir),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  context: path.join(__dirname, '.'),
  plugins: [
    new CopyWebpackPlugin([
            { from: 'static', to: 'static' }
    ]),
    new WebpackShellPlugin({
        onBuildEnd:{
          scripts: ['npm run run:dev'],
          blocking: false,
          parallel: true
        }
      })
  ],
  externals: [ nodeExternals() ]
}