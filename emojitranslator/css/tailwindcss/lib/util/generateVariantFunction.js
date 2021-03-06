"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateVariantFunction;

var _lodash = _interopRequireDefault(require("lodash"));

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssSelectorParser = _interopRequireDefault(require("postcss-selector-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateVariantFunction(generator) {
  return (container, config) => {
    const cloned = _postcss.default.root({
      nodes: container.clone().nodes
    });

    container.before(_lodash.default.defaultTo(generator({
      container: cloned,
      separator: config.separator,
      modifySelectors: modifierFunction => {
        cloned.each(rule => {
          if (rule.type !== 'rule') {
            return;
          }

          rule.selectors = rule.selectors.map(selector => {
            const className = (0, _postcssSelectorParser.default)(selectors => {
              return selectors.first.filter(({
                type
              }) => type === 'class').pop().value;
            }).transformSync(selector);
            return modifierFunction({
              className,
              selector
            });
          });
        });
        return cloned;
      }
    }), cloned).nodes);
  };
}