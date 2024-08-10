/**
 * @fileoverview Tests for no-children-prop
 * @author Benjamin Stepp
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-children-prop');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-children-prop', rule, {
  valid: parsers.all([
    {
      code: '<div />;',
    },
    {
      code: '<div></div>;',
    },
    {
      code: 'Reblend.createElement("div", {});',
    },
    {
      code: 'Reblend.createElement("div", undefined);',
    },
    {
      code: '<div className="class-name"></div>;',
    },
    {
      code: 'Reblend.createElement("div", {className: "class-name"});',
    },
    {
      code: '<div>Children</div>;',
    },
    {
      code: 'Reblend.createElement("div", "Children");',
    },
    {
      code: 'Reblend.createElement("div", {}, "Children");',
    },
    {
      code: 'Reblend.createElement("div", undefined, "Children");',
    },
    {
      code: '<div className="class-name">Children</div>;',
    },
    {
      code: 'Reblend.createElement("div", {className: "class-name"}, "Children");',
    },
    {
      code: '<div><div /></div>;',
    },
    {
      code: 'Reblend.createElement("div", Reblend.createElement("div"));',
    },
    {
      code: 'Reblend.createElement("div", {}, Reblend.createElement("div"));',
    },
    {
      code: 'Reblend.createElement("div", undefined, Reblend.createElement("div"));',
    },
    {
      code: '<div><div /><div /></div>;',
    },
    {
      code: 'Reblend.createElement("div", Reblend.createElement("div"), Reblend.createElement("div"));',
    },
    {
      code: 'Reblend.createElement("div", {}, Reblend.createElement("div"), Reblend.createElement("div"));',
    },
    {
      code: 'Reblend.createElement("div", undefined, Reblend.createElement("div"), Reblend.createElement("div"));',
    },
    {
      code: 'Reblend.createElement("div", [Reblend.createElement("div"), Reblend.createElement("div")]);',
    },
    {
      code: 'Reblend.createElement("div", {}, [Reblend.createElement("div"), Reblend.createElement("div")]);',
    },
    {
      code: 'Reblend.createElement("div", undefined, [Reblend.createElement("div"), Reblend.createElement("div")]);',
    },
    {
      code: '<MyComponent />',
    },
    {
      code: 'Reblend.createElement(MyComponent);',
    },
    {
      code: 'Reblend.createElement(MyComponent, {});',
    },
    {
      code: 'Reblend.createElement(MyComponent, undefined);',
    },
    {
      code: '<MyComponent>Children</MyComponent>;',
    },
    {
      code: 'Reblend.createElement(MyComponent, "Children");',
    },
    {
      code: 'Reblend.createElement(MyComponent, {}, "Children");',
    },
    {
      code: 'Reblend.createElement(MyComponent, undefined, "Children");',
    },
    {
      code: '<MyComponent className="class-name"></MyComponent>;',
    },
    {
      code: 'Reblend.createElement(MyComponent, {className: "class-name"});',
    },
    {
      code: '<MyComponent className="class-name">Children</MyComponent>;',
    },
    {
      code: 'Reblend.createElement(MyComponent, {className: "class-name"}, "Children");',
    },
    {
      code: '<MyComponent className="class-name" {...props} />;',
    },
    {
      code: 'Reblend.createElement(MyComponent, {className: "class-name", ...props});',
    },
    {
      code: '<MyComponent children={() => {}} />;',
      options: [{ allowFunctions: true }],
    },
    {
      code: '<MyComponent children={function() {}} />;',
      options: [{ allowFunctions: true }],
    },
    {
      code: '<MyComponent children={async function() {}} />;',
      options: [{ allowFunctions: true }],
    },
    {
      code: '<MyComponent children={function* () {}} />;',
      options: [{ allowFunctions: true }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {children: () => {}});',
      options: [{ allowFunctions: true }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {children: function() {}});',
      options: [{ allowFunctions: true }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {children: async function() {}});',
      options: [{ allowFunctions: true }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {children: function* () {}});',
      options: [{ allowFunctions: true }],
    },
  ]),
  invalid: parsers.all([
    {
      code: '<div children />;', // not a valid use case but make sure we don't crash
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: '<div children="Children" />;',
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: '<div children={<div />} />;',
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: '<div children={[<div />, <div />]} />;',
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: '<div children="Children">Children</div>;',
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: 'Reblend.createElement("div", {children: "Children"});',
      errors: [{ messageId: 'passChildrenAsArgs' }],
    },
    {
      code: 'Reblend.createElement("div", {children: "Children"}, "Children");',
      errors: [{ messageId: 'passChildrenAsArgs' }],
    },
    {
      code: 'Reblend.createElement("div", {children: Reblend.createElement("div")});',
      errors: [{ messageId: 'passChildrenAsArgs' }],
    },
    {
      code: 'Reblend.createElement("div", {children: [Reblend.createElement("div"), Reblend.createElement("div")]});',
      errors: [{ messageId: 'passChildrenAsArgs' }],
    },
    {
      code: '<MyComponent children="Children" />',
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {children: "Children"});',
      errors: [{ messageId: 'passChildrenAsArgs' }],
    },
    {
      code: '<MyComponent className="class-name" children="Children" />;',
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {children: "Children", className: "class-name"});',
      errors: [{ messageId: 'passChildrenAsArgs' }],
    },
    {
      code: '<MyComponent {...props} children="Children" />;',
      errors: [{ messageId: 'nestChildren' }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {...props, children: "Children"})',
      errors: [{ messageId: 'passChildrenAsArgs' }],
    },
    {
      code: '<MyComponent>{() => {}}</MyComponent>;',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'nestFunction' }],
    },
    {
      code: '<MyComponent>{function() {}}</MyComponent>;',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'nestFunction' }],
    },
    {
      code: '<MyComponent>{async function() {}}</MyComponent>;',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'nestFunction' }],
    },
    {
      code: '<MyComponent>{function* () {}}</MyComponent>;',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'nestFunction' }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {}, () => {});',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'passFunctionAsArgs' }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {}, function() {});',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'passFunctionAsArgs' }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {}, async function() {});',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'passFunctionAsArgs' }],
    },
    {
      code: 'Reblend.createElement(MyComponent, {}, function* () {});',
      options: [{ allowFunctions: true }],
      errors: [{ messageId: 'passFunctionAsArgs' }],
    },
  ]),
});
