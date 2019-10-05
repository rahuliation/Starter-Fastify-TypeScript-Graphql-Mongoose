const path = require('path');
const config = require('./tsconfig.json');
const nodeExternals = require('webpack-node-externals');
// const exec = require('child_process').exec;
const shell = require('shelljs');

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
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, outDir),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            shell.exec('NODE_ENV=development nodemon ./dist/index.js ', { async : true }, function(code, stdout, stderr) {
                console.log('Exit code:', code);
                console.log('Program output:', stdout);
                console.log('Program stderr:', stderr);
              });
          });
        }
    }
  ],
  externals: [ nodeExternals() ]
}