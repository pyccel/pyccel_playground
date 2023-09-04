// config-overrides.js

const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config:any , env:any) {
  config.plugins.push(new MonacoWebpackPlugin())
  return config;
}