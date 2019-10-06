const path = require('path');
const config = require('./tsconfig.json');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

const outDir = config.compilerOptions.outDir;
const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  devtool: false,
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
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
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