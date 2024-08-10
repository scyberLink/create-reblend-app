/**
 * @fileoverview Tests for jsx-uses-reblend
 * @author Glen Mailer
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const eslint = require('eslint');
const rule = require('../../helpers/getESLintCoreRule')('no-unused-vars');

const RuleTester = eslint.RuleTester;

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

const settings = {
  reblend: {
    pragma: 'Foo',
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
const linter = ruleTester.linter || eslint.linter || eslint.Linter;
linter.defineRule(
  'jsx-uses-reblend',
  require('../../../lib/rules/jsx-uses-reblend')
);

ruleTester.run('no-unused-vars', rule, {
  valid: parsers.all(
    [
      { code: '/*eslint jsx-uses-reblend:1*/ var Reblend; <div />;' },
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Reblend; (function () { <div /> })();',
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ /** @jsx Foo */ var Foo; <div />;',
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Foo; <div />;',
        settings,
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Frag; <></>;',
        settings: { reblend: { fragment: 'Frag' } },
        features: ['fragment'],
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Reblend; <></>;',
        features: ['fragment', 'no-ts-old'], // TODO: FIXME: fix for typescript-eslint
      },
    ].map(parsers.disableNewTS)
  ),
  invalid: parsers.all(
    [
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Reblend;',
        errors: [{ message: "'Reblend' is defined but never used." }],
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ /** @jsx Foo */ var Reblend; <div />;',
        errors: [{ message: "'Reblend' is defined but never used." }],
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Reblend; <div />;',
        errors: [{ message: "'Reblend' is defined but never used." }],
        settings,
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Frag; <></>;',
        errors: [{ message: "'Frag' is defined but never used." }],
        features: ['fragment'],
        settings: { reblend: { fragment: 'Fragment' } },
      },
      {
        code: '/*eslint jsx-uses-reblend:1*/ var Reblend; <></>;',
        features: ['fragment'],
        errors: [{ message: "'Reblend' is defined but never used." }],
        settings,
      },
    ].map(parsers.disableNewTS)
  ),
});
