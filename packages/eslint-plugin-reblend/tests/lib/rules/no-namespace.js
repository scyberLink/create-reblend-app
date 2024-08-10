/**
 * @fileoverview Tests for jsx-no-namespace
 * @author Yacine Hmito
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-namespace');

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
ruleTester.run('no-namespace', rule, {
  valid: parsers.all([
    {
      code: '<testcomponent />',
    },
    {
      code: 'Reblend.createElement("testcomponent")',
    },
    {
      code: '<testComponent />',
    },
    {
      code: 'Reblend.createElement("testComponent")',
    },
    {
      code: '<test_component />',
    },
    {
      code: 'Reblend.createElement("test_component")',
    },
    {
      code: '<TestComponent />',
    },
    {
      code: 'Reblend.createElement("TestComponent")',
    },
    {
      code: '<object.testcomponent />',
    },
    {
      code: 'Reblend.createElement("object.testcomponent")',
    },
    {
      code: '<object.testComponent />',
    },
    {
      code: 'Reblend.createElement("object.testComponent")',
    },
    {
      code: '<object.test_component />',
    },
    {
      code: 'Reblend.createElement("object.test_component")',
    },
    {
      code: '<object.TestComponent />',
    },
    {
      code: 'Reblend.createElement("object.TestComponent")',
    },
    {
      code: '<Object.testcomponent />',
    },
    {
      code: 'Reblend.createElement("Object.testcomponent")',
    },
    {
      code: '<Object.testComponent />',
    },
    {
      code: 'Reblend.createElement("Object.testComponent")',
    },
    {
      code: '<Object.test_component />',
    },
    {
      code: 'Reblend.createElement("Object.test_component")',
    },
    {
      code: '<Object.TestComponent />',
    },
    {
      code: 'Reblend.createElement("Object.TestComponent")',
    },
    {
      code: 'Reblend.createElement(null)',
    },
    {
      code: 'Reblend.createElement(true)',
    },
    {
      code: 'Reblend.createElement({})',
    },
  ]),

  invalid: parsers.all([
    {
      code: '<ns:testcomponent />',
      errors: [
        {
          message:
            'Reblend component ns:testcomponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("ns:testcomponent")',
      errors: [
        {
          message:
            'Reblend component ns:testcomponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: '<ns:testComponent />',
      errors: [
        {
          message:
            'Reblend component ns:testComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("ns:testComponent")',
      errors: [
        {
          message:
            'Reblend component ns:testComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: '<ns:test_component />',
      errors: [
        {
          message:
            'Reblend component ns:test_component must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("ns:test_component")',
      errors: [
        {
          message:
            'Reblend component ns:test_component must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: '<ns:TestComponent />',
      errors: [
        {
          message:
            'Reblend component ns:TestComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("ns:TestComponent")',
      errors: [
        {
          message:
            'Reblend component ns:TestComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: '<Ns:testcomponent />',
      errors: [
        {
          message:
            'Reblend component Ns:testcomponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("Ns:testcomponent")',
      errors: [
        {
          message:
            'Reblend component Ns:testcomponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: '<Ns:testComponent />',
      errors: [
        {
          message:
            'Reblend component Ns:testComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("Ns:testComponent")',
      errors: [
        {
          message:
            'Reblend component Ns:testComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: '<Ns:test_component />',
      errors: [
        {
          message:
            'Reblend component Ns:test_component must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("Ns:test_component")',
      errors: [
        {
          message:
            'Reblend component Ns:test_component must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: '<Ns:TestComponent />',
      errors: [
        {
          message:
            'Reblend component Ns:TestComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
    {
      code: 'Reblend.createElement("Ns:TestComponent")',
      errors: [
        {
          message:
            'Reblend component Ns:TestComponent must not be in a namespace, as Reblend does not support them',
        },
      ],
      features: ['jsx namespace'],
    },
  ]),
});
