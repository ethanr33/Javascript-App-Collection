"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _postcss = _interopRequireDefault(require("postcss"));

var _node = _interopRequireDefault(require("postcss/lib/node"));

var _escapeClassName = _interopRequireDefault(require("../util/escapeClassName"));

var _generateVariantFunction = _interopRequireDefault(require("../util/generateVariantFunction"));

var _parseObjectStyles = _interopRequireDefault(require("../util/parseObjectStyles"));

var _prefixSelector = _interopRequireDefault(require("../util/prefixSelector"));

var _wrapWithVariants = _interopRequireDefault(require("../util/wrapWithVariants"));

var _increaseSpecificity = _interopRequireDefault(require("../util/increaseSpecificity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles]);
  }

  return _lodash.default.flatMap(styles, style => style instanceof _node.default ? style : (0, _parseObjectStyles.default)(style));
}

function _default(plugins, config) {
  const pluginBaseStyles = [];
  const pluginComponents = [];
  const pluginUtilities = [];
  const pluginVariantGenerators = {};

  const applyConfiguredPrefix = selector => {
    return (0, _prefixSelector.default)(config.prefix, selector);
  };

  const getConfigValue = (path, defaultValue) => _lodash.default.get(config, path, defaultValue);

  plugins.forEach(plugin => {
    plugin({
      postcss: _postcss.default,
      config: getConfigValue,
      theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
      variants: (path, defaultValue) => {
        if (Array.isArray(config.variants)) {
          return config.variants;
        }

        return getConfigValue(`variants.${path}`, defaultValue);
      },
      e: _escapeClassName.default,
      prefix: applyConfiguredPrefix,
      addUtilities: (utilities, options) => {
        const defaultOptions = {
          variants: [],
          respectPrefix: true,
          respectImportant: true
        };
        options = Array.isArray(options) ? Object.assign({}, defaultOptions, {
          variants: options
        }) : _lodash.default.defaults(options, defaultOptions);

        const styles = _postcss.default.root({
          nodes: parseStyles(utilities)
        });

        styles.walkRules(rule => {
          if (options.respectPrefix) {
            rule.selector = applyConfiguredPrefix(rule.selector);
          }

          if (options.respectImportant && _lodash.default.get(config, 'important')) {
            if (config.important === true) {
              rule.walkDecls(decl => decl.important = true);
            } else if (typeof config.important === 'string') {
              rule.selectors = rule.selectors.map(selector => {
                return (0, _increaseSpecificity.default)(config.important, selector);
              });
            }
          }
        });
        pluginUtilities.push((0, _wrapWithVariants.default)(styles.nodes, options.variants));
      },
      addComponents: (components, options) => {
        options = Object.assign({
          respectPrefix: true
        }, options);

        const styles = _postcss.default.root({
          nodes: parseStyles(components)
        });

        styles.walkRules(rule => {
          if (options.respectPrefix) {
            rule.selector = applyConfiguredPrefix(rule.selector);
          }
        });
        pluginComponents.push(...styles.nodes);
      },
      addBase: baseStyles => {
        pluginBaseStyles.push(...parseStyles(baseStyles));
      },
      addVariant: (name, generator) => {
        pluginVariantGenerators[name] = (0, _generateVariantFunction.default)(generator);
      }
    });
  });
  return {
    base: pluginBaseStyles,
    components: pluginComponents,
    utilities: pluginUtilities,
    variantGenerators: pluginVariantGenerators
  };
}