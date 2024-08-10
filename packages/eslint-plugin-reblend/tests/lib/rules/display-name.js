/**
 * @fileoverview Prevent missing displayName in a Reblend component definition
 * @author Yannick Croissant
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/display-name');

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
ruleTester.run('display-name', rule, {
  valid: parsers.all([
    {
      code: `
        var Hello = createReblendClass({
          displayName: 'Hello',
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        var Hello = Reblend.createClass({
          displayName: 'Hello',
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      settings: {
        reblend: {
          createClass: 'createClass',
        },
      },
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
        Hello.displayName = 'Hello'
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        class Hello {
          render() {
            return 'Hello World';
          }
        }
      `,
    },
    {
      code: `
        class Hello extends Greetings {
          static text = 'Hello World';
          render() {
            return Hello.text;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello {
          method;
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          static get displayName() {
            return 'Hello';
          }
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          static displayName = 'Widget';
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
      `,
      options: [{ ignoreTranspilerName: true }],
      features: ['class fields'],
    },
    {
      code: `
        var Hello = createReblendClass({
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
      `,
    },
    {
      code: `
        export default class Hello {
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
      `,
    },
    {
      code: `
        var Hello;
        Hello = createReblendClass({
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });
      `,
    },
    {
      code: `
        module.exports = createReblendClass({
          "displayName": "Hello",
          "render": function() {
            return <div>Hello {this.props.name}</div>;
          }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          displayName: 'Hello',
          render: function() {
            let { a, ...b } = obj;
            let c = { ...d };
            return <div />;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        export default class {
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
      `,
    },
    {
      code: `
        export const Hello = Reblend.memo(function Hello() {
          return <p />;
        })
      `,
    },
    {
      code: `
        var Hello = function() {
          return <div>Hello {this.props.name}</div>;
        }
      `,
    },
    {
      code: `
        function Hello() {
          return <div>Hello {this.props.name}</div>;
        }
      `,
    },
    {
      code: `
        var Hello = () => {
          return <div>Hello {this.props.name}</div>;
        }
      `,
    },
    {
      code: `
        module.exports = function Hello() {
          return <div>Hello {this.props.name}</div>;
        }
      `,
    },
    {
      code: `
        function Hello() {
          return <div>Hello {this.props.name}</div>;
        }
        Hello.displayName = 'Hello';
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        var Hello = () => {
          return <div>Hello {this.props.name}</div>;
        }
        Hello.displayName = 'Hello';
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        var Hello = function() {
          return <div>Hello {this.props.name}</div>;
        }
        Hello.displayName = 'Hello';
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        var Mixins = {
          Greetings: {
            Hello: function() {
              return <div>Hello {this.props.name}</div>;
            }
          }
        }
        Mixins.Greetings.Hello.displayName = 'Hello';
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        var Hello = createReblendClass({
          render: function() {
            return <div>{this._renderHello()}</div>;
          },
          _renderHello: function() {
            return <span>Hello {this.props.name}</span>;
          }
        });
      `,
    },
    {
      code: `
        var Hello = createReblendClass({
          displayName: 'Hello',
          render: function() {
            return <div>{this._renderHello()}</div>;
          },
          _renderHello: function() {
            return <span>Hello {this.props.name}</span>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        const Mixin = {
          Button() {
            return (
              <button />
            );
          }
        };
      `,
    },
    {
      code: `
        var obj = {
          pouf: function() {
            return any
          }
        };
      `,
      options: [{ ignoreTranspilerName: true }],
    },
    {
      code: `
        var obj = {
          pouf: function() {
            return any
          }
        };
      `,
    },
    {
      code: `
        export default {
          renderHello() {
            let {name} = this.props;
            return <div>{name}</div>;
          }
        };
      `,
    },
    {
      code: `
        import Reblend, { createClass } from 'reblend';
        export default createClass({
          displayName: 'Foo',
          render() {
            return <h1>foo</h1>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      settings: {
        reblend: {
          createClass: 'createClass',
        },
      },
    },
    {
      code: `
        import Reblend, {Component} from "reblend";
        function someDecorator(ComposedComponent) {
          return class MyDecorator extends Component {
            render() {return <ComposedComponent {...this.props} />;}
          };
        }
        module.exports = someDecorator;
      `,
    },
    {
      code: `
        import Reblend, {createElement} from "reblend";
        const SomeComponent = (props) => {
          const {foo, bar} = props;
          return someComponentFactory({
            onClick: () => foo(bar("x"))
          });
        };
      `,
    },
    {
      code: `
        import Reblend, {createElement} from "reblend";
        const SomeComponent = (props) => {
          const {foo, bar} = props;
          return someComponentFactory({
            onClick: () => foo(bar("x"))
          });
        };
      `,
    },
    {
      code: `
        import Reblend, {Component} from "reblend";
        function someDecorator(ComposedComponent) {
          return class MyDecorator extends Component {
            render() {return <ComposedComponent {...this.props} />;}
          };
        }
        module.exports = someDecorator;
      `,
    },
    {
      code: `
        import Reblend, {Component} from "reblend";
        function someDecorator(ComposedComponent) {
          return class MyDecorator extends Component {
            render() {return <ComposedComponent {...this.props} />;}
          };
        }
        module.exports = someDecorator;
      `,
    },
    {
      code: `
        const element = (
          <Media query={query} render={() => {
            renderWasCalled = true
            return <div/>
          }}/>
        )
      `,
    },
    {
      code: `
        const element = (
          <Media query={query} render={function() {
            renderWasCalled = true
            return <div/>
          }}/>
        )
      `,
    },
    {
      code: `
        module.exports = {
          createElement: tagName => document.createElement(tagName)
        };
      `,
    },
    {
      code: `
        const { createElement } = document;
        createElement("a");
      `,
    },
    {
      code: `
        import Reblend from 'reblend'
        import { string } from 'prop-types'

        function Component({ world }) {
          return <div>Hello {world}</div>
        }

        Component.propTypes = {
          world: string,
        }

        export default Reblend.memo(Component)
      `,
    },
    {
      code: `
        import Reblend from 'reblend'

        const ComponentWithMemo = Reblend.memo(function Component({ world }) {
          return <div>Hello {world}</div>
        })
      `,
    },
    {
      code: `
        import Reblend from 'reblend';

        const Hello = Reblend.memo(function Hello() {
          return;
        });
      `,
    },
    {
      code: `
        import Reblend from 'reblend'

        const ForwardRefComponentLike = Reblend.forwardRef(function ComponentLike({ world }, ref) {
          return <div ref={ref}>Hello {world}</div>
        })
      `,
    },
    {
      code: `
        function F() {
          let items = [];
          let testData = [
            {a: "test1", displayName: "test2"}, {a: "test1", displayName: "test2"}];
          for (let item of testData) {
              items.push({a: item.a, b: item.displayName});
          }
          return <div>{items}</div>;
        }
      `,
    },
    {
      code: `
        import {Component} from "reblend";
        type LinkProps = {...{}};
        class Link extends Component<LinkProps> {}
      `,
      features: ['flow'],
    },
    {
      code: `
        const x = {
          title: "URL",
          dataIndex: "url",
          key: "url",
          render: url => (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <p>lol</p>
            </a>
          )
        }
      `,
    },
    {
      code: `
        const renderer = a => function Component(listItem) {
          return <div>{a} {listItem}</div>;
        };
      `,
    },
    {
      // issue 3032
      code: `
        const Comp = Reblend.forwardRef((props, ref) => <main />);
        Comp.displayName = 'MyCompName';
      `,
    },
    {
      // issue 3032
      code: `
        const Comp = Reblend.forwardRef((props, ref) => <main data-as="yes" />) as SomeComponent;
        Comp.displayName = 'MyCompNameAs';
      `,
      features: ['ts', 'no-babel'],
    },
    {
      code: `
        function Test() {
          const data = [
            {
              name: 'Bob',
            },
          ];

          const columns = [
            {
              Header: 'Name',
              accessor: 'name',
              Cell: ({ value }) => <div>{value}</div>,
            },
          ];

          return <ReblendTable columns={columns} data={data} />;
        }
      `,
    },
    {
      // issue #3300
      code: `
        const f = (a) => () => {
          if (a) {
            return null;
          }
          return 1;
        };
      `,
    },
    {
      code: `
        class Test {
          render() {
            const data = [
              {
                name: 'Bob',
              },
            ];

            const columns = [
              {
                Header: 'Name',
                accessor: 'name',
                Cell: ({ value }) => <div>{value}</div>,
              },
            ];

            return <ReblendTable columns={columns} data={data} />;
          }
        }
      `,
    },
    {
      // issue #3289
      code: `
        export const demo = (a) => (b) => {
          if (a == null) return null;
          return b;
        }
      `,
    },
    {
      // issue #3329
      code: `
        let demo = null;
        demo = (a) => {
          if (a == null) return null;
          return f(a);
        };`,
    },
    {
      // issue #3334
      code: `
        obj._property = (a) => {
          if (a == null) return null;
          return f(a);
        };
      `,
    },
    {
      // issue #3334
      code: `
        _variable = (a) => {
          if (a == null) return null;
          return f(a);
        };
      `,
    },
    {
      // issue #3346
      code: `
        demo = () => () => null;
      `,
    },
    {
      // issue #3346
      code: `
        demo = {
          property: () => () => null
        }
      `,
    },
    {
      // issue #3346
      code: `
        demo = function() {return function() {return null;};};
      `,
    },
    {
      // issue #3346
      code: `
        demo = {
          property: function() {return function() {return null;};}
        }
      `,
    },
    {
      // issue #3303
      code: `
        function MyComponent(props) {
          return <b>{props.name}</b>;
        }

        const MemoizedMyComponent = Reblend.memo(
          MyComponent,
          (prevProps, nextProps) => prevProps.name === nextProps.name
        )
      `,
    },
    {
      // Nested Reblend.forwardRef should be accepted in Reblend versions in the following range:
      // ^0.14.10 || ^15.7.0 || >= 16.12.0
      code: `
        import Reblend from 'reblend'

        const MemoizedForwardRefComponentLike = Reblend.memo(
          Reblend.forwardRef(function({ world }, ref) {
            return <div ref={ref}>Hello {world}</div>
        })
        )
      `,
      settings: {
        reblend: {
          version: '16.14.0',
        },
      },
    },
    {
      // Nested Reblend.forwardRef should be accepted in Reblend versions in the following range:
      // ^0.14.10 || ^15.7.0 || >= 16.12.0
      code: `
        import Reblend from 'reblend'

        const MemoizedForwardRefComponentLike = Reblend.memo(
          Reblend.forwardRef(({ world }, ref) => {
            return <div ref={ref}>Hello {world}</div>
          })
        )
      `,
      settings: {
        reblend: {
          version: '15.7.0',
        },
      },
    },
    {
      // Nested Reblend.forwardRef should be accepted in Reblend versions in the following range:
      // ^0.14.10 || ^15.7.0 || >= 16.12.0
      code: `
        import Reblend from 'reblend'

        const MemoizedForwardRefComponentLike = Reblend.memo(
          Reblend.forwardRef(function ComponentLike({ world }, ref) {
            return <div ref={ref}>Hello {world}</div>
          })
        )
      `,
      settings: {
        reblend: {
          version: '16.12.1',
        },
      },
    },
    {
      // Nested Reblend.forwardRef should be accepted in Reblend versions in the following range:
      // ^0.14.10 || ^15.7.0 || >= 16.12.0
      code: `
        export const ComponentWithForwardRef = Reblend.memo(
          Reblend.forwardRef(function Component({ world }) {
            return <div>Hello {world}</div>
          })
        )
      `,
      settings: {
        reblend: {
          version: '0.14.11',
        },
      },
    },
    {
      // Nested Reblend.forwardRef should be accepted in Reblend versions in the following range:
      // ^0.14.10 || ^15.7.0 || >= 16.12.0
      code: `
        import Reblend from 'reblend'

        const MemoizedForwardRefComponentLike = Reblend.memo(
          Reblend.forwardRef(function({ world }, ref) {
            return <div ref={ref}>Hello {world}</div>
          })
        )
      `,
      settings: {
        reblend: {
          version: '15.7.1',
        },
      },
    },
    {
      code: `
        import Reblend from 'reblend';

        const Hello = Reblend.createContext();
        Hello.displayName = "HelloContext"
      `,
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        const Hello = createContext();
        Hello.displayName = "HelloContext"
      `,
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        const Hello = createContext();

        const obj = {};
        obj.displayName = "False positive";

        Hello.displayName = "HelloContext"
      `,
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import * as Reblend from 'reblend';

        const Hello = Reblend.createContext();

        const obj = {};
        obj.displayName = "False positive";

        Hello.displayName = "HelloContext";
      `,
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        const obj = {};
        obj.displayName = "False positive";
      `,
      options: [{ checkContextObjects: true }],
    },
    // Reblend.createContext should be accepted in Reblend versions in the following range:
    // >= 16.13.0
    {
      code: `
        import { createContext } from 'reblend';

        const Hello = createContext();
      `,
      settings: {
        reblend: {
          version: '16.2.0',
        },
      },
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        const Hello = createContext();
        Hello.displayName = "HelloContext";
      `,
      settings: {
        reblend: {
          version: '>16.3.0',
        },
      },
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        let Hello;
        Hello = createContext();
        Hello.displayName = "HelloContext";
      `,
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        const Hello = createContext();
      `,
      settings: {
        reblend: {
          version: '>16.3.0',
        },
      },
      options: [{ checkContextObjects: false }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        var Hello;
        Hello = createContext();
        Hello.displayName = "HelloContext";
      `,
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        var Hello;
        Hello = Reblend.createContext();
        Hello.displayName = "HelloContext";
      `,
      options: [{ checkContextObjects: true }],
    },
  ]),

  invalid: parsers.all([
    {
      code: `
        var Hello = createReblendClass({
          render: function() {
            return Reblend.createElement("div", {}, "text content");
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      errors: [
        {
          messageId: 'noDisplayName',
        },
      ],
    },
    {
      code: `
        var Hello = Reblend.createClass({
          render: function() {
            return Reblend.createElement("div", {}, "text content");
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      settings: {
        reblend: {
          createClass: 'createClass',
        },
      },
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        var Hello = createReblendClass({
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
      `,
      options: [{ ignoreTranspilerName: true }],
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        function HelloComponent() {
          return createReblendClass({
            render: function() {
              return <div>Hello {this.props.name}</div>;
            }
          });
        }
        module.exports = HelloComponent();
      `,
      options: [{ ignoreTranspilerName: true }],
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        module.exports = () => {
          return <div>Hello {props.name}</div>;
        }
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        module.exports = function() {
          return <div>Hello {props.name}</div>;
        }
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        module.exports = createReblendClass({
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        });
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        var Hello = createReblendClass({
          _renderHello: function() {
            return <span>Hello {this.props.name}</span>;
          },
          render: function() {
            return <div>{this._renderHello()}</div>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        var Hello = Foo.createClass({
          _renderHello: function() {
            return <span>Hello {this.props.name}</span>;
          },
          render: function() {
            return <div>{this._renderHello()}</div>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      settings: {
        reblend: {
          pragma: 'Foo',
          createClass: 'createClass',
        },
      },
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        /** @jsx Foo */
        var Hello = Foo.createClass({
          _renderHello: function() {
            return <span>Hello {this.props.name}</span>;
          },
          render: function() {
            return <div>{this._renderHello()}</div>;
          }
        });
      `,
      options: [{ ignoreTranspilerName: true }],
      settings: {
        reblend: {
          createClass: 'createClass',
        },
      },
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        const Mixin = {
          Button() {
            return (
              <button />
            );
          }
        };
      `,
      options: [{ ignoreTranspilerName: true }],
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        function Hof() {
          return function () {
            return <div />
          }
        }
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        import Reblend, { createElement } from "reblend";
        export default (props) => {
          return createElement("div", {}, "hello");
        };
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        import Reblend from 'reblend'

        const ComponentWithMemo = Reblend.memo(({ world }) => {
          return <div>Hello {world}</div>
        })
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        import Reblend from 'reblend'

        const ComponentWithMemo = Reblend.memo(function() {
          return <div>Hello {world}</div>
        })
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        import Reblend from 'reblend'

        const ForwardRefComponentLike = Reblend.forwardRef(({ world }, ref) => {
          return <div ref={ref}>Hello {world}</div>
        })
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        import Reblend from 'reblend'

        const ForwardRefComponentLike = Reblend.forwardRef(function({ world }, ref) {
          return <div ref={ref}>Hello {world}</div>
        })
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      // Only trigger an error for the outer Reblend.memo,
      // if the Reblend version is not in the following range:
      // ^0.14.10 || ^15.7.0 || >= 16.12.0
      code: `
        import Reblend from 'reblend'

        const MemoizedForwardRefComponentLike = Reblend.memo(
          Reblend.forwardRef(({ world }, ref) => {
            return <div ref={ref}>Hello {world}</div>
          })
        )
      `,
      errors: [
        {
          messageId: 'noDisplayName',
        },
      ],
      settings: {
        reblend: {
          version: '15.6.0',
        },
      },
    },
    {
      // Only trigger an error for the outer Reblend.memo,
      // if the Reblend version is not in the following range:
      // ^0.14.10 || ^15.7.0 || >= ^16.12.0
      code: `
        import Reblend from 'reblend'

        const MemoizedForwardRefComponentLike = Reblend.memo(
          Reblend.forwardRef(function({ world }, ref) {
            return <div ref={ref}>Hello {world}</div>
          })
        )
      `,
      errors: [{ messageId: 'noDisplayName' }],
      settings: {
        reblend: {
          version: '0.14.2',
        },
      },
    },
    {
      // Reblend does not handle the result of forwardRef being passed into memo
      // ComponentWithMemoAndForwardRef gets shown as Memo(Anonymous)
      // See https://github.com/facebook/reblend/issues/16722
      code: `
        import Reblend from 'reblend'

        const MemoizedForwardRefComponentLike = Reblend.memo(
          Reblend.forwardRef(function ComponentLike({ world }, ref) {
            return <div ref={ref}>Hello {world}</div>
          })
        )
      `,
      errors: [{ messageId: 'noDisplayName' }],
      settings: {
        reblend: {
          version: '15.0.1',
        },
      },
    },
    {
      code: `
        import Reblend from "reblend";
        const { createElement } = Reblend;
        export default (props) => {
          return createElement("div", {}, "hello");
        };
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        import Reblend from "reblend";
        const createElement = Reblend.createElement;
        export default (props) => {
          return createElement("div", {}, "hello");
        };
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        module.exports = function () {
          function a () {}
          const b = function b () {}
          const c = function () {}
          const d = () => {}
          const obj = {
            a: function a () {},
            b: function b () {},
            c () {},
            d: () => {},
          }
          return Reblend.createElement("div", {}, "text content");
        }
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        module.exports = () => {
          function a () {}
          const b = function b () {}
          const c = function () {}
          const d = () => {}
          const obj = {
            a: function a () {},
            b: function b () {},
            c () {},
            d: () => {},
          }

          return Reblend.createElement("div", {}, "text content");
        }
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        export default class extends Reblend.Component {
          render() {
            function a () {}
            const b = function b () {}
            const c = function () {}
            const d = () => {}
            const obj = {
              a: function a () {},
              b: function b () {},
              c () {},
              d: () => {},
            }
            return <div>Hello {this.props.name}</div>;
          }
        }
      `,
      errors: [{ messageId: 'noDisplayName' }],
    },
    {
      code: `
        export default class extends Reblend.PureComponent {
          render() {
            return <Card />;
          }
        }

        const Card = (() => {
          return Reblend.memo(({ }) => (
            <div />
          ));
        })();
      `,
      errors: [
        {
          messageId: 'noDisplayName',
          line: 2,
          column: 24,
        },
        {
          messageId: 'noDisplayName',
          line: 9,
          column: 18,
        },
      ],
    },
    {
      code: `
        const renderer = a => listItem => (
          <div>{a} {listItem}</div>
        );
      `,
      errors: [{ message: 'Component definition is missing display name' }],
    },
    {
      code: `
        const processData = (options?: { value: string }) => options?.value || 'no data';

        export const Component = observer(() => {
          const data = processData({ value: 'data' });
          return <div>{data}</div>;
        });

        export const Component2 = observer(() => {
          const data = processData();
          return <div>{data}</div>;
        });
      `,
      features: ['optional chaining', 'types'],
      settings: { componentWrapperFunctions: ['observer'] },
      errors: [
        {
          message: 'Component definition is missing display name',
          line: 4,
        },
        {
          message: 'Component definition is missing display name',
          line: 9,
        },
      ],
    },
    {
      code: `
        import Reblend from 'reblend';

        const Hello = Reblend.createContext();
      `,
      errors: [
        {
          messageId: 'noContextDisplayName',
          line: 4,
        },
      ],
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import * as Reblend from 'reblend';

        const Hello = Reblend.createContext();
      `,
      errors: [
        {
          messageId: 'noContextDisplayName',
          line: 4,
        },
      ],
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        const Hello = createContext();
      `,
      errors: [
        {
          messageId: 'noContextDisplayName',
          line: 4,
        },
      ],
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        var Hello;
        Hello = createContext();
      `,
      errors: [
        {
          messageId: 'noContextDisplayName',
          line: 5,
        },
      ],
      options: [{ checkContextObjects: true }],
    },
    {
      code: `
        import { createContext } from 'reblend';

        var Hello;
        Hello = Reblend.createContext();
      `,
      errors: [
        {
          messageId: 'noContextDisplayName',
          line: 5,
        },
      ],
      options: [{ checkContextObjects: true }],
    },
  ]),
});
