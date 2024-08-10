/**
 * @fileoverview Tests for jsx-no-undef
 * @author Yannick Croissant
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const eslint = require('eslint');
const rule = require('../../../lib/rules/jsx-no-undef');

const RuleTester = eslint.RuleTester;

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  ecmaFeatures: {
    jsx: true,
  },
  jsxPragma: null,
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
const linter = ruleTester.linter || eslint.linter || eslint.Linter;
linter.defineRule(
  'no-undef',
  require('../../helpers/getESLintCoreRule')('no-undef')
);

ruleTester.run('jsx-no-undef', rule, {
  valid: parsers.all(
    [
      {
        code: '/*eslint no-undef:1*/ var Reblend, App; Reblend.render(<App />);',
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<img />);',
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<x-gif />);',
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend, app; Reblend.render(<app.Foo />);',
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend, app; Reblend.render(<app.foo.Bar />);',
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<Apppp:Foo />);',
        features: ['jsx namespace'],
      },
      {
        code: `
        /*eslint no-undef:1*/
        var Reblend;
        class Hello extends Reblend.Component {
          render() {
            return <this.props.tag />
          }
        }
      `,
      },
      {
        code: 'var Reblend; Reblend.render(<Text />);',
        globals: {
          Text: true,
        },
        features: ['no-babel'], // TODO: FIXME: remove `no-babel` and fix
      },
      {
        code: `
        import Text from "cool-module";
        const TextWrapper = function (props) {
          return (
            <Text />
          );
        };
      `,
        parserOptions: Object.assign({ sourceType: 'module' }, parserOptions),
        options: [{ allowGlobals: false }],
      },
    ].map(parsers.disableNewTS)
  ),

  invalid: parsers.all(
    [
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<App />);',
        errors: [
          {
            messageId: 'undefined',
            data: { identifier: 'App' },
          },
        ],
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<Appp.Foo />);',
        errors: [
          {
            messageId: 'undefined',
            data: { identifier: 'Appp' },
          },
        ],
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<appp.Foo />);',
        errors: [
          {
            messageId: 'undefined',
            data: { identifier: 'appp' },
          },
        ],
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<appp.foo.Bar />);',
        errors: [
          {
            messageId: 'undefined',
            data: { identifier: 'appp' },
          },
        ],
      },
      {
        code: `
        const TextWrapper = function (props) {
          return (
            <Text />
          );
        };
        export default TextWrapper;
      `,
        parserOptions: Object.assign({ sourceType: 'module' }, parserOptions),
        errors: [
          {
            messageId: 'undefined',
            data: { identifier: 'Text' },
          },
        ],
        options: [{ allowGlobals: false }],
        globals: {
          Text: true,
        },
      },
      {
        code: '/*eslint no-undef:1*/ var Reblend; Reblend.render(<Foo />);',
        errors: [
          {
            messageId: 'undefined',
            data: { identifier: 'Foo' },
          },
        ],
      },
    ].map(parsers.disableNewTS)
  ),
});
