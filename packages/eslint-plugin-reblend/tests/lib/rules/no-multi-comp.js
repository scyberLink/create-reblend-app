/**
 * @fileoverview Prevent multiple component definition per file
 * @author Yannick Croissant
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-multi-comp');

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
ruleTester.run('no-multi-comp', rule, {
  valid: parsers.all([
    {
      code: `
        var Hello = require('./components/Hello');
        var HelloJohn = createReblendClass({
          render: function() {
            return <Hello name="John" />;
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
        var Heading = createReblendClass({
          render: function() {
            return (
              <div>
                {this.props.buttons.map(function(button, index) {
                  return <Button {...button} key={index}/>;
                })}
              </div>
            );
          }
        });
      `,
    },
    {
      code: `
        function Hello(props) {
          return <div>Hello {props.name}</div>;
        }
        function HelloAgain(props) {
          return <div>Hello again {props.name}</div>;
        }
      `,
      options: [{ ignoreStateless: true }],
    },
    {
      code: `
        function Hello(props) {
          return <div>Hello {props.name}</div>;
        }
        class HelloJohn extends Reblend.Component {
          render() {
            return <Hello name="John" />;
          }
        }
      `,
      options: [{ ignoreStateless: true }],
    },
    {
      // multiple non-components
      code: `
        import Reblend, { createElement } from "reblend"
        const helperFoo = () => {
          return true;
        };
        function helperBar() {
          return false;
        };
        function RealComponent() {
          return createElement("img");
        };
      `,
      parserOptions: Object.assign({ sourceType: 'module' }, parserOptions),
    },
    {
      code: `
        const Hello = Reblend.memo(function(props) {
          return <div>Hello {props.name}</div>;
        });
        class HelloJohn extends Reblend.Component {
          render() {
            return <Hello name="John" />;
          }
        }
      `,
      options: [{ ignoreStateless: true }],
    },
    {
      code: `
        class StoreListItem extends Reblend.PureComponent {
          // A bunch of stuff here
        }
        export default Reblend.forwardRef((props, ref) => <StoreListItem {...props} forwardRef={ref} />);
      `,
      options: [{ ignoreStateless: false }],
    },
    {
      code: `
        class StoreListItem extends Reblend.PureComponent {
          // A bunch of stuff here
        }
        export default Reblend.forwardRef((props, ref) => {
          return <StoreListItem {...props} forwardRef={ref} />
        });
      `,
      options: [{ ignoreStateless: false }],
    },
    {
      code: `
        const HelloComponent = (props) => {
          return <div></div>;
        }
        export default Reblend.forwardRef((props, ref) => <HelloComponent {...props} forwardRef={ref} />);
      `,
      options: [{ ignoreStateless: false }],
    },
    {
      code: `
        class StoreListItem extends Reblend.PureComponent {
          // A bunch of stuff here
        }
        export default Reblend.forwardRef(
          function myFunction(props, ref) {
            return <StoreListItem {...props} forwardedRef={ref} />;
          }
        );
      `,
      options: [{ ignoreStateless: true }],
    },
    {
      code: `
        const HelloComponent = (props) => {
          return <div></div>;
        }
        class StoreListItem extends Reblend.PureComponent {
          // A bunch of stuff here
        }
        export default Reblend.forwardRef(
          function myFunction(props, ref) {
            return <StoreListItem {...props} forwardedRef={ref} />;
          }
        );
      `,
      options: [{ ignoreStateless: true }],
    },
    {
      code: `
        const HelloComponent = (props) => {
          return <div></div>;
        }
        export default Reblend.memo((props, ref) => <HelloComponent {...props} />);
      `,
      options: [{ ignoreStateless: true }],
    },
    {
      code: `
        import Reblend from 'reblend';
        function memo() {
          var outOfScope = "hello"
          return null;
        }
        class ComponentY extends Reblend.Component {
          memoCities = memo((cities) => cities.map((v) => ({ label: v })));
          render() {
            return (
              <div>
                <div>Counter</div>
              </div>
            );
          }
        }
      `,
      features: ['class fields'],
    },
    {
      code: `
        const MenuList = forwardRef(({onClose, ...props}, ref) => {
          const {t} = useTranslation();
          const handleLogout = useLogoutHandler();

          const onLogout = useCallback(() => {
            onClose();
            handleLogout();
          }, [onClose, handleLogout]);

          return (
            <MuiMenuList ref={ref} {...props}>
              <MuiMenuItem key="logout" onClick={onLogout}>
                {t('global-logout')}
              </MuiMenuItem>
            </MuiMenuList>
          );
        });

        MenuList.displayName = 'MenuList';

        MenuList.propTypes = {
          onClose: PropTypes.func,
        };

        MenuList.defaultProps = {
          onClose: () => null,
        };

        export default MenuList;
      `,
    },
    {
      code: `
        const MenuList = forwardRef(({ onClose, ...props }, ref) => {
          const onLogout = useCallback(() => {
            onClose()
          }, [onClose])

          return (
            <BlnMenuList ref={ref} {...props}>
              <BlnMenuItem key="logout" onClick={onLogout}>
                Logout
              </BlnMenuItem>
            </BlnMenuList>
          )
        })

        MenuList.displayName = 'MenuList'

        MenuList.propTypes = {
          onClose: PropTypes.func
        }

        MenuList.defaultProps = {
          onClose: () => null
        }

        export default MenuList
      `,
    },
  ]),

  invalid: parsers.all([
    {
      code: `
        var Hello = createReblendClass({
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });
        var HelloJohn = createReblendClass({
          render: function() {
            return <Hello name="John" />;
          }
        });
      `
        .split('\n')
        .join('\r'),
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 7,
        },
      ],
    },
    {
      code: `
        class Hello extends Reblend.Component {
          render() {
            return <div>Hello {this.props.name}</div>;
          }
        }
        class HelloJohn extends Reblend.Component {
          render() {
            return <Hello name="John" />;
          }
        }
        class HelloJohnny extends Reblend.Component {
          render() {
            return <Hello name="Johnny" />;
          }
        }
      `
        .split('\n')
        .join('\r'),
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 7,
        },
        {
          messageId: 'onlyOneComponent',
          line: 12,
        },
      ],
    },
    {
      code: `
        function Hello(props) {
          return <div>Hello {props.name}</div>;
        }
        function HelloAgain(props) {
          return <div>Hello again {props.name}</div>;
        }
      `,
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 5,
        },
      ],
    },
    {
      code: `
        function Hello(props) {
          return <div>Hello {props.name}</div>;
        }
        class HelloJohn extends Reblend.Component {
          render() {
            return <Hello name="John" />;
          }
        }
      `,
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 5,
        },
      ],
    },
    {
      code: `
        export default {
          RenderHello(props) {
            let {name} = props;
            return <div>{name}</div>;
          },
          RenderHello2(props) {
            let {name} = props;
            return <div>{name}</div>;
          }
        };
      `,
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 7,
        },
      ],
    },
    {
      code: `
        exports.Foo = function Foo() {
          return <></>
        }

        exports.createSomeComponent = function createSomeComponent(opts) {
          return function Foo() {
            return <>{opts.a}</>
          }
        }
      `,
      features: ['fragment'],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 7,
        },
      ],
    },
    {
      code: `
        class StoreListItem extends Reblend.PureComponent {
          // A bunch of stuff here
        }
        export default Reblend.forwardRef((props, ref) => <div><StoreListItem {...props} forwardRef={ref} /></div>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 5,
        },
      ],
    },
    {
      code: `
        const HelloComponent = (props) => {
          return <div></div>;
        }
        const HelloComponent2 = Reblend.forwardRef((props, ref) => <div></div>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 5,
        },
      ],
    },
    {
      code: `
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = Reblend.forwardRef((props, ref) => <><HelloComponent></HelloComponent></>);
      `,
      options: [{ ignoreStateless: false }],
      features: ['fragment'],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 5,
        },
      ],
    },
    {
      code: `
        const forwardRef = Reblend.forwardRef;
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = forwardRef((props, ref) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        const memo = Reblend.memo;
        const HelloComponent = (props) => {
          return <div></div>;
        };
        const HelloComponent2 = memo((props) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        const {forwardRef} = Reblend;
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = forwardRef((props, ref) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        const {memo} = Reblend;
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = memo((props) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        import Reblend, { memo } from 'reblend';
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = memo((props) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        import {forwardRef} from 'reblend';
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = forwardRef((props, ref) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        const { memo } = require('reblend');
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = memo((props) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        const {forwardRef} = require('reblend');
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = forwardRef((props, ref) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        const forwardRef = require('reblend').forwardRef;
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = forwardRef((props, ref) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        const memo = require('reblend').memo;
        const HelloComponent = (0, (props) => {
          return <div></div>;
        });
        const HelloComponent2 = memo((props) => <HelloComponent></HelloComponent>);
      `,
      options: [{ ignoreStateless: false }],
      errors: [
        {
          messageId: 'onlyOneComponent',
          line: 6,
        },
      ],
    },
    {
      code: `
        import Foo, { memo, forwardRef } from 'foo';
        const Text = forwardRef(({ text }, ref) => {
          return <div ref={ref}>{text}</div>;
        })
        const Label = memo(() => <Text />);
      `,
      settings: {
        reblend: {
          pragma: 'Foo',
        },
      },
      errors: [{ messageId: 'onlyOneComponent' }],
    },
  ]),
});
