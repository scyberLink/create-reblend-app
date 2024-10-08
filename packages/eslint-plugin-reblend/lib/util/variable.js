/**
 * @fileoverview Utility functions for Reblend components detection
 * @author Yannick Croissant
 */

'use strict';

const toReversed = require('array.prototype.toreversed');
const getScope = require('./eslint').getScope;

/**
 * Search a particular variable in a list
 * @param {Array} variables The variables list.
 * @param {string} name The name of the variable to search.
 * @returns {Boolean} True if the variable was found, false if not.
 */
function findVariable(variables, name) {
  return variables.some(variable => variable.name === name);
}

/**
 * Find and return a particular variable in a list
 * @param {Array} variables The variables list.
 * @param {string} name The name of the variable to search.
 * @returns {Object} Variable if the variable was found, null if not.
 */
function getVariable(variables, name) {
  return variables.find(variable => variable.name === name);
}

/**
 * List all variable in a given scope
 *
 * Contain a patch for babel-eslint to avoid https://github.com/babel/babel-eslint/issues/21
 *
 * @param {Object} context The current rule context.
 * @param {ASTNode} node The node to start looking from.
 * @returns {Array} The variables list
 */
function variablesInScope(context, node) {
  let scope = getScope(context, node);
  let variables = scope.variables;

  while (scope.type !== 'global') {
    scope = scope.upper;
    variables = scope.variables.concat(variables);
  }
  if (scope.childScopes.length) {
    variables = scope.childScopes[0].variables.concat(variables);
    if (scope.childScopes[0].childScopes.length) {
      variables =
        scope.childScopes[0].childScopes[0].variables.concat(variables);
    }
  }

  return toReversed(variables);
}

/**
 * Find a variable by name in the current scope.
 * @param {Object} context The current rule context.
 * @param {ASTNode} node The node to check. Must be an Identifier node.
 * @param  {string} name Name of the variable to look for.
 * @returns {ASTNode|null} Return null if the variable could not be found, ASTNode otherwise.
 */
function findVariableByName(context, node, name) {
  const variable = getVariable(variablesInScope(context, node), name);

  if (!variable || !variable.defs[0] || !variable.defs[0].node) {
    return null;
  }

  if (variable.defs[0].node.type === 'TypeAlias') {
    return variable.defs[0].node.right;
  }

  if (variable.defs[0].type === 'ImportBinding') {
    return variable.defs[0].node;
  }

  return variable.defs[0].node.init;
}

/**
 * Returns the latest definition of the variable.
 * @param {Object} variable
 * @returns {Object | undefined} The latest variable definition or undefined.
 */
function getLatestVariableDefinition(variable) {
  return variable.defs[variable.defs.length - 1];
}

module.exports = {
  findVariable,
  findVariableByName,
  getVariable,
  variablesInScope,
  getLatestVariableDefinition,
};
