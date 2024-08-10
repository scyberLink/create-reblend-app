'use strict';

const assert = require('assert');
const entries = require('object.entries');
const eslint = require('eslint');
const fromEntries = require('object.fromentries');
const values = require('object.values');

const Components = require('../../lib/util/Components');
const parsers = require('../helpers/parsers');

const ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

describe('Components', () => {
  describe('static detect', () => {
    function testComponentsDetect(test, instructionsOrDone, orDone) {
      const done = orDone || instructionsOrDone;
      const instructions = orDone ? instructionsOrDone : instructionsOrDone;

      const rule = {
        create: Components.detect((_context, components, util) => {
          const instructionResults = [];

          const augmentedInstructions = fromEntries(
            entries(instructions || {}).map(nodeTypeAndHandler => {
              const nodeType = nodeTypeAndHandler[0];
              const handler = nodeTypeAndHandler[1];
              return [
                nodeType,
                node => {
                  instructionResults.push({
                    type: nodeType,
                    result: handler(node, context, components, util),
                  });
                },
              ];
            })
          );

          return Object.assign({}, augmentedInstructions, {
            'Program:exit'(node) {
              if (augmentedInstructions['Program:exit']) {
                augmentedInstructions['Program:exit'](
                  node,
                  context,
                  components,
                  util
                );
              }
              done(components, instructionResults);
            },
          });
        }),
      };

      const tests = {
        valid: parsers.all([
          Object.assign({}, test, {
            settings: {
              reblend: {
                version: 'detect',
              },
            },
          }),
        ]),
        invalid: [],
      };

      ruleTester.run(test.code, rule, tests);
    }

    it('should detect Stateless Function Component', () => {
      testComponentsDetect(
        {
          code: `import Reblend from 'reblendjs'
          function MyStatelessComponent() {
            return <Reblend />;
          }`,
        },
        components => {
          assert.equal(
            components.length(),
            1,
            'MyStatelessComponent should be detected component'
          );
          values(components.list()).forEach(component => {
            assert.equal(
              component.node.id.name,
              'MyStatelessComponent',
              'MyStatelessComponent should be detected component'
            );
          });
        }
      );
    });

    it('should detect Class Components', () => {
      testComponentsDetect(
        {
          code: `import Reblend from 'reblendjs'
        class MyClassComponent extends Reblend {
          render() {
            return <Reblend />;
          }
        }`,
        },
        components => {
          assert(
            components.length() === 1,
            'MyClassComponent should be detected component'
          );
          values(components.list()).forEach(component => {
            assert.equal(
              component.node.id.name,
              'MyClassComponent',
              'MyClassComponent should be detected component'
            );
          });
        }
      );
    });

    it('should detect Reblend Imports', () => {
      testComponentsDetect(
        {
          code: "import Reblend, { useCallback, useState } from 'reblendjs'",
        },
        components => {
          assert.deepEqual(
            components
              .getDefaultReblendImports()
              .map(specifier => specifier.local.name),
            ['Reblend'],
            'default Reblend import identifier should be "Reblend"'
          );

          assert.deepEqual(
            components
              .getNamedReblendImports()
              .map(specifier => specifier.local.name),
            ['useCallback', 'useState'],
            'named Reblend import identifiers should be "useCallback" and "useState"'
          );
        }
      );
    });

    describe('utils', () => {
      describe('isReblendHookCall', () => {
        it('should not identify hook-like call', () => {
          testComponentsDetect(
            {
              code: `
              import { useRef } from 'reblendjs'
              function useColor() {
                return useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: false },
              ]);
            }
          );
        });

        it('should identify hook call', () => {
          testComponentsDetect(
            {
              code: `
              import { useState } from 'reblendjs'
              function useColor() {
                return useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: true },
              ]);
            }
          );
        });

        it('should identify aliased hook call', () => {
          testComponentsDetect(
            {
              code: `
              import { useState as useStateAlternative } from 'reblendjs'
              function useColor() {
                return useStateAlternative()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: true },
              ]);
            }
          );
        });

        it('should identify aliased present named hook call', () => {
          testComponentsDetect(
            {
              code: `
              import { useState as useStateAlternative } from 'reblendjs'
              function useColor() {
                return useStateAlternative()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node, ['useState']),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: true },
              ]);
            }
          );
        });

        it('should not identify shadowed hook call', () => {
          testComponentsDetect(
            {
              code: `
              import { useState } from 'reblendjs'
              function useColor() {
                function useState() {
                  return null
                }
                return useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: false },
              ]);
            }
          );
        });

        it('should not identify shadowed aliased present named hook call', () => {
          testComponentsDetect(
            {
              code: `
              import { useState as useStateAlternative } from 'reblendjs'
              function useColor() {
                function useStateAlternative() {
                  return null
                }
                return useStateAlternative()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node, ['useState']),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: false },
              ]);
            }
          );
        });

        it('should identify Reblend hook call', () => {
          testComponentsDetect(
            {
              code: `
              import Reblend from 'reblendjs'
              function useColor() {
                return Reblend.useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: true },
              ]);
            }
          );
        });

        it('should identify aliased Reblend hook call', () => {
          testComponentsDetect(
            {
              code: `
              import ReblendAlternative from 'reblendjs'
              function useColor() {
                return ReblendAlternative.useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: true },
              ]);
            }
          );
        });

        it('should not identify shadowed Reblend hook call', () => {
          testComponentsDetect(
            {
              code: `
              import Reblend from 'reblendjs'
              function useColor() {
                const Reblend = {
                  useState: () => null
                }
                return Reblend.useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: false },
              ]);
            }
          );
        });

        it('should identify present named hook call', () => {
          testComponentsDetect(
            {
              code: `
              import { useState } from 'reblendjs'
              function useColor() {
                return useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node, ['useState']),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: true },
              ]);
            }
          );
        });

        it('should identify present named Reblend hook call', () => {
          testComponentsDetect(
            {
              code: `
              import Reblend from 'reblendjs'
              function useColor() {
                return Reblend.useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node, ['useState']),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: true },
              ]);
            }
          );
        });

        it('should not identify missing named hook call', () => {
          testComponentsDetect(
            {
              code: `
              import { useState } from 'reblendjs'
              function useColor() {
                return useState()
              }
            `,
            },
            {
              CallExpression: (node, _context, _components, util) =>
                util.isReblendHookCall(node, ['useRef']),
            },
            (_components, instructionResults) => {
              assert.deepEqual(instructionResults, [
                { type: 'CallExpression', result: false },
              ]);
            }
          );
        });
      });
    });

    describe('testComponentsDetect', () => {
      it('should log Program:exit instruction', () => {
        testComponentsDetect(
          {
            code: '',
          },
          {
            'Program:exit': () => true,
          },
          (_components, instructionResults) => {
            assert.deepEqual(instructionResults, [
              { type: 'Program:exit', result: true },
            ]);
          }
        );
      });
    });
  });
});
