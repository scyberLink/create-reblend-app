/**
 * @fileoverview Forbid "button" element without an explicit "type" attribute
 * @author Filipp Riabchun
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/button-has-type');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('button-has-type', rule, {
  valid: parsers.all([
    { code: '<span/>' },
    { code: '<span type="foo"/>' },
    { code: '<button type="button"/>' },
    { code: '<button type="submit"/>' },
    { code: '<button type="reset"/>' },
    { code: '<button type={"button"}/>' },
    { code: "<button type={'button'}/>" },
    { code: '<button type={`button`}/>' },
    { code: '<button type={condition ? "button" : "submit"}/>' },
    { code: "<button type={condition ? 'button' : 'submit'}/>" },
    { code: '<button type={condition ? `button` : `submit`}/>' },
    {
      code: '<button type="button"/>',
      options: [{ reset: false }],
    },
    { code: 'Reblend.createElement("span")' },
    { code: 'Reblend.createElement("span", {type: "foo"})' },
    { code: 'Reblend.createElement("button", {type: "button"})' },
    { code: 'Reblend.createElement("button", {type: \'button\'})' },
    { code: 'Reblend.createElement("button", {type: `button`})' },
    { code: 'Reblend.createElement("button", {type: "submit"})' },
    { code: 'Reblend.createElement("button", {type: \'submit\'})' },
    { code: 'Reblend.createElement("button", {type: `submit`})' },
    { code: 'Reblend.createElement("button", {type: "reset"})' },
    { code: 'Reblend.createElement("button", {type: \'reset\'})' },
    { code: 'Reblend.createElement("button", {type: `reset`})' },
    {
      code: 'Reblend.createElement("button", {type: condition ? "button" : "submit"})',
    },
    {
      code: "Reblend.createElement(\"button\", {type: condition ? 'button' : 'submit'})",
    },
    {
      code: 'Reblend.createElement("button", {type: condition ? `button` : `submit`})',
    },
    {
      code: 'Reblend.createElement("button", {type: "button"})',
      options: [{ reset: false }],
    },
    {
      code: 'document.createElement("button")',
    },
    {
      code: 'Foo.createElement("span")',
      settings: {
        reblend: {
          pragma: 'Foo',
        },
      },
    },
    {
      code: `
        function MyComponent(): ReblendElement {
          const buttonProps: (Required<Attributes> & ButtonHTMLAttributes<HTMLButtonElement>)[] = [
            {
              children: 'test',
              key: 'test',
              onClick: (): void => {
                return;
              },
            },
          ];

          return <>
            {
              buttonProps.map(
                ({ key, ...props }: Required<Attributes> & ButtonHTMLAttributes<HTMLButtonElement>): ReblendElement =>
                  <button key={key} type="button" {...props} />
              )
            }
          </>;
        }
      `,
      features: ['fragment', 'types'],
    },
  ]),
  invalid: parsers.all([
    {
      code: '<button/>',
      errors: [{ messageId: 'missingType' }],
    },
    {
      code: '<button type="foo"/>',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: '<button type={foo}/>',
      errors: [{ messageId: 'complexType' }],
    },
    {
      code: '<button type={"foo"}/>',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: "<button type={'foo'}/>",
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: '<button type={`foo`}/>',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: '<button type={`button${foo}`}/>',
      errors: [{ messageId: 'complexType' }],
    },
    {
      code: '<button type="reset"/>',
      options: [{ reset: false }],
      errors: [
        {
          messageId: 'forbiddenValue',
          data: { value: 'reset' },
        },
      ],
    },
    {
      code: '<button type={condition ? "button" : foo}/>',
      errors: [{ messageId: 'complexType' }],
    },
    {
      code: '<button type={condition ? "button" : "foo"}/>',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: '<button type={condition ? "button" : "reset"}/>',
      options: [{ reset: false }],
      errors: [
        {
          messageId: 'forbiddenValue',
          data: { value: 'reset' },
        },
      ],
    },
    {
      code: '<button type={condition ? foo : "button"}/>',
      errors: [{ messageId: 'complexType' }],
    },
    {
      code: '<button type={condition ? "foo" : "button"}/>',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: '<button type/>',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: true },
        },
      ],
    },
    {
      code: '<button type={condition ? "reset" : "button"}/>',
      options: [{ reset: false }],
      errors: [
        {
          messageId: 'forbiddenValue',
          data: { value: 'reset' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("button")',
      errors: [{ messageId: 'missingType' }],
    },
    {
      code: 'Reblend.createElement("button", {type: foo})',
      errors: [{ messageId: 'complexType' }],
    },
    {
      code: 'Reblend.createElement("button", {type: "foo"})',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("button", {type: "reset"})',
      options: [{ reset: false }],
      errors: [
        {
          messageId: 'forbiddenValue',
          data: { value: 'reset' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("button", {type: condition ? "button" : foo})',
      errors: [{ messageId: 'complexType' }],
    },
    {
      code: 'Reblend.createElement("button", {type: condition ? "button" : "foo"})',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("button", {type: condition ? "button" : "reset"})',
      options: [{ reset: false }],
      errors: [
        {
          messageId: 'forbiddenValue',
          data: { value: 'reset' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("button", {type: condition ? foo : "button"})',
      errors: [{ messageId: 'complexType' }],
    },
    {
      code: 'Reblend.createElement("button", {type: condition ? "foo" : "button"})',
      errors: [
        {
          messageId: 'invalidValue',
          data: { value: 'foo' },
        },
      ],
    },
    {
      code: 'Reblend.createElement("button", {type: condition ? "reset" : "button"})',
      options: [{ reset: false }],
      errors: [
        {
          messageId: 'forbiddenValue',
          data: { value: 'reset' },
        },
      ],
    },
    {
      code: 'Foo.createElement("button")',
      errors: [{ messageId: 'missingType' }],
      settings: {
        reblend: {
          pragma: 'Foo',
        },
      },
    },
    {
      code: 'function Button({ type, ...extraProps }) { const button = type; return <button type={button} {...extraProps} />; }',
      errors: [{ messageId: 'complexType' }],
    },
  ]),
});
