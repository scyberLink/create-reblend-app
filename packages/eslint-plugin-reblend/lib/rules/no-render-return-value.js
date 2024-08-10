/**
 * @fileoverview Prevent usage of the return value of Reblend.render
 * @author Dustan Kasten
 */

'use strict';

const testReblendVersion = require('../util/version').testReblendVersion;
const docsUrl = require('../util/docsUrl');
const report = require('../util/report');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const messages = {
  noReturnValue: 'Do not depend on the return value from {{node}}.render',
};

module.exports = {
  meta: {
    docs: {
      description: 'Disallow usage of the return value of ReblendDOM.render',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-render-return-value'),
    },

    messages,

    schema: [],
  },

  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    let calleeObjectName = /^ReblendDOM$/;
    if (testReblendVersion(context, '>= 15.0.0')) {
      calleeObjectName = /^ReblendDOM$/;
    } else if (testReblendVersion(context, '^0.14.0')) {
      calleeObjectName = /^Reblend(DOM)?$/;
    } else if (testReblendVersion(context, '^0.13.0')) {
      calleeObjectName = /^Reblend$/;
    }

    return {
      CallExpression(node) {
        const callee = node.callee;
        const parent = node.parent;
        if (callee.type !== 'MemberExpression') {
          return;
        }

        if (
          callee.object.type !== 'Identifier' ||
          !calleeObjectName.test(callee.object.name) ||
          callee.property.name !== 'render'
        ) {
          return;
        }

        if (
          parent.type === 'VariableDeclarator' ||
          parent.type === 'Property' ||
          parent.type === 'ReturnStatement' ||
          parent.type === 'ArrowFunctionExpression' ||
          parent.type === 'AssignmentExpression'
        ) {
          report(context, messages.noReturnValue, 'noReturnValue', {
            node: callee,
            data: {
              node: callee.object.name,
            },
          });
        }
      },
    };
  },
};
