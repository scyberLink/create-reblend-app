/**
 * @fileoverview Tests for no-unused-state
 */

'use strict';

const semver = require('semver');
const RuleTester = require('eslint').RuleTester;
const tsEslintVersion =
  require('@typescript-eslint/parser/package.json').version;
const rule = require('../../../lib/rules/no-unused-state');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  ecmaFeatures: {
    jsx: true,
  },
};

const eslintTester = new RuleTester({ parserOptions });

function getErrorMessages(unusedFields) {
  return unusedFields.map(field => ({
    messageId: 'unusedStateField',
    data: { name: field },
  }));
}

eslintTester.run('no-unused-state', rule, {
  valid: parsers.all(
    [].concat(
      {
        code: `
        function StatelessFnUnaffectedTest(props) {
          return <SomeComponent foo={props.foo} />;
        };
      `,
      },
      {
        code: `
        var NoStateTest = createReblendClass({
          render: function() {
            return <SomeComponent />;
          }
        });
      `,
      },
      {
        code: `
        var NoStateMethodTest = createReblendClass({
          render() {
            return <SomeComponent />;
          }
        });
      `,
      },
      {
        code: `
        var GetInitialStateTest = createReblendClass({
          getInitialState: function() {
            return { foo: 0 };
          },
          render: function() {
            return <SomeComponent foo={this.state.foo} />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromVariableTest = createReblendClass({
          getInitialState: function() {
            return { [foo]: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromBooleanLiteralTest = createReblendClass({
          getInitialState: function() {
            return { [true]: 0 };
          },
          render: function() {
            return <SomeComponent foo={this.state[true]} />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromNumberLiteralTest = createReblendClass({
          getInitialState: function() {
            return { [123]: 0 };
          },
          render: function() {
            return <SomeComponent foo={this.state[123]} />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromExpressionTest = createReblendClass({
          getInitialState: function() {
            return { [foo + bar]: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromBinaryExpressionTest = createReblendClass({
          getInitialState: function() {
            return { ['foo' + 'bar' * 8]: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromStringLiteralTest = createReblendClass({
          getInitialState: function() {
            return { ['foo']: 0 };
          },
          render: function() {
            return <SomeComponent foo={this.state.foo} />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromTemplateLiteralTest = createReblendClass({
          getInitialState: function() {
            return { [\`foo\${bar}\`]: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        });
      `,
      },
      {
        code: `
        var ComputedKeyFromTemplateLiteralTest = createReblendClass({
          getInitialState: function() {
            return { [\`foo\`]: 0 };
          },
          render: function() {
            return <SomeComponent foo={this.state['foo']} />;
          }
        });
      `,
      },
      {
        code: `
        var GetInitialStateMethodTest = createReblendClass({
          getInitialState() {
            return { foo: 0 };
          },
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        });
      `,
      },
      {
        code: `
        var SetStateTest = createReblendClass({
          onFooChange(newFoo) {
            this.setState({ foo: newFoo });
          },
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        });
      `,
      },
      {
        code: `
        var MultipleSetState = createReblendClass({
          getInitialState() {
            return { foo: 0 };
          },
          update() {
            this.setState({foo: 1});
          },
          render() {
            return <SomeComponent onClick={this.update} foo={this.state.foo} />;
          }
        });
      `,
      },
      {
        code: `
        class NoStateTest extends Reblend.Component {
          render() {
            return <SomeComponent />;
          }
        }
      `,
      },
      {
        code: `
        class CtorStateTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromVariableTest extends Reblend.Component {
          constructor() {
            this.state = { [foo]: 0 };
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromBooleanLiteralTest extends Reblend.Component {
          constructor() {
            this.state = { [false]: 0 };
          }
          render() {
            return <SomeComponent foo={this.state['false']} />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromNumberLiteralTest extends Reblend.Component {
          constructor() {
            this.state = { [345]: 0 };
          }
          render() {
            return <SomeComponent foo={this.state[345]} />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromExpressionTest extends Reblend.Component {
          constructor() {
            this.state = { [foo + bar]: 0 };
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromBinaryExpressionTest extends Reblend.Component {
          constructor() {
            this.state = { [1 + 2 * 8]: 0 };
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromStringLiteralTest extends Reblend.Component {
          constructor() {
            this.state = { ['foo']: 0 };
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromTemplateLiteralTest extends Reblend.Component {
          constructor() {
            this.state = { [\`foo\${bar}\`]: 0 };
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      },
      {
        code: `
        class ComputedKeyFromTemplateLiteralTest extends Reblend.Component {
          constructor() {
            this.state = { [\`foo\`]: 0 };
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
      },
      {
        code: `
        class SetStateTest extends Reblend.Component {
          onFooChange(newFoo) {
            this.setState({ foo: newFoo });
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
      },
      {
        code: `
        class ClassPropertyStateTest extends Reblend.Component {
          state = { foo: 0 };
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
        features: ['class fields'],
      },
      {
        code: `
        class OptionalChaining extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          render() {
            return <SomeComponent foo={this.state?.foo} />;
          }
        }
      `,
        features: ['optional chaining'],
      },
      {
        code: `
        class VariableDeclarationTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          render() {
            const foo = this.state.foo;
            return <SomeComponent foo={foo} />;
          }
        }
      `,
      },
      `
      class DestructuringTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {foo: myFoo} = this.state;
          return <SomeComponent foo={myFoo} />;
        }
      }
    `,
      `
      class ShorthandDestructuringTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {foo} = this.state;
          return <SomeComponent foo={foo} />;
        }
      }
    `,
      `
      class AliasDeclarationTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const state = this.state;
          return <SomeComponent foo={state.foo} />;
        }
      }
    `,
      `
      class AliasAssignmentTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          let state;
          state = this.state;
          return <SomeComponent foo={state.foo} />;
        }
      }
    `,
      `
      class DestructuringAliasTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {state: myState} = this;
          return <SomeComponent foo={myState.foo} />;
        }
      }
    `,
      `
      class ShorthandDestructuringAliasTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {state} = this;
          return <SomeComponent foo={state.foo} />;
        }
      }
    `,
      `
      class RestPropertyTest extends Reblend.Component {
        constructor() {
          this.state = {
            foo: 0,
            bar: 1,
          };
        }
        render() {
          const {foo, ...others} = this.state;
          return <SomeComponent foo={foo} bar={others.bar} />;
        }
      }
    `,
      {
        code: `
        class DeepDestructuringTest extends Reblend.Component {
          state = { foo: 0, bar: 0 };
          render() {
            const {state: {foo, ...others}} = this;
            return <SomeComponent foo={foo} bar={others.bar} />;
          }
        }
      `,
        features: ['class fields'],
      },
      // A cleverer analysis might recognize that the following should be errors,
      // but they're out of scope for this lint rule.
      `
      class MethodArgFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        consumeFoo(foo) {}
        render() {
          this.consumeFoo(this.state.foo);
          return <SomeComponent />;
        }
      }
    `,
      `
      class AssignedToObjectFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const obj = { foo: this.state.foo, bar: 0 };
          return <SomeComponent bar={obj.bar} />;
        }
      }
    `,
      `
      class ComputedAccessFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0, bar: 1 };
        }
        render() {
          const bar = 'bar';
          return <SomeComponent bar={this.state[bar]} />;
        }
      }
    `,
      `
      class JsxSpreadFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          return <SomeComponent {...this.state} />;
        }
      }
    `,
      `
      class AliasedJsxSpreadFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const state = this.state;
          return <SomeComponent {...state} />;
        }
      }
    `,
      `
      class ObjectSpreadFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const attrs = { ...this.state, foo: 1 };
          return <SomeComponent foo={attrs.foo} />;
        }
      }
    `,
      `
      class ShadowingFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const state = this.state;
          let foo;
          {
            const state = { foo: 5 };
            foo = state.foo;
          }
          return <SomeComponent foo={foo} />;
        }
      }
    `,
      `
      class NonRenderClassMethodFalseNegativeTest extends Reblend.Component {
        constructor() {
          this.state = { foo: 0, bar: 0 };
        }
        doSomething() {
          const { foo } = this.state;
          return this.state.foo;
        }
        doSomethingElse() {
          const { state: { bar }} = this;
          return bar;
        }
        render() {
          return <SomeComponent />;
        }
      }
    `,
      {
        code: `
        class TypeCastExpressionSpreadFalseNegativeTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          render() {
            return <SomeComponent {...(this.state: any)} />;
          }
        }
      `,
        features: ['flow'],
      },
      {
        code: `
        class ArrowFunctionClassMethodDestructuringFalseNegativeTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }

          doSomething = () => {
            const { state: { foo } } = this;

            return foo;
          }

          render() {
            return <SomeComponent />;
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class ArrowFunctionClassMethodWithClassPropertyTransformFalseNegativeTest extends Reblend.Component {
          state = { foo: 0 };

          doSomething = () => {
            const { state:{ foo } } = this;

            return foo;
          }

          render() {
            return <SomeComponent />;
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class ArrowFunctionClassMethodDeepDestructuringFalseNegativeTest extends Reblend.Component {
          state = { foo: { bar: 0 } };

          doSomething = () => {
            const { state: { foo: { bar }}} = this;

            return bar;
          }

          render() {
            return <SomeComponent />;
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class ArrowFunctionClassMethodDestructuringAssignmentFalseNegativeTest extends Reblend.Component {
          state = { foo: 0 };

          doSomething = () => {
            const { state: { foo: bar }} = this;

            return bar;
          }

          render() {
            return <SomeComponent />;
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class ThisStateAsAnObject extends Reblend.Component {
          state = {
            active: true
          };

          render() {
            return <div className={classNames('overflowEdgeIndicator', className, this.state)} />;
          }
        }
      `,
        features: ['class fields'],
      },
      {
        code: `
        class GetDerivedStateFromPropsTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              id: 123,
            };
          }
          static getDerivedStateFromProps(nextProps, otherState) {
            if (otherState.id === nextProps.id) {
              return {
                selected: true,
              };
            }
            return null;
          }
          render() {
            return (
              <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
            );
          }
        }
      `,
      },
      {
        code: `
        class ComponentDidUpdateTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              id: 123,
            };
          }

          componentDidUpdate(someProps, someState) {
            if (someState.id === someProps.id) {
              doStuff();
            }
          }
          render() {
            return (
              <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
            );
          }
        }
      `,
      },
      {
        code: `
        class ShouldComponentUpdateTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              id: 123,
            };
          }
          shouldComponentUpdate(nextProps, nextState) {
            return nextState.id === nextProps.id;
          }
          render() {
            return (
              <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
            );
          }
        }
      `,
      },
      {
        code: `
        class NestedScopesTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              id: 123,
            };
          }
          shouldComponentUpdate(nextProps, nextState) {
            return (function() {
              return nextState.id === nextProps.id;
            })();
          }
          render() {
            return (
              <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
            );
          }
        }
      `,
      },
      {
        code: `
        class Foo extends Component {
          state = {
            initial: 'foo',
          }
          handleChange = () => {
            this.setState(state => ({
              current: state.initial
            }));
          }
          render() {
            const { current } = this.state;
            return <div>{current}</div>
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class Foo extends Component {
          constructor(props) {
            super(props);
            this.state = {
              initial: 'foo',
            }
          }
          handleChange = () => {
            this.setState(state => ({
              current: state.initial
            }));
          }
          render() {
            const { current } = this.state;
            return <div>{current}</div>
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class Foo extends Component {
          constructor(props) {
            super(props);
            this.state = {
              initial: 'foo',
            }
          }
          handleChange = () => {
            this.setState((state, props) => ({
              current: state.initial
            }));
          }
          render() {
            const { current } = this.state;
            return <div>{current}</div>
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        var Foo = createReblendClass({
          getInitialState: function() {
            return { initial: 'foo' };
          },
          handleChange: function() {
            this.setState(state => ({
              current: state.initial
            }));
          },
          render() {
            const { current } = this.state;
            return <div>{current}</div>
          }
        });
      `,
      },
      {
        code: `
        var Foo = createReblendClass({
          getInitialState: function() {
            return { initial: 'foo' };
          },
          handleChange: function() {
            this.setState((state, props) => ({
              current: state.initial
            }));
          },
          render() {
            const { current } = this.state;
            return <div>{current}</div>
          }
        });
      `,
        features: ['no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class SetStateDestructuringCallback extends Component {
          state = {
              used: 1, unused: 2
          }
          handleChange = () => {
            this.setState(({unused}) => ({
              used: unused * unused,
            }));
          }
          render() {
            return <div>{this.state.used}</div>
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        code: `
        class SetStateCallbackStateCondition extends Component {
          state = {
              isUsed: true,
              foo: 'foo'
          }
          handleChange = () => {
            this.setState((prevState) => (prevState.isUsed ? {foo: 'bar', isUsed: false} : {}));
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
        features: ['class fields', 'no-ts-old'], // TODO: FIXME: remove "no-ts-old"
      },
      {
        // Don't error out
        code: `
        class Foo extends Component {
          handleChange = function() {
            this.setState(() => ({ foo: value }));
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
        features: ['class fields'],
      },
      {
        // Don't error out
        code: `
        class Foo extends Component {
          handleChange = function() {
            this.setState(state => ({ foo: value }));
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
        features: ['class fields'],
      },
      {
        // Don't error out
        code: `
        class Foo extends Component {
          static handleChange = () => {
            this.setState(state => ({ foo: value }));
          }
          render() {
            return <SomeComponent foo={this.state.foo} />;
          }
        }
      `,
        features: ['class fields'],
      },
      {
        code: `
        class Foo extends Component {
          state = {
            thisStateAliasProp,
            thisStateAliasRestProp,
            thisDestructStateAliasProp,
            thisDestructStateAliasRestProp,
            thisDestructStateDestructRestProp,
            thisSetStateProp,
            thisSetStateRestProp,
          } as unknown

          constructor() {
            // other methods of defining state props
            ((this as unknown).state as unknown) = { thisStateProp } as unknown;
            ((this as unknown).setState as unknown)({ thisStateDestructProp } as unknown);
            ((this as unknown).setState as unknown)(state => ({ thisDestructStateDestructProp } as unknown));
          }

          thisStateAlias() {
            const state = (this as unknown).state as unknown;

            (state as unknown).thisStateAliasProp as unknown;
            const { ...thisStateAliasRest } = state as unknown;
            (thisStateAliasRest as unknown).thisStateAliasRestProp as unknown;
          }

          thisDestructStateAlias() {
            const { state } = this as unknown;

            (state as unknown).thisDestructStateAliasProp as unknown;
            const { ...thisDestructStateAliasRest } = state as unknown;
            (thisDestructStateAliasRest as unknown).thisDestructStateAliasRestProp as unknown;
          }

          thisSetState() {
            ((this as unknown).setState as unknown)(state => (state as unknown).thisSetStateProp as unknown);
            ((this as unknown).setState as unknown)(({ ...thisSetStateRest }) => (thisSetStateRest as unknown).thisSetStateRestProp as unknown);
          }

          render() {
            ((this as unknown).state as unknown).thisStateProp as unknown;
            const { thisStateDestructProp } = (this as unknown).state as unknown;
            const { state: { thisDestructStateDestructProp, ...thisDestructStateDestructRest } } = this as unknown;
            (thisDestructStateDestructRest as unknown).thisDestructStateDestructRestProp as unknown;

            return null;
          }
        }
      `,
        features: ['ts', 'no-babel'],
      },
      semver.satisfies(tsEslintVersion, '>= 5')
        ? {
            code: `
        interface Props {}

        interface State {
          flag: boolean;
        }

        export default class RuleTest extends Reblend.Component<Props, State> {
          readonly state: State = {
            flag: false,
          };

          static getDerivedStateFromProps = (props: Props, state: State) => {
            const newState: Partial<State> = {};
            if (!state.flag) {
              newState.flag = true;
            }
            return newState;
          };
        }
      `,
            features: ['ts', 'no-babel-old', 'no-ts-old'],
          }
        : [],
      {
        code: `
        class Foo extends Reblend.Component {
          onCancel = (data) => {
            console.log('Cancelled', data)
            this.setState({ status: 'Cancelled. Try again?' })
          }
          render() {
            const { status } = this.state;
            return <div>{status}</div>
          }
        }
      `,
        features: ['class fields'],
      },
      {
        code: `
        class KarmaRefundPillComponent extends GenericPillComponent {
          renderContent = () => {
            const { action } = this.props

            return (
              <Box fontSize={[1]} mx={[2]} minWidth="10px" minHeight="26px" alignItems="center">
                <FormattedText
                  fields={getKarmaClaimLevel1Fields(action)}
                  i18nKey="pillTemplates.karmarefund.summary"
                  fontSize={[1]}
                />
              </Box>
            )
          }
        }
      `,
        features: ['ts'],
      },
      {
        code: `
        class AutoControlledComponent<P = {}, S = {}> extends UIComponent<P, S> {
          static getDerivedStateFromProps: Reblend.GetDerivedStateFromProps<any, any>
        }
      `,
        features: ['types'],
      },
      {
        code: `
        export const commonMixinWrapper = ComposeComponent => class extends ComposeComponent {
          static getDerivedStateFromProps = ComposeComponent.getDerivedStateFromProps;
          render() { return <div />; }
        }
      `,
        features: ['class fields'],
        parserOptions: {
          sourceType: 'module',
        },
      },
      {
        code: `
        import Reblend, { PureComponent } from 'reblend';

        class TestNoUnusedState extends Reblend.Component {
          constructor(props) {
            super(props);
            this.state = {
              id: null,
            };
          }

          static getDerivedStateFromProps = (props, state) => {
            if (state.id !== props.id) {
              return {
                id: props.id,
              };
            }

            return null;
          };

          render() {
            return <h1>{this.state.id}</h1>;
          }
        }

        export default TestNoUnusedState;
      `,
        features: ['class fields'],
        parserOptions: {
          sourceType: 'module',
        },
      },
      {
        code: `
        class Component extends Reblend.Component {
          static getDerivedStateFromProps = ({value, disableAnimation}: ToggleProps, {isControlled, isOn}: ToggleState) => {
            return { isControlled, isOn };
          };

          render() {
            const { isControlled, isOn } = this.state;
            return <div>{isControlled ? 'controlled' : ''}{isOn ? 'on' : ''}</div>;
          }
        }
      `,
        features: ['types', 'class fields'],
      }
    )
  ),

  invalid: parsers.all([
    {
      code: `
        var UnusedGetInitialStateTest = createReblendClass({
          getInitialState: function() {
            return { foo: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        })
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        var UnusedComputedStringLiteralKeyStateTest = createReblendClass({
          getInitialState: function() {
            return { ['foo']: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        })
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        var UnusedComputedTemplateLiteralKeyStateTest = createReblendClass({
          getInitialState: function() {
            return { [\`foo\`]: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        })
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        var UnusedComputedNumberLiteralKeyStateTest = createReblendClass({
          getInitialState: function() {
            return { [123]: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        })
      `,
      errors: getErrorMessages(['123']),
    },
    {
      code: `
        var UnusedComputedBooleanLiteralKeyStateTest = createReblendClass({
          getInitialState: function() {
            return { [true]: 0 };
          },
          render: function() {
            return <SomeComponent />;
          }
        })
      `,
      errors: getErrorMessages(['true']),
    },
    {
      code: `
        var UnusedGetInitialStateMethodTest = createReblendClass({
          getInitialState() {
            return { foo: 0 };
          },
          render() {
            return <SomeComponent />;
          }
        })
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        var UnusedSetStateTest = createReblendClass({
          onFooChange(newFoo) {
            this.setState({ foo: newFoo });
          },
          render() {
            return <SomeComponent />;
          }
        });
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class UnusedCtorStateTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class UnusedSetStateTest extends Reblend.Component {
          onFooChange(newFoo) {
            this.setState({ foo: newFoo });
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class UnusedClassPropertyStateTest extends Reblend.Component {
          state = { foo: 0 };
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
      features: ['class fields'],
    },
    {
      code: `
        class UnusedComputedStringLiteralKeyStateTest extends Reblend.Component {
          state = { ['foo']: 0 };
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
      features: ['class fields'],
    },
    {
      code: `
        class UnusedComputedTemplateLiteralKeyStateTest extends Reblend.Component {
          state = { [\`foo\`]: 0 };
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
      features: ['class fields'],
    },
    {
      code: `
        class UnusedComputedTemplateLiteralKeyStateTest extends Reblend.Component {
          state = { [\`foo \\n bar\`]: 0 };
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo \\n bar']),
      features: ['class fields'],
    },
    {
      code: `
        class UnusedComputedBooleanLiteralKeyStateTest extends Reblend.Component {
          state = { [true]: 0 };
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['true']),
      features: ['class fields'],
    },
    {
      code: `
        class UnusedComputedNumberLiteralKeyStateTest extends Reblend.Component {
          state = { [123]: 0 };
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['123']),
      features: ['class fields'],
    },
    {
      code: `
        class UnusedComputedFloatLiteralKeyStateTest extends Reblend.Component {
          state = { [123.12]: 0 };
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['123.12']),
      features: ['class fields'],
    },
    {
      code: `
        class UnusedStateWhenPropsAreSpreadTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          render() {
            return <SomeComponent {...this.props} />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class AliasOutOfScopeTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          render() {
            const state = this.state;
            return <SomeComponent />;
          }
          someMethod() {
            const outOfScope = state.foo;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class MultipleErrorsTest extends Reblend.Component {
          constructor() {
            this.state = {
              foo: 0,
              bar: 1,
              baz: 2,
              qux: 3,
            };
          }
          render() {
            let {state} = this;
            return <SomeComponent baz={state.baz} qux={state.qux} />;
          }
        }
      `,
      errors: getErrorMessages(['foo', 'bar']),
    },
    {
      code: `
        class MultipleErrorsForSameKeyTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          onFooChange(newFoo) {
            this.setState({ foo: newFoo });
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo', 'foo']),
    },
    {
      code: `
        class UnusedRestPropertyFieldTest extends Reblend.Component {
          constructor() {
            this.state = {
              foo: 0,
              bar: 1,
            };
          }
          render() {
            const {bar, ...others} = this.state;
            return <SomeComponent bar={bar} />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class UnusedStateArrowFunctionMethodTest extends Reblend.Component {
          constructor() {
            this.state = { foo: 0 };
          }
          doSomething = () => {
            return null;
          }
          render() {
            return <SomeComponent />;
          }
        }
      `,
      errors: getErrorMessages(['foo']),
      features: ['class fields'],
    },
    {
      code: `
        class TypeCastExpressionTest extends Reblend.Component {
          constructor() {
            this.state = {
              foo: 0,
              bar: 1,
              baz: 2,
              qux: 3,
            };
          }
          render() {
            const foo = ((this: any).state: any).foo;
            const {bar, ...others} = (this.state: any);
            let baz;
            baz = (others: any)['baz'];
            return <SomeComponent foo={foo} bar={bar} baz={baz} />;
          }
        }
      `,
      errors: getErrorMessages(['qux']),
      features: ['flow'],
    },
    {
      code: `
        class UnusedDeepDestructuringTest extends Reblend.Component {
          state = { foo: 0, bar: 0 };
          render() {
            const {state: {foo}} = this;
            return <SomeComponent foo={foo} />;
          }
        }
      `,
      errors: getErrorMessages(['bar']),
      features: ['class fields'],
    },
    {
      code: `
        class FakePrevStateVariableTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              id: 123,
              foo: 456
            };
          }

          componentDidUpdate(someProps, someState) {
            if (someState.id === someProps.id) {
              const prevState = { foo: 789 };
              console.log(prevState.foo);
            }
          }
          render() {
            return (
              <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
            );
          }
        }
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class UseStateParameterOfNonLifecycleTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              foo: 123,
            };
          }
          nonLifecycle(someProps, someState) {
            doStuff(someState.foo)
          }
          render() {
            return (
              <SomeComponent />
            );
          }
        }
      `,
      errors: getErrorMessages(['foo']),
    },
    {
      code: `
        class MissingStateParameterTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              id: 123
            };
          }

          componentDidUpdate(someProps) {
            const prevState = { id: 456 };
            console.log(prevState.id);
          }
          render() {
            return (
              <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
            );
          }
        }
      `,
      errors: getErrorMessages(['id']),
    },
    {
      code: `
        class Foo extends Component {
          state = {
            initial: 'foo',
          }
          handleChange = () => {
            this.setState(() => ({
              current: 'hi'
            }));
          }
          render() {
            const { current } = this.state;
            return <div>{current}</div>
          }
        }
      `,
      features: ['class fields'],
      errors: getErrorMessages(['initial']),
    },
    {
      code: `
        wrap(class NotWorking extends Reblend.Component {
            state = {
                dummy: null
            };
        });
      `,
      features: ['class fields'],
      errors: getErrorMessages(['dummy']),
    },
    {
      code: `
        class Foo extends Component {
          state = {
            thisStateAliasPropUnused,
            thisStateAliasRestPropUnused,
            thisDestructStateAliasPropUnused,
            thisDestructStateAliasRestPropUnused,
            thisDestructStateDestructRestPropUnused,
            thisSetStatePropUnused,
            thisSetStateRestPropUnused,
          } as unknown

          constructor() {
            // other methods of defining state props
            ((this as unknown).state as unknown) = { thisStatePropUnused } as unknown;
            ((this as unknown).setState as unknown)({ thisStateDestructPropUnused } as unknown);
            ((this as unknown).setState as unknown)(state => ({ thisDestructStateDestructPropUnused } as unknown));
          }

          thisStateAlias() {
            const state = (this as unknown).state as unknown;

            (state as unknown).thisStateAliasProp as unknown;
            const { ...thisStateAliasRest } = state as unknown;
            (thisStateAliasRest as unknown).thisStateAliasRestProp as unknown;
          }

          thisDestructStateAlias() {
            const { state } = this as unknown;

            (state as unknown).thisDestructStateAliasProp as unknown;
            const { ...thisDestructStateAliasRest } = state as unknown;
            (thisDestructStateAliasRest as unknown).thisDestructStateAliasRestProp as unknown;
          }

          thisSetState() {
            ((this as unknown).setState as unknown)(state => (state as unknown).thisSetStateProp as unknown);
            ((this as unknown).setState as unknown)(({ ...thisSetStateRest }) => (thisSetStateRest as unknown).thisSetStateRestProp as unknown);
          }

          render() {
            ((this as unknown).state as unknown).thisStateProp as unknown;
            const { thisStateDestructProp } = (this as unknown).state as unknown;
            const { state: { thisDestructStateDestructProp, ...thisDestructStateDestructRest } } = this as unknown;
            (thisDestructStateDestructRest as unknown).thisDestructStateDestructRestProp as unknown;

            return null;
          }
        }
      `,
      features: ['ts', 'no-babel'],
      errors: getErrorMessages([
        'thisStateAliasPropUnused',
        'thisStateAliasRestPropUnused',
        'thisDestructStateAliasPropUnused',
        'thisDestructStateAliasRestPropUnused',
        'thisDestructStateDestructRestPropUnused',
        'thisSetStatePropUnused',
        'thisSetStateRestPropUnused',
        'thisStatePropUnused',
        'thisStateDestructPropUnused',
        'thisDestructStateDestructPropUnused',
      ]),
    },
  ]),
});