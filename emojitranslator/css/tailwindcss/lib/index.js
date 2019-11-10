"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _postcss = _interopRequireDefault(require("postcss"));

var _registerConfigAsDependency = _interopRequireDefault(require("./lib/registerConfigAsDependency"));

var _processTailwindFeatures = _interopRequireDefault(require("./processTailwindFeatures"));

var _formatCSS = _interopRequireDefault(require("./lib/formatCSS"));

var _resolveConfig = _interopRequireDefault(require("./util/resolveConfig"));

var _constants = require("./constants");

var _defaultConfigStub = _interopRequireDefault(require("../stubs/defaultConfig.stub.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveConfigPath(filePath) {
  // require('tailwindcss')({ theme: ..., variants: ... })
  if (_lodash.default.isObject(filePath) && !_lodash.default.has(filePath, 'config') && !_lodash.default.isEmpty(filePath)) {
    return undefined;
  } // require('tailwindcss')({ config: 'custom-config.js' })


  if (_lodash.default.isObject(filePath) && _lodash.default.has(filePath, 'config') && _lodash.default.isString(filePath.config)) {
    return _path.default.resolve(filePath.config);
  } // require('tailwindcss')({ config: { theme: ..., variants: ... } })


  if (_lodash.default.isObject(filePath) && _lodash.default.has(filePath, 'config') && _lodash.default.isObject(filePath.config)) {
    undefined;
  } // require('tailwindcss')('custom-config.js')


  if (_lodash.default.isString(filePath)) {
    return _path.default.resolve(filePath);
  } // require('tailwindcss')


  try {
    const defaultConfigPath = _path.default.resolve(_constants.defaultConfigFile);

    _fs.default.accessSync(defaultConfigPath);

    return defaultConfigPath;
  } catch (err) {
    return undefined;
  }
}

const getConfigFunction = config => () => {
  if (_lodash.default.isUndefined(config) && !_lodash.default.isObject(config)) {
    return (0, _resolveConfig.default)([_defaultConfigStub.default]);
  }

  if (!_lodash.default.isObject(config)) {
    delete require.cache[require.resolve(config)];
  }

  return (0, _resolveConfig.default)([_lodash.default.isObject(config) ? _lodash.default.get(config, 'config', config) : require(config), _defaultConfigStub.default]);
};

const plugin = _postcss.default.plugin('tailwind', config => {
  const plugins = [];
  const resolvedConfigPath = resolveConfigPath(config);

  if (!_lodash.default.isUndefined(resolvedConfigPath)) {
    plugins.push((0, _registerConfigAsDependency.default)(resolvedConfigPath));
  }

  return (0, _postcss.default)([...plugins, (0, _processTailwindFeatures.default)(getConfigFunction(resolvedConfigPath || config)), _formatCSS.default]);
});

module.exports = plugin;