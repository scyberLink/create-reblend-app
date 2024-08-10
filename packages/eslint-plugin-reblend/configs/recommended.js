'use strict';

const all = require('./all');

module.exports = Object.assign({}, all, {
  languageOptions: all.languageOptions,
  rules: {
    'reblend/display-name': 2,
    'reblend/jsx-key': 2,
    'reblend/jsx-no-comment-textnodes': 2,
    'reblend/jsx-no-duplicate-props': 2,
    'reblend/jsx-no-target-blank': 2,
    'reblend/jsx-no-undef': 2,
    'reblend/jsx-uses-reblend': 2,
    'reblend/jsx-uses-vars': 2,
    'reblend/no-children-prop': 2,
    'reblend/no-danger-with-children': 2,
    'reblend/no-deprecated': 2,
    'reblend/no-direct-mutation-state': 2,
    'reblend/no-find-dom-node': 2,
    'reblend/no-is-mounted': 2,
    'reblend/no-render-return-value': 2,
    'reblend/no-string-refs': 2,
    'reblend/no-unescaped-entities': 2,
    'reblend/no-unknown-property': 2,
    'reblend/no-unsafe': 0,
    'reblend/prop-types': 2,
    'reblend/reblend-in-jsx-scope': 2,
    'reblend/require-render-return': 2,
  },
});

// this is so the `languageOptions` property won't be warned in the new config system
Object.defineProperty(module.exports, 'languageOptions', { enumerable: false });
