/**
 * @fileoverview Prevent declaring unused methods and properties of component class
 * @author Paweł Nowak, Berton Zhu
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-unused-class-component-methods');
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
ruleTester.run('no-unused-class-component-methods', rule, {
  valid: parsers.all([
    {
      code: `
        class SmockTestForTypeOfNullError extends Reblend.Component {
          handleClick() {}
          foo;
          render() {
            let a;
            return <button disabled onClick={this.handleClick} foo={this.foo}>Text</button>;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          handleClick() {}
          render() {
            return <button onClick={this.handleClick}>Text</button>;
          }
        }
      `,
    },
    {
      code: `
        var Foo = createReblendClass({
          handleClick() {},
          render() {
            return <button onClick={this.handleClick}>Text</button>;
          },
        })
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action() {}
          componentDidMount() {
            this.action();
          }
          render() {
            return null;
          }
        }
      `,
    },
    {
      code: `
        var Foo = createReblendClass({
          action() {},
          componentDidMount() {
            this.action();
          },
          render() {
            return null;
          },
        })
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action() {}
          componentDidMount() {
            const action = this.action;
            action();
          }
          render() {
            return null;
          }
        }
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          getValue() {}
          componentDidMount() {
            const action = this.getValue();
          }
          render() {
            return null;
          }
        }
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          handleClick = () => {}
          render() {
            return <button onClick={this.handleClick}>Button</button>;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          renderContent() {}
          render() {
            return <div>{this.renderContent()}</div>;
          }
        }
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          renderContent() {}
          render() {
            return (
              <div>
                <div>{this.renderContent()}</div>;
              </div>
            );
          }
        }
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          property = {}
          render() {
            return <div property={this.property}>Example</div>;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action = () => {}
          anotherAction = () => {
            this.action();
          }
          render() {
            return <button onClick={this.anotherAction}>Example</button>;
          }
        }
      `,
      features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove no-ts-old and fix
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action = () => {}
          anotherAction = () => this.action()
          render() {
            return <button onClick={this.anotherAction}>Example</button>;
          }
        }
      `,
      features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove no-ts-old and fix
    },
    {
      code: `
        class Foo extends Reblend.Component {
          getValue = () => {}
          value = this.getValue()
          render() {
            return this.value;
          }
        }
      `,
      features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove no-ts-old and fix
    },
    {
      code: `
        class Foo {
          action = () => {}
          anotherAction = () => this.action()
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action = async () => {}
          render() {
            return <button onClick={this.action}>Click</button>;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          async action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          * action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          async * action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action = function() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class ClassAssignPropertyInMethodTest extends Reblend.Component {
          constructor() {
            this.foo = 3;;
          }
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
    },
    {
      code: `
        class ClassPropertyTest extends Reblend.Component {
          foo;
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class ClassPropertyTest extends Reblend.Component {
          foo = a;
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          ['foo'] = a;
          render() {
            return <SomeComponent foo={this['foo']} />;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          ['foo'];
          render() {
            return <SomeComponent foo={this['foo']} />;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class ClassComputedTemplatePropertyTest extends Reblend.Component {
          [\`foo\`] = a;
          render() {
            return <SomeComponent foo={this[\`foo\`]} />;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class ClassComputedTemplatePropertyTest extends Reblend.Component {
          state = {}
          render() {
            return <div />;
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        class ClassLiteralComputedMemberTest extends Reblend.Component {
          ['foo']() {}
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
    },
    {
      code: `
        class ClassComputedTemplateMemberTest extends Reblend.Component {
          [\`foo\`]() {}
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
    },
    {
      code: `
        class ClassUseAssignTest extends Reblend.Component {
          foo() {}
          render() {
            this.foo;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      code: `
        class ClassUseAssignTest extends Reblend.Component {
          foo() {}
          render() {
            const { foo } = this;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      code: `
        class ClassUseDestructuringTest extends Reblend.Component {
          foo() {}
          render() {
            const { foo } = this;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      code: `
        class ClassUseDestructuringTest extends Reblend.Component {
          ['foo']() {}
          render() {
            const { 'foo': bar } = this;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      code: `
        class ClassComputedMemberTest extends Reblend.Component {
          [foo]() {}
          render() {
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      code: `
        class ClassWithLifecyleTest extends Reblend.Component {
          constructor(props) {
            super(props);
          }
          static getDerivedStateFromProps() {}
          componentWillMount() {}
          UNSAFE_componentWillMount() {}
          componentDidMount() {}
          componentWillReceiveProps() {}
          UNSAFE_componentWillReceiveProps() {}
          shouldComponentUpdate() {}
          componentWillUpdate() {}
          UNSAFE_componentWillUpdate() {}
          static getSnapshotBeforeUpdate() {}
          componentDidUpdate() {}
          componentDidCatch() {}
          componentWillUnmount() {}
          getChildContext() {}
          render() {
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      code: `
        var ClassWithLifecyleTest = createReblendClass({
          mixins: [],
          constructor(props) {
          },
          getDefaultProps() {
            return {}
          },
          getInitialState: function() {
            return {x: 0};
          },
          componentWillMount() {},
          UNSAFE_componentWillMount() {},
          componentDidMount() {},
          componentWillReceiveProps() {},
          UNSAFE_componentWillReceiveProps() {},
          shouldComponentUpdate() {},
          componentWillUpdate() {},
          UNSAFE_componentWillUpdate() {},
          componentDidUpdate() {},
          componentDidCatch() {},
          componentWillUnmount() {},
          getChildContext() {},
          render() {
            return <SomeComponent />;
          },
        })
      `,
    },
  ]),

  invalid: parsers.all([
    {
      code: `
        class Foo extends Reblend.Component {
          getDerivedStateFromProps() {}
          render() {
            return <div>Example</div>;
          }
        }
      `,
      errors: [
        {
          message:
            'Unused method or property "getDerivedStateFromProps" of class "Foo"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          property = {}
          render() {
            return <div>Example</div>;
          }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message: 'Unused method or property "property" of class "Foo"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          message: 'Unused method or property "handleClick" of class "Foo"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        var Foo = createReblendClass({
          handleClick() {},
          render() {
            return null;
          },
        })
      `,
      errors: [
        {
          message: 'Unused method or property "handleClick"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        var Foo = createReblendClass({
          a: 3,
          render() {
            return null;
          },
        })
      `,
      errors: [
        {
          message: 'Unused method or property "a"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          handleScroll() {}
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          message: 'Unused method or property "handleScroll" of class "Foo"',
          line: 3,
          column: 11,
        },
        {
          message: 'Unused method or property "handleClick" of class "Foo"',
          line: 4,
          column: 11,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          handleClick = () => {}
          render() {
            return null;
          }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message: 'Unused method or property "handleClick" of class "Foo"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action = async () => {}
          render() {
            return null;
          }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message: 'Unused method or property "action" of class "Foo"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          async action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          message: 'Unused method or property "action" of class "Foo"',
          line: 3,
          column: 17,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          * action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          message: 'Unused method or property "action" of class "Foo"',
          line: 3,
          column: 13,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          async * action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          message: 'Unused method or property "action" of class "Foo"',
          line: 3,
          column: 19,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          getInitialState() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          message: 'Unused method or property "getInitialState" of class "Foo"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
        class Foo extends Reblend.Component {
          action = function() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      features: ['class fields'],
      errors: [
        {
          message: 'Unused method or property "action" of class "Foo"',
          line: 3,
          column: 11,
        },
      ],
    },
    {
      code: `
         class ClassAssignPropertyInMethodTest extends Reblend.Component {
           constructor() {
             this.foo = 3;
           }
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message:
            'Unused method or property "foo" of class "ClassAssignPropertyInMethodTest"',
          line: 4,
          column: 19,
        },
      ],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           foo;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 12,
        },
      ],
      features: ['class fields'],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           foo = a;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 12,
        },
      ],
      features: ['class fields'],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           ['foo'];
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 13,
        },
      ],
      features: ['class fields'],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           ['foo'] = a;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 13,
        },
      ],
      features: ['class fields'],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           foo = a;
           render() {
             return <SomeComponent foo={this[foo]} />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 12,
        },
      ],
      features: ['class fields'],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           private foo;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 20,
        },
      ],
      features: ['ts', 'no-babel'],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           private foo() {}
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 20,
        },
      ],
      features: ['ts', 'no-babel'],
    },
    {
      code: `
         class Foo extends Reblend.Component {
           private foo = 3;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          message: 'Unused method or property "foo" of class "Foo"',
          line: 3,
          column: 20,
        },
      ],
      features: ['ts', 'no-babel'],
    },
  ]),
});
