const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;
const deps1 = require('../package.json').devDependencies;

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin ({
      name: 'container',
      // remotes: {
      //   marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      // },

      shared: {
        ...deps,
        react: { singleton:true,eager:true,requiredVersion: deps.react },
        'react-dom': {
          singleton:true,
          eager:true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
