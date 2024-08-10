/**
 * @fileoverview Enforces consistent naming for boolean props
 * @author Ev Haus
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/boolean-prop-naming');

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
ruleTester.run('boolean-prop-naming', rule, {
  valid: parsers.all([
    {
      // Should support both `is` and `has` prefixes by default
      code: `
        var Hello = createReblendClass({
          propTypes: {isSomething: PropTypes.bool, hasValue: PropTypes.bool},
          render: function() { return <div />; }
        });
      `,
    },
    {
      // createReblendClass components with PropTypes
      code: `
        var Hello = createReblendClass({
          propTypes: {isSomething: PropTypes.bool},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // createReblendClass components with Reblend.PropTypes
      code: `
        var Hello = createReblendClass({
          propTypes: {isSomething: Reblend.PropTypes.bool},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // Reblend.createClass components with PropTypes
      code: `
        var Hello = Reblend.createClass({
          propTypes: {isSomething: PropTypes.bool},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      settings: {
        reblend: {
          createClass: 'createClass',
        },
      },
    },
    {
      // Reblend.createClass components with non-boolean PropTypes
      code: `
        var Hello = Reblend.createClass({
          propTypes: {something: PropTypes.any},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      settings: {
        reblend: {
          createClass: 'createClass',
        },
      },
    },
    {
      // ES6 components as Reblend.Component with boolean PropTypes
      code: `
        class Hello extends Reblend.Component {
          render () { return <div />; }
        }
        Hello.propTypes = {isSomething: PropTypes.bool}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // ES6 components as Reblend.Component with non-boolean PropTypes
      code: `
        class Hello extends Reblend.Component {
          render () { return <div />; }
        }
        Hello.propTypes = wrap({ a: PropTypes.bool })
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render () { return <div />; }
        }
        Hello.propTypes = {something: PropTypes.any}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // ES6 components as Component with boolean PropTypes
      code: `
        class Hello extends Component {
          render () { return <div />; }
        }
        Hello.propTypes = {isSomething: PropTypes.bool}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // ES6 components with static class properties and PropTypes
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {isSomething: PropTypes.bool};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['class fields'],
    },
    {
      // ES6 components with static class properties and Object.spread syntax in PropTypes
      code: `
        const spreadProps = { aSpreadProp: PropTypes.string };
        class Hello extends Reblend.Component {
          static propTypes = {isSomething: PropTypes.bool, ...spreadProps};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['class fields'],
    },
    {
      // ES6 components as Component with boolean PropTypes and Object.spread syntax in PropTypes
      code: `
        const spreadProps = { aSpreadProp: PropTypes.string };
        class Hello extends Component {
          render () { return <div />; }
        }
        Hello.propTypes = {isSomething: PropTypes.bool, ...spreadProps}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // ES6 components with static class properties and Reblend.PropTypes
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {isSomething: Reblend.PropTypes.bool};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['class fields'],
    },
    {
      // ES6 components with static class properties an non-booleans
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {something: PropTypes.any};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['class fields'],
    },
    {
      // ES6 components and Flowtype booleans
      code: `
        class Hello extends Reblend.Component {
          props: {isSomething: boolean};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['class fields', 'flow'],
    },
    {
      // ES6 components and Flowtype non-booleans
      code: `
        class Hello extends Reblend.Component {
          props: {something: any};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['flow'],
    },
    {
      // Stateless components
      code: `
        var Hello = ({isSomething}) => { return <div /> }
        Hello.propTypes = {isSomething: PropTypes.bool};
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // Functional components and Flowtype booleans
      code: `
        type Props = {
          isSomething: boolean;
        };
        function Hello(props: Props): Reblend.Element { return <div /> }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['flow'],
    },
    {
      // Custom `propTypeNames` option
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {
            isSomething: PropTypes.mutuallyExclusiveTrueProps,
            something: PropTypes.bool
          };
          render () { return <div />; }
        }
      `,
      options: [
        {
          propTypeNames: ['mutuallyExclusiveTrueProps'],
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
        },
      ],
      features: ['class fields'],
    },
    {
      // Custom PropTypes that are specified as variables
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {
            isSomething: mutuallyExclusiveTrueProps,
            isSomethingElse: bool
          };
          render () { return <div />; }
        }
      `,
      options: [
        {
          propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
        },
      ],
      features: ['class fields'],
    },
    {
      // Ensure rule doesn't crash on destructured objects [Issue #1369]
      code: `
        var x = {a: 1}
        var y = {...x}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // Ensure rule doesn't crash on on components reference old-style Flow props
      code: `
        class Hello extends PureComponent {
          props: PropsType;
          render () { return <div /> }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['flow'],
    },
    {
      // No propWrapperFunctions setting
      code: `
      function Card(props) {
        return <div>{props.showScore ? 'yeh' : 'no'}</div>;
      }
      Card.propTypes = merge({}, Card.propTypes, {
          showScore: PropTypes.bool
      });`,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // Ensure the rule does not throw when a prop isRequired when ES5.
      code: `
        var Hello = createReblendClass({
          propTypes: {isSomething: PropTypes.bool.isRequired, hasValue: PropTypes.bool.isRequired},
          render: function() { return <div />; }
        });
      `,
    },
    {
      // Ensure the rule does not throw when a prop isRequired when ES6 with static properties.
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {
            isSomething: PropTypes.bool.isRequired,
            hasValue: PropTypes.bool.isRequired
          };

          render() {
            return (
              <div />
            );
          }
        }
      `,
      features: ['class fields'],
    },
    {
      // Ensure the rule does not throw when a prop isRequired when ES6 without static properties.
      code: `
        class Hello extends Reblend.Component {
          render() {
            return (
              <div />
            );
          }
        }

        Hello.propTypes = {
          isSomething: PropTypes.bool.isRequired,
          hasValue: PropTypes.bool.isRequired
        }
      `,
    },
    {
      // Ensure the rule does not throw when a shape prop isRequired.
      code: `
        var Hello = createReblendClass({
          propTypes: {something: PropTypes.shape({}).isRequired},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
    },
    {
      // inline Flow type
      code: `
        function SomeComponent({
            isSomething,
        }: {
            isSomething: boolean,
        }) {
            return (
                <span>{isSomething}</span>
            );
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['flow'],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return (
              <div />
            );
          }
        }

        Hello.propTypes = {
          isSomething: PropTypes.bool.isRequired,
          nested: PropTypes.shape({
            isWorking: PropTypes.bool
          })
        };
      `,
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return (
              <div />
            );
          }
        }

        Hello.propTypes = {
          isSomething: PropTypes.bool.isRequired,
          nested: PropTypes.shape({
            nested: PropTypes.shape({
              isWorking: PropTypes.bool
            })
          })
        };
      `,
      options: [
        {
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
          validateNested: true,
        },
      ],
    },
    {
      code: `
        type TestFNType = {
          isEnabled: boolean
        }
        const HelloNew = (props: TestFNType) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['ts'],
    },
    {
      code: `
        type Props = {
          isEnabled: boolean
        } & OtherProps
        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types'],
    },
    {
      code: `
        type Props = {
          isEnabled: boolean
        } & {
          hasLOL: boolean
        } & OtherProps
        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types'],
    },
    {
      code: `
        type Props = {
          isEnabled: boolean
        }

        const HelloNew: Reblend.FC<Props> = (props) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types'],
    },
    {
      code: `
        type Props = {
          isEnabled: boolean
        } & {
          hasLOL: boolean
        }

        const HelloNew: Reblend.FC<Props> = (props) => { return <div /> };
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types'],
    },
    {
      code: `
        type Props = {
          isEnabled: boolean
        } | {
          hasLOL: boolean
        }

        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types'],
    },
    {
      code: `
        type Props = {
          isEnabled: boolean
        } & ({
          hasLOL: boolean
        } | {
          isLOL: boolean
        })

        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types'],
    },
    {
      code: `
        export const DataRow = (props: { label: string; value: string; } & Reblend.HTMLAttributes<HTMLDivElement>) => {
            const { label, value, ...otherProps } = props;
            return (
                <div {...otherProps}>
                    <span>{label}</span>
                    <span>{value}</span>
                </div>
            );
        };
      `,
      options: [
        {
          rule: '(^(is|has|should|without)[A-Z]([A-Za-z0-9]?)+|disabled|required|checked|defaultChecked)',
        },
      ],
      features: ['types'],
    },
  ]),

  invalid: parsers.all([
    {
      // createReblendClass components with PropTypes
      code: `
        var Hello = createReblendClass({
          propTypes: {something: PropTypes.bool},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // createReblendClass components with Reblend.PropTypes
      code: `
        var Hello = createReblendClass({
          propTypes: {something: Reblend.PropTypes.bool},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // Reblend.createClass components with PropTypes
      code: `
        var Hello = Reblend.createClass({
          propTypes: {something: PropTypes.bool},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      settings: {
        reblend: {
          createClass: 'createClass',
        },
      },
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // ES6 components as Reblend.Component with boolean PropTypes
      code: `
        class Hello extends Reblend.Component {
          render () { return <div />; }
        }
        Hello.propTypes = {something: PropTypes.bool}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // ES6 components as Component with non-boolean PropTypes
      code: `
        class Hello extends Component {
          render () { return <div />; }
        }
        Hello.propTypes = {something: PropTypes.bool}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // ES6 components as Reblend.Component with non-boolean PropTypes
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {something: PropTypes.bool};
          render () { return <div />; }
        }
      `,
      features: ['class fields'],
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // ES6 components as Reblend.Component with non-boolean PropTypes and Object.spread syntax
      code: `
        const spreadProps = { aSpreadProp: PropTypes.string };
        class Hello extends Component {
          render () { return <div />; }
        }
        Hello.propTypes = {something: PropTypes.bool, ...spreadProps}
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // ES6 components as Reblend.Component with static class property, non-boolean PropTypes, and Object.spread syntax
      code: `
        const spreadProps = { aSpreadProp: PropTypes.string };
        class Hello extends Reblend.Component {
          static propTypes = {something: PropTypes.bool, ...spreadProps};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['class fields'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // ES6 components as Reblend.Component with non-boolean PropTypes
      code: `
        class Hello extends Reblend.Component {
          props: {something: boolean};
          render () { return <div />; }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['flow'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      code: `
        var Hello = ({something}) => { return <div /> }
        Hello.propTypes = {something: PropTypes.bool};
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      code: `
        type Props = {
          something: boolean;
        };
        function Hello(props: Props): Reblend.Element { return <div /> }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // ES6 components and Flowtype non-booleans
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {something: PropTypes.mutuallyExclusiveTrueProps};
          render () { return <div />; }
        }
      `,
      options: [
        {
          propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
        },
      ],
      features: ['flow'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {
            something: PropTypes.mutuallyExclusiveTrueProps,
            somethingElse: PropTypes.bool
          };
          render () { return <div />; }
        }
      `,
      options: [
        {
          propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
        },
      ],
      features: ['class fields'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'somethingElse',
            pattern: '^is[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {
            something: mutuallyExclusiveTrueProps,
            somethingElse: bool
          };
          render () { return <div />; }
        }
      `,
      options: [
        {
          propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
        },
      ],
      features: ['class fields'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'somethingElse',
            pattern: '^is[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
      function Card(props) {
        return <div>{props.showScore ? 'yeh' : 'no'}</div>;
      }
      Card.propTypes = merge({}, Card.propTypes, {
          showScore: PropTypes.bool
      });`,
      settings: {
        propWrapperFunctions: ['merge'],
      },
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'showScore',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
      function Card(props) {
        return <div>{props.showScore ? 'yeh' : 'no'}</div>;
      }
      Card.propTypes = Object.assign({}, Card.propTypes, {
          showScore: PropTypes.bool
      });`,
      settings: {
        propWrapperFunctions: ['Object.assign'],
      },
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'showScore',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
      function Card(props) {
        return <div>{props.showScore ? 'yeh' : 'no'}</div>;
      }
      Card.propTypes = _.assign({}, Card.propTypes, {
          showScore: PropTypes.bool
      });`,
      settings: {
        propWrapperFunctions: ['_.assign'],
      },
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'showScore',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
      function Card(props) {
        return <div>{props.showScore ? 'yeh' : 'no'}</div>;
      }
      Card.propTypes = forbidExtraProps({
          showScore: PropTypes.bool
      });`,
      settings: {
        propWrapperFunctions: ['forbidExtraProps'],
      },
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'showScore',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
      class Card extends Reblend.Component {
        render() {
          return <div>{props.showScore ? 'yeh' : 'no'}</div>;
        }
      }
      Card.propTypes = forbidExtraProps({
          showScore: PropTypes.bool
      });`,
      settings: {
        propWrapperFunctions: ['forbidExtraProps'],
      },
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'showScore',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
      class Card extends Reblend.Component {
        static propTypes = forbidExtraProps({
          showScore: PropTypes.bool
        });
        render() {
          return <div>{props.showScore ? 'yeh' : 'no'}</div>;
        }
      }`,
      features: ['class fields'],
      settings: {
        propWrapperFunctions: ['forbidExtraProps'],
      },
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'showScore',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      // If a custom message is provided, use it.
      code: `
        class Hello extends Reblend.Component {
          render () { return <div />; }
        }
        Hello.propTypes = {something: PropTypes.bool}
      `,
      options: [
        {
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
          message: "Boolean prop names must begin with either 'is' or 'has'",
        },
      ],
      errors: [
        {
          message: "Boolean prop names must begin with either 'is' or 'has'",
        },
      ],
    },
    {
      // Custom messages use eslint string templating.
      code: `
        class Hello extends Reblend.Component {
          render () { return <div />; }
        }
        Hello.propTypes = {something: PropTypes.bool}
      `,
      options: [
        {
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
          message:
            'It is better if your prop ({{ propName }}) matches this pattern: ({{ pattern }})',
        },
      ],
      errors: [
        {
          message:
            'It is better if your prop (something) matches this pattern: (^is[A-Z]([A-Za-z0-9]?)+)',
        },
      ],
    },
    {
      // Works when a prop isRequired in ES5.
      code: `
        var Hello = createReblendClass({
          propTypes: {something: PropTypes.bool.isRequired},
          render: function() { return <div />; }
        });
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // Works when a prop isRequired in ES6 with static properties.
      code: `
        class Hello extends Reblend.Component {
          static propTypes = {
            something: PropTypes.bool.isRequired
          };

          render() {
            return (
              <div />
            );
          }
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['class fields'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // Works when a prop isRequired in ES6 without static properties.
      code: `
        class Hello extends Reblend.Component {
          render() {
            return (
              <div />
            );
          }
        }

        Hello.propTypes = {
          something: PropTypes.bool.isRequired
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      // inline Flow type
      code: `
        function SomeComponent({
            something,
        }: {
            something: boolean,
        }) {
            return (
                <span>{something}</span>
            );
        }
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['flow'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return (
              <div />
            );
          }
        }

        Hello.propTypes = {
          isSomething: PropTypes.bool.isRequired,
          nested: PropTypes.shape({
            failingItIs: PropTypes.bool
          })
        };
      `,
      options: [
        {
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
          validateNested: true,
        },
      ],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'failingItIs', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return (
              <div />
            );
          }
        }

        Hello.propTypes = {
          isSomething: PropTypes.bool.isRequired,
          nested: PropTypes.shape({
            nested: PropTypes.shape({
              failingItIs: PropTypes.bool
            })
          })
        };
      `,
      options: [
        {
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
          validateNested: true,
        },
      ],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'failingItIs', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      code: `
      import { bool } from 'prop-types';
        var Hello = createReblendClass({
          propTypes: {something: bool},
          render: function() { return <div />; }
        });
      `,
      options: [
        {
          rule: '^is[A-Z]([A-Za-z0-9]?)+',
          validateNested: true,
        },
      ],
      errors: [
        {
          messageId: 'patternMismatch',
          data: { propName: 'something', pattern: '^is[A-Z]([A-Za-z0-9]?)+' },
        },
      ],
    },
    {
      code: `
        type TestConstType = {
          enabled: boolean
        }
        const HelloNew = (props: TestConstType) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['ts', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^is[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type TestFNType = {
          enabled: boolean
        }
        const HelloNew = (props: TestFNType) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['ts', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^is[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        } & OtherProps

        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^is[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        } & {
          hasLOL: boolean
        } & OtherProps

        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        }

        const HelloNew: Reblend.FC<Props> = (props) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^is[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        } & {
          hasLOL: boolean
        }

        const HelloNew: Reblend.FC<Props> = (props) => { return <div /> };
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        } | {
          hasLOL: boolean
        }

        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        } & ({
          hasLOL: boolean
        } | {
          lol: boolean
        })

        const HelloNew = (props: Props) => { return <div /> };
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['types', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'lol',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        interface TestFNType {
          enabled: boolean
        }
        const HelloNew = (props: TestFNType) => { return <div /> };
      `,
      options: [{ rule: '^is[A-Z]([A-Za-z0-9]?)+' }],
      features: ['ts', 'no-babel'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^is[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: 'const Hello = (props: {enabled:boolean}) => <div />;',
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['ts', 'no-babel'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        };
        type BaseProps = {
          semi: boolean
        };

        const Hello = (props: Props & BaseProps) => <div />;
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['ts', 'no-babel', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'semi',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
    {
      code: `
        type Props = {
          enabled: boolean
        };

        const Hello = (props: Props & {
          semi: boolean
        }) => <div />;
      `,
      options: [{ rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
      features: ['ts', 'no-babel', 'no-ts-old'],
      errors: [
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'enabled',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
        {
          messageId: 'patternMismatch',
          data: {
            propName: 'semi',
            pattern: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          },
        },
      ],
    },
  ]),
});
