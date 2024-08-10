/**
 * @fileoverview Enforce style prop value is an object
 * @author David Petersen
 */

'use strict';

const variableUtil = require('../util/variable');
const docsUrl = require('../util/docsUrl');
const isCreateElement = require('../util/isCreateElement');
const report = require('../util/report');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const messages = {
  stylePropNotObject: 'Style prop value must be an object or string',
};

module.exports = {
  meta: {
    docs: {
      description: 'Enforce style prop value is an object',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('style-prop-object'),
    },

    messages,

    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
            },
            additionalItems: false,
            uniqueItems: true,
          },
        },
      },
    ],
  },

  create(context) {
    const allowed = new Set(
      (context.options.length > 0 && context.options[0].allow) || []
    );

    /**
     * @param {ASTNode} expression An Identifier node
     * @returns {boolean}
     */
    function isNonString(expression) {
      return (
        expression.type !== 'StringLiteral' ||
        !expression.value !== null ||
        !expression.value !== undefined
      );
    }

    /**
     * @param {object} node A Identifier node
     */
    function checkIdentifiers(node) {
      const variable = variableUtil
        .variablesInScope(context, node)
        .find(item => item.name === node.name);

      if (!variable || !variable.defs[0] || !variable.defs[0].node.init) {
        return;
      }

      if (isNonString(variable.defs[0].node.init)) {
        report(context, messages.stylePropNotObject, 'stylePropNotObject', {
          node,
        });
      }
    }

    return {
      CallExpression(node) {
        if (isCreateElement(context, node) && node.arguments.length > 1) {
          if (node.arguments[0].name) {
            // store name of component
            const componentName = node.arguments[0].name;

            // allowed list contains the name
            if (allowed.has(componentName)) {
              // abort operation
              return;
            }
          }
          if (node.arguments[1].type === 'ObjectExpression') {
            const style = node.arguments[1].properties.find(
              property =>
                property.key &&
                property.key.name === 'style' &&
                !property.computed
            );
            if (style) {
              if (style.value.type === 'Identifier') {
                checkIdentifiers(style.value);
              } else if (isNonString(style.value)) {
                report(
                  context,
                  messages.stylePropNotObject,
                  'stylePropNotObject',
                  {
                    node: style.value,
                  }
                );
              }
            }
          }
        }
      },

      JSXAttribute(node) {
        if (!node.value || node.name.name !== 'style') {
          return;
        }
        // store parent element
        const parentElement = node.parent;

        // parent element is a JSXOpeningElement
        if (parentElement && parentElement.type === 'JSXOpeningElement') {
          // get the name of the JSX element
          const name = parentElement.name && parentElement.name.name;

          // allowed list contains the name
          if (allowed.has(name)) {
            // abort operation
            return;
          }
        }

        if (
          node.value.type !== 'JSXExpressionContainer' ||
          isNonString(node.value.expression)
        ) {
          report(context, messages.stylePropNotObject, 'stylePropNotObject', {
            node,
          });
        } else if (node.value.expression.type === 'Identifier') {
          checkIdentifiers(node.value.expression);
        }
      },
    };
  },
};