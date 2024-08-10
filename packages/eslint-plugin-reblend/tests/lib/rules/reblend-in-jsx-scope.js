/**
 * @fileoverview Tests for reblend-in-jsx-scope
 * @author Glen Mailer
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/reblend-in-jsx-scope');

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
ruleTester.run('reblend-in-jsx-scope', rule, {
  valid: parsers.all([
    { code: 'var Reblend, App; <App />;' },
    { code: 'var Reblend; <img />;' },
    {
      code: 'var Reblend; <>fragment</>;',
      features: ['fragment'],
    },
    { code: 'var Reblend; <x-gif />;' },
    { code: 'var Reblend, App, a=1; <App attr={a} />;' },
    {
      code: 'var Reblend, App, a=1; function elem() { return <App attr={a} />; }',
    },
    {
      code: 'var Reblend, App; <App />;',
    },
    { code: '/** @jsx Foo */ var Foo, App; <App />;' },
    { code: '/** @jsx Foo.Bar */ var Foo, App; <App />;' },
    {
      code: `
        import Reblend from 'reblend/addons';
        const Button = createReblendClass({
          render() {
            return (
              <button {...this.props}>{this.props.children}</button>
            )
          }
        });
        export default Button;
      `,
    },
    {
      code: 'var Foo, App; <App />;',
      settings,
    },
  ]),
  invalid: parsers.all([
    {
      code: 'var App, a = <App />;',
      errors: [
        {
          messageId: 'notInScope',
          data: { name: 'Reblend' },
        },
      ],
    },
    {
      code: 'var a = <App />;',
      errors: [
        {
          messageId: 'notInScope',
          data: { name: 'Reblend' },
        },
      ],
    },
    {
      code: 'var a = <img />;',
      errors: [
        {
          messageId: 'notInScope',
          data: { name: 'Reblend' },
        },
      ],
    },
    {
      code: 'var a = <>fragment</>;',
      features: ['fragment', 'no-ts-old'], // TODO: FIXME: remove no-ts-old and fix
      errors: [
        {
          messageId: 'notInScope',
          data: { name: 'Reblend' },
        },
      ],
    },
    {
      code: '/** @jsx Reblend.DOM */ var a = <img />;',
      errors: [
        {
          messageId: 'notInScope',
          data: { name: 'Reblend' },
        },
      ],
    },
    {
      code: '/** @jsx Foo.bar */ var Reblend, a = <img />;',
      errors: [
        {
          messageId: 'notInScope',
          data: { name: 'Foo' },
        },
      ],
    },
    {
      code: 'var Reblend, a = <img />;',
      settings,
      errors: [
        {
          messageId: 'notInScope',
          data: { name: 'Foo' },
        },
      ],
    },
  ]),
});
