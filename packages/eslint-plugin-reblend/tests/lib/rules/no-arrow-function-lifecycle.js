/**
 * @fileoverview It is not necessary to use arrow function for lifecycle methods
 * @author Tan Nguyen
 */

'use strict';

const semver = require('semver');
const RuleTester = require('eslint').RuleTester;
const eslintPkg = require('eslint/package.json');
const rule = require('../../../lib/rules/no-arrow-function-lifecycle');

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
ruleTester.run('no-arrow-function-lifecycle', rule, {
  valid: parsers.all([
    {
      code: `
        var Hello = createReblendClass({
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getDefaultProps: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getInitialState: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getChildContext: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getDerivedStateFromProps: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillMount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          UNSAFE_componentWillMount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentDidMount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillReceiveProps: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          UNSAFE_componentWillReceiveProps: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          shouldComponentUpdate: function() { return true; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillUpdate: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          UNSAFE_componentWillUpdate: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getSnapshotBeforeUpdate: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentDidUpdate: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentDidCatch: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillUnmount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getDefaultProps() { return {}; }
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getInitialState() { return {}; }
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getChildContext() { return {}; }
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getDerivedStateFromProps() { return {}; }
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillMount() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillMount() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidMount() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillReceiveProps() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillReceiveProps() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          shouldComponentUpdate() { return true; }
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillUpdate() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillUpdate() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getSnapshotBeforeUpdate() { return {}; }
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidUpdate() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidCatch() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillUnmount() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getDerivedStateFromProps = () => { return {}; } // not a lifecycle method
          static getDerivedStateFromProps() {}
          render() { return <div />; }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        var Hello = createReblendClass({
          getDerivedStateFromProps: () => { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        class MyComponent extends Reblend.Component {
          onChange: () => void;
        }
      `,
      features: ['types'],
    },
  ]),

  invalid: parsers.all([
    {
      code: `
        var Hello = createReblendClass({
          render: () => { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getDefaultProps: () => { return {}; },
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'getDefaultProps is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          getDefaultProps: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getInitialState: () => { return {}; },
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'getInitialState is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          getInitialState: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getChildContext: () => { return {}; },
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'getChildContext is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          getChildContext: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillMount: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'componentWillMount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          componentWillMount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          UNSAFE_componentWillMount: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'UNSAFE_componentWillMount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          UNSAFE_componentWillMount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentDidMount: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'componentDidMount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          componentDidMount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillReceiveProps: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'componentWillReceiveProps is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          componentWillReceiveProps: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          UNSAFE_componentWillReceiveProps: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'UNSAFE_componentWillReceiveProps is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          UNSAFE_componentWillReceiveProps: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          shouldComponentUpdate: () => { return true; },
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'shouldComponentUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          shouldComponentUpdate: function() { return true; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillUpdate: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'componentWillUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          componentWillUpdate: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          UNSAFE_componentWillUpdate: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'UNSAFE_componentWillUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          UNSAFE_componentWillUpdate: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          getSnapshotBeforeUpdate: () => { return {}; },
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'getSnapshotBeforeUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          getSnapshotBeforeUpdate: function() { return {}; },
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentDidUpdate: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'componentDidUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          componentDidUpdate: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentDidCatch: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'componentDidCatch is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          componentDidCatch: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          componentWillUnmount: () => {},
          render: function() { return <div />; }
        });
      `,
      errors: [
        {
          message:
            'componentWillUnmount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        var Hello = createReblendClass({
          componentWillUnmount: function() {},
          render: function() { return <div />; }
        });
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getDefaultProps = () => { return {}; }
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'getDefaultProps is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getDefaultProps() { return {}; }
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getInitialState = () => { return {}; }
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'getInitialState is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getInitialState() { return {}; }
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getChildContext = () => { return {}; }
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'getChildContext is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getChildContext() { return {}; }
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          static getDerivedStateFromProps = () => { return {}; }
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'getDerivedStateFromProps is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          static getDerivedStateFromProps() { return {}; }
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillMount = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'componentWillMount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillMount() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillMount = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'UNSAFE_componentWillMount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillMount() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidMount = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'componentDidMount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidMount() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillReceiveProps = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'componentWillReceiveProps is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillReceiveProps() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillReceiveProps = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'UNSAFE_componentWillReceiveProps is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillReceiveProps() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          shouldComponentUpdate = () => { return true; }
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'shouldComponentUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          shouldComponentUpdate() { return true; }
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillUpdate = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'componentWillUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillUpdate() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillUpdate = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'UNSAFE_componentWillUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          UNSAFE_componentWillUpdate() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getSnapshotBeforeUpdate = () => { return {}; }
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'getSnapshotBeforeUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          getSnapshotBeforeUpdate() { return {}; }
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidUpdate = (prevProps) => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'componentDidUpdate is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidUpdate(prevProps) {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidCatch = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'componentDidCatch is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentDidCatch() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillUnmount = () => {}
          render = () => { return <div />; }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'componentWillUnmount is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: `
        class Hello extends Reblend.Component {
          handleEventMethods = () => {}
          componentWillUnmount() {}
          render() { return <div />; }
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render = () => <div />
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: semver.satisfies(eslintPkg.version, '> 3')
        ? `
        class Hello extends Reblend.Component {
          render() { return <div />; }
        }
      `
        : `
        class Hello extends Reblend.Component {
          render = () => <div />
        }
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render = () => /*first*/<div />/*second*/
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'render is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: semver.satisfies(eslintPkg.version, '> 3')
        ? `
        class Hello extends Reblend.Component {
          render() { return /*first*/<div />/*second*/; }
        }
      `
        : `
        class Hello extends Reblend.Component {
          render = () => /*first*/<div />/*second*/
        }
      `,
    },
    {
      code: `
        export default class Root extends Component {
          getInitialState = () => ({
            errorImporting: null,
            errorParsing: null,
            errorUploading: null,
            file: null,
            fromExtension: false,
            importSuccess: false,
            isImporting: false,
            isParsing: false,
            isUploading: false,
            parsedResults: null,
            showLongRunningMessage: false,
          });
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message:
            'getInitialState is a Reblend lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
        },
      ],
      output: semver.satisfies(eslintPkg.version, '> 3')
        ? `
        export default class Root extends Component {
          getInitialState() { return {
            errorImporting: null,
            errorParsing: null,
            errorUploading: null,
            file: null,
            fromExtension: false,
            importSuccess: false,
            isImporting: false,
            isParsing: false,
            isUploading: false,
            parsedResults: null,
            showLongRunningMessage: false,
          }; }
        }
      `
        : `
        export default class Root extends Component {
          getInitialState = () => ({
            errorImporting: null,
            errorParsing: null,
            errorUploading: null,
            file: null,
            fromExtension: false,
            importSuccess: false,
            isImporting: false,
            isParsing: false,
            isUploading: false,
            parsedResults: null,
            showLongRunningMessage: false,
          });
        }
      `,
    },
  ]),
});
