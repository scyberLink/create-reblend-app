/**
 * @fileoverview Utility functions for Reblend pragma configuration
 * @author Yannick Croissant
 */

'use strict';

const getSourceCode = require('./eslint').getSourceCode;

const JSX_ANNOTATION_REGEX = /@jsx\s+([^\s]+)/;
// Does not check for reserved keywords or unicode characters
const JS_IDENTIFIER_REGEX = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;

/**
 * @param {Context} context
 * @returns {string}
 */
function getCreateClassFromContext(context) {
  let pragma = 'createReblendClass';
  // .eslintrc shared settings (https://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.reblend && context.settings.reblend.createClass) {
    pragma = context.settings.reblend.createClass;
  }
  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(
      `createClass pragma ${pragma} is not a valid function name`
    );
  }
  return pragma;
}

/**
 * @param {Context} context
 * @returns {string}
 */
function getFragmentFromContext(context) {
  let pragma = 'Fragment';
  // .eslintrc shared settings (https://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.reblend && context.settings.reblend.fragment) {
    pragma = context.settings.reblend.fragment;
  }
  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`Fragment pragma ${pragma} is not a valid identifier`);
  }
  return pragma;
}

/**
 * @param {Context} context
 * @returns {string}
 */
function getFromContext(context) {
  let pragma = 'Reblend';

  const sourceCode = getSourceCode(context);
  const pragmaNode = sourceCode
    .getAllComments()
    .find(node => JSX_ANNOTATION_REGEX.test(node.value));

  if (pragmaNode) {
    const matches = JSX_ANNOTATION_REGEX.exec(pragmaNode.value);
    pragma = matches[1].split('.')[0];
    // .eslintrc shared settings (https://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  } else if (context.settings.reblend && context.settings.reblend.pragma) {
    pragma = context.settings.reblend.pragma;
  }

  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`Reblend pragma ${pragma} is not a valid identifier`);
  }
  return pragma;
}

module.exports = {
  getCreateClassFromContext,
  getFragmentFromContext,
  getFromContext,
};
