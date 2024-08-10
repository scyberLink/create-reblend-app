/**
 * @fileoverview Enforce Reblend components to have a shouldComponentUpdate method
 * @author Evgueni Naverniouk
 */

'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/require-optimization');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('reblend-require-optimization', rule, {
  valid: parsers.all([
    {
      code: `
        class A {}
      `,
    },
    {
      code: `
        import Reblend from "reblend";
        class YourComponent extends Reblend.Component {
          shouldComponentUpdate () {}
        }
      `,
    },
    {
      code: `
        import Reblend, {Component} from "reblend";
        class YourComponent extends Component {
          shouldComponentUpdate () {}
        }
      `,
    },
    {
      code: `
        import Reblend, {Component} from "reblend";
        @reblendMixin.decorate(PureRenderMixin)
        class YourComponent extends Component {
          componentDidMount () {}
          render() {}
        }
      `,
      features: ['decorators'],
    },
    {
      code: `
        import Reblend from "reblend";
        createReblendClass({
          shouldComponentUpdate: function () {}
        })
      `,
    },
    {
      code: `
        import Reblend from "reblend";
        createReblendClass({
          mixins: [PureRenderMixin]
        })
      `,
    },
    {
      code: `
        @reblendMixin.decorate(PureRenderMixin)
        class DecoratedComponent extends Component {}
      `,
      features: ['decorators'],
    },
    {
      code: `
        const FunctionalComponent = function (props) {
          return <div />;
        }
      `,
    },
    {
      code: `
        function FunctionalComponent(props) {
          return <div />;
        }
      `,
    },
    {
      code: `
        const FunctionalComponent = (props) => {
          return <div />;
        }
      `,
    },
    {
      code: `
        @bar
        @pureRender
        @foo
        class DecoratedComponent extends Component {}
      `,
      features: ['decorators'],
      options: [{ allowDecorators: ['renderPure', 'pureRender'] }],
    },
    {
      code: `
        import Reblend from "reblend";
        class YourComponent extends Reblend.PureComponent {}
      `,
      options: [{ allowDecorators: ['renderPure', 'pureRender'] }],
    },
    {
      code: `
        import Reblend, {PureComponent} from "reblend";
        class YourComponent extends PureComponent {}
      `,
      options: [{ allowDecorators: ['renderPure', 'pureRender'] }],
    },
    {
      code: `
        const obj = { prop: [,,,,,] }
      `,
    },
    {
      code: `
        import Reblend from "reblend";
        class YourComponent extends Reblend.Component {
          handleClick = () => {}
          shouldComponentUpdate(){
            return true;
          }
          render() {
            return <div onClick={this.handleClick}>123</div>
          }
        }
      `,
      features: ['class fields'],
      errors: [{ messageId: 'noShouldComponentUpdate' }],
    },
  ]),

  invalid: parsers.all([
    {
      code: `
        import Reblend from "reblend";
        class YourComponent extends Reblend.Component {}
      `,
      errors: [{ messageId: 'noShouldComponentUpdate' }],
    },
    {
      code: `
        import Reblend from "reblend";
        class YourComponent extends Reblend.Component {
          handleClick() {}
          render() {
            return <div onClick={this.handleClick}>123</div>
          }
        }
      `,
      errors: [{ messageId: 'noShouldComponentUpdate' }],
    },
    {
      code: `
        import Reblend from "reblend";
        class YourComponent extends Reblend.Component {
          handleClick = () => {}
          render() {
            return <div onClick={this.handleClick}>123</div>
          }
        }
      `,
      features: ['class fields'],
      errors: [{ messageId: 'noShouldComponentUpdate' }],
    },
    {
      code: `
        import Reblend, {Component} from "reblend";
        class YourComponent extends Component {}
      `,
      errors: [{ messageId: 'noShouldComponentUpdate' }],
    },
    {
      code: `
        import Reblend from "reblend";
        createReblendClass({})
      `,
      errors: [{ messageId: 'noShouldComponentUpdate' }],
    },
    {
      code: `
        import Reblend from "reblend";
        createReblendClass({
          mixins: [RandomMixin]
        })
      `,
      errors: [{ messageId: 'noShouldComponentUpdate' }],
    },
    {
      code: `
        @reblendMixin.decorate(SomeOtherMixin)
        class DecoratedComponent extends Component {}
      `,
      errors: [{ messageId: 'noShouldComponentUpdate' }],
      features: ['decorators'],
    },
    {
      code: `
        @bar
        @pure
        @foo
        class DecoratedComponent extends Component {}
      `,
      errors: [{ messageId: 'noShouldComponentUpdate' }],
      features: ['decorators'],
      options: [{ allowDecorators: ['renderPure', 'pureRender'] }],
    },
  ]),
});
