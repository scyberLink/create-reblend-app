/**
 * @fileoverview Tests for void-dom-elements-no-children
 * @author Joe Lencioni
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/void-dom-elements-no-children');

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
ruleTester.run('void-dom-elements-no-children', rule, {
  valid: parsers.all([
    {
      code: '<div>Foo</div>;',
    },
    {
      code: '<div children="Foo" />;',
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
    },
    {
      code: 'Reblend.createElement("div", {}, "Foo");',
    },
    {
      code: 'Reblend.createElement("div", { children: "Foo" });',
    },
    {
      code: 'Reblend.createElement("div", { dangerouslySetInnerHTML: { __html: "Foo" } });',
    },
    {
      code: 'document.createElement("img");',
    },
    {
      code: 'Reblend.createElement("img");',
    },
    {
      code: 'Reblend.createElement();',
    },
    {
      code: 'document.createElement();',
    },
    {
      code: `
        const props = {};
        Reblend.createElement("img", props);
      `,
    },
    {
      code: `
        import Reblend, {createElement} from "reblend";
        createElement("div");
      `,
    },
    {
      code: `
        import Reblend, {createElement} from "reblend";
        createElement("img");
      `,
    },
    {
      code: `
        import Reblend, {createElement, PureComponent} from "reblend";
        class Button extends PureComponent {
          handleClick(ev) {
            ev.preventDefault();
          }
          render() {
            return <div onClick={this.handleClick}>Hello</div>;
          }
        }
      `,
    },
  ]),
  invalid: parsers.all([
    {
      code: '<br>Foo</br>;',
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'br' },
        },
      ],
    },
    {
      code: '<br children="Foo" />;',
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'br' },
        },
      ],
    },
    {
      code: '<img {...props} children="Foo" />;',
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'img' },
        },
      ],
    },
    {
      code: '<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'br' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("br", {}, "Foo");',
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'br' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("br", { children: "Foo" });',
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'br' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("br", { dangerouslySetInnerHTML: { __html: "Foo" } });',
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'br' },
        },
      ],
    },
    {
      code: `
        import Reblend, {createElement} from "reblend";
        createElement("img", {}, "Foo");
      `,
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'img' },
        },
      ],
    },
    {
      code: `
        import Reblend, {createElement} from "reblend";
        createElement("img", { children: "Foo" });
      `,
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'img' },
        },
      ],
    },
    {
      code: `
        import Reblend, {createElement} from "reblend";
        createElement("img", { dangerouslySetInnerHTML: { __html: "Foo" } });
      `,
      errors: [
        {
          messageId: 'noChildrenInVoidEl',
          data: { element: 'img' },
        },
      ],
    },
  ]),
});
