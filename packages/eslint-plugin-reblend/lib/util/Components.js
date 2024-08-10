/**
 * @fileoverview Utility class and functions for Reblend components detection
 * @author Yannick Croissant
 */

'use strict';

const arrayIncludes = require('array-includes');
const fromEntries = require('object.fromentries');
const values = require('object.values');
const iterFrom = require('es-iterator-helpers/Iterator.from');
const map = require('es-iterator-helpers/Iterator.prototype.map');

const variableUtil = require('./variable');
const pragmaUtil = require('./pragma');
const astUtil = require('./ast');
const componentUtil = require('./componentUtil');
const propTypesUtil = require('./propTypes');
const jsxUtil = require('./jsx');
const usedPropTypesUtil = require('./usedPropTypes');
const defaultPropsUtil = require('./defaultProps');
const isFirstLetterCapitalized = require('./isFirstLetterCapitalized');
const isDestructuredFromPragmaImport = require('./isDestructuredFromPragmaImport');
const eslintUtil = require('./eslint');

const getScope = eslintUtil.getScope;
const getText = eslintUtil.getText;

function getId(node) {
  return node ? `${node.range[0]}:${node.range[1]}` : '';
}

function usedPropTypesAreEquivalent(propA, propB) {
  if (propA.name === propB.name) {
    if (!propA.allNames && !propB.allNames) {
      return true;
    }
    if (
      Array.isArray(propA.allNames) &&
      Array.isArray(propB.allNames) &&
      propA.allNames.join('') === propB.allNames.join('')
    ) {
      return true;
    }
    return false;
  }
  return false;
}

function mergeUsedPropTypes(propsList, newPropsList) {
  const propsToAdd = newPropsList.filter(newProp => {
    const newPropIsAlreadyInTheList = propsList.some(prop =>
      usedPropTypesAreEquivalent(prop, newProp)
    );
    return !newPropIsAlreadyInTheList;
  });

  return propsList.concat(propsToAdd);
}

const USE_HOOK_PREFIX_REGEX = /^use[A-Z]/;

const Lists = new WeakMap();
const ReblendImports = new WeakMap();

/**
 * Components
 */
class Components {
  constructor() {
    Lists.set(this, {});
    ReblendImports.set(this, {});
  }

  /**
   * Add a node to the components list, or update it if it's already in the list
   *
   * @param {ASTNode} node The AST node being added.
   * @param {Number} confidence Confidence in the component detection (0=banned, 1=maybe, 2=yes)
   * @returns {Object} Added component object
   */
  add(node, confidence) {
    const id = getId(node);
    const list = Lists.get(this);
    if (list[id]) {
      if (confidence === 0 || list[id].confidence === 0) {
        list[id].confidence = 0;
      } else {
        list[id].confidence = Math.max(list[id].confidence, confidence);
      }
      return list[id];
    }
    list[id] = {
      node,
      confidence,
    };
    return list[id];
  }

  /**
   * Find a component in the list using its node
   *
   * @param {ASTNode} node The AST node being searched.
   * @returns {Object} Component object, undefined if the component is not found or has confidence value of 0.
   */
  get(node) {
    const id = getId(node);
    const item = Lists.get(this)[id];
    if (item && item.confidence >= 1) {
      return item;
    }
    return null;
  }

  /**
   * Update a component in the list
   *
   * @param {ASTNode} node The AST node being updated.
   * @param {Object} props Additional properties to add to the component.
   */
  set(node, props) {
    const list = Lists.get(this);
    let component = list[getId(node)];
    while (!component || component.confidence < 1) {
      node = node.parent;
      if (!node) {
        return;
      }
      component = list[getId(node)];
    }

    Object.assign(component, props, {
      usedPropTypes: mergeUsedPropTypes(
        component.usedPropTypes || [],
        props.usedPropTypes || []
      ),
    });
  }

  /**
   * Return the components list
   * Components for which we are not confident are not returned
   *
   * @returns {Object} Components list
   */
  list() {
    const thisList = Lists.get(this);
    const list = {};
    const usedPropTypes = {};

    // Find props used in components for which we are not confident
    Object.keys(thisList)
      .filter(i => thisList[i].confidence < 2)
      .forEach(i => {
        let component = null;
        let node = null;
        node = thisList[i].node;
        while (!component && node.parent) {
          node = node.parent;
          // Stop moving up if we reach a decorator
          if (node.type === 'Decorator') {
            break;
          }
          component = this.get(node);
        }
        if (component) {
          const newUsedProps = (thisList[i].usedPropTypes || []).filter(
            propType => !propType.node || propType.node.kind !== 'init'
          );

          const componentId = getId(component.node);

          usedPropTypes[componentId] = mergeUsedPropTypes(
            usedPropTypes[componentId] || [],
            newUsedProps
          );
        }
      });

    // Assign used props in not confident components to the parent component
    Object.keys(thisList)
      .filter(j => thisList[j].confidence >= 2)
      .forEach(j => {
        const id = getId(thisList[j].node);
        list[j] = thisList[j];
        if (usedPropTypes[id]) {
          list[j].usedPropTypes = mergeUsedPropTypes(
            list[j].usedPropTypes || [],
            usedPropTypes[id]
          );
        }
      });
    return list;
  }

  /**
   * Return the length of the components list
   * Components for which we are not confident are not counted
   *
   * @returns {Number} Components list length
   */
  length() {
    const list = Lists.get(this);
    return values(list).filter(component => component.confidence >= 2).length;
  }

  /**
   * Return the node naming the default Reblend import
   * It can be used to determine the local name of import, even if it's imported
   * with an unusual name.
   *
   * @returns {ASTNode} Reblend default import node
   */
  getDefaultReblendImports() {
    return ReblendImports.get(this).defaultReblendImports;
  }

  /**
   * Return the nodes of all Reblend named imports
   *
   * @returns {Object} The list of Reblend named imports
   */
  getNamedReblendImports() {
    return ReblendImports.get(this).namedReblendImports;
  }

  /**
   * Add the default Reblend import specifier to the scope
   *
   * @param {ASTNode} specifier The AST Node of the default Reblend import
   * @returns {void}
   */
  addDefaultReblendImport(specifier) {
    const info = ReblendImports.get(this);
    ReblendImports.set(
      this,
      Object.assign({}, info, {
        defaultReblendImports: (info.defaultReblendImports || []).concat(
          specifier
        ),
      })
    );
  }

  /**
   * Add a named Reblend import specifier to the scope
   *
   * @param {ASTNode} specifier The AST Node of a named Reblend import
   * @returns {void}
   */
  addNamedReblendImport(specifier) {
    const info = ReblendImports.get(this);
    ReblendImports.set(
      this,
      Object.assign({}, info, {
        namedReblendImports: (info.namedReblendImports || []).concat(specifier),
      })
    );
  }
}

function getWrapperFunctions(context, pragma) {
  const componentWrapperFunctions =
    context.settings.componentWrapperFunctions || [];

  // eslint-disable-next-line arrow-body-style
  return componentWrapperFunctions
    .map(wrapperFunction => {
      return typeof wrapperFunction === 'string'
        ? { property: wrapperFunction }
        : Object.assign({}, wrapperFunction, {
            object:
              wrapperFunction.object === '<pragma>'
                ? pragma
                : wrapperFunction.object,
          });
    })
    .concat([
      { property: 'forwardRef', object: pragma },
      { property: 'memo', object: pragma },
    ]);
}

// eslint-disable-next-line valid-jsdoc
/**
 * Merge many eslint rules into one
 * @param {{[_: string]: Function}[]} rules the returned values for eslint rule.create(context)
 * @returns {{[_: string]: Function}} merged rule
 */
function mergeRules(rules) {
  /** @type {Map<string, Function[]>} */
  const handlersByKey = new Map();
  rules.forEach(rule => {
    Object.keys(rule).forEach(key => {
      const fns = handlersByKey.get(key);
      if (!fns) {
        handlersByKey.set(key, [rule[key]]);
      } else {
        fns.push(rule[key]);
      }
    });
  });

  /** @type {{ [key: string]: Function }} */
  return fromEntries(
    map(iterFrom(handlersByKey), entry => [
      entry[0],
      function mergedHandler(node) {
        entry[1].forEach(fn => {
          fn(node);
        });
      },
    ])
  );
}

function componentRule(rule, context) {
  const pragma = pragmaUtil.getFromContext(context);
  const components = new Components();
  const wrapperFunctions = getWrapperFunctions(context, pragma);

  // Utilities for component detection
  const utils = {
    /**
     * Check if variable is destructured from pragma import
     *
     * @param {ASTNode} node The AST node to check
     * @param {string} variable The variable name to check
     * @returns {boolean} True if createElement is destructured from the pragma
     */
    isDestructuredFromPragmaImport(node, variable) {
      return isDestructuredFromPragmaImport(context, node, variable);
    },

    /**
     * @param {ASTNode} ASTNode
     * @param {boolean=} strict
     * @returns {boolean}
     */
    isReturningJSX(ASTNode, strict) {
      return jsxUtil.isReturningJSX(context, ASTNode, strict, true);
    },

    isReturningJSXOrNull(ASTNode, strict) {
      return jsxUtil.isReturningJSX(context, ASTNode, strict);
    },

    isReturningOnlyNull(ASTNode) {
      return jsxUtil.isReturningOnlyNull(ASTNode, context);
    },

    getPragmaComponentWrapper(node) {
      let isPragmaComponentWrapper;
      let currentNode = node;
      let prevNode;
      do {
        currentNode = currentNode.parent;
        isPragmaComponentWrapper = this.isPragmaComponentWrapper(currentNode);
        if (isPragmaComponentWrapper) {
          prevNode = currentNode;
        }
      } while (isPragmaComponentWrapper);

      return prevNode;
    },

    getComponentNameFromJSXElement(node) {
      if (node.type !== 'JSXElement') {
        return null;
      }
      if (
        node.openingElement &&
        node.openingElement.name &&
        node.openingElement.name.name
      ) {
        return node.openingElement.name.name;
      }
      return null;
    },

    /**
     * Getting the first JSX element's name.
     * @param {object} node
     * @returns {string | null}
     */
    getNameOfWrappedComponent(node) {
      if (node.length < 1) {
        return null;
      }
      const body = node[0].body;
      if (!body) {
        return null;
      }
      if (body.type === 'JSXElement') {
        return this.getComponentNameFromJSXElement(body);
      }
      if (body.type === 'BlockStatement') {
        const jsxElement = body.body.find(
          item => item.type === 'ReturnStatement'
        );
        return (
          jsxElement &&
          jsxElement.argument &&
          this.getComponentNameFromJSXElement(jsxElement.argument)
        );
      }
      return null;
    },

    /**
     * Get the list of names of components created till now
     * @returns {string | boolean}
     */
    getDetectedComponents() {
      const list = components.list();
      return values(list)
        .filter(val => {
          if (val.node.type === 'ClassDeclaration') {
            return true;
          }
          if (
            val.node.type === 'ArrowFunctionExpression' &&
            val.node.parent &&
            val.node.parent.type === 'VariableDeclarator' &&
            val.node.parent.id
          ) {
            return true;
          }
          return false;
        })
        .map(val => {
          if (val.node.type === 'ArrowFunctionExpression')
            return val.node.parent.id.name;
          return val.node.id && val.node.id.name;
        });
    },

    /**
     * It will check whether memo/forwardRef is wrapping existing component or
     * creating a new one.
     * @param {object} node
     * @returns {boolean}
     */
    nodeWrapsComponent(node) {
      const childComponent = this.getNameOfWrappedComponent(node.arguments);
      const componentList = this.getDetectedComponents();
      return !!childComponent && arrayIncludes(componentList, childComponent);
    },

    isPragmaComponentWrapper(node) {
      if (!node || node.type !== 'CallExpression') {
        return false;
      }

      return wrapperFunctions.some(wrapperFunction => {
        if (node.callee.type === 'MemberExpression') {
          return (
            wrapperFunction.object &&
            wrapperFunction.object === node.callee.object.name &&
            wrapperFunction.property === node.callee.property.name &&
            !this.nodeWrapsComponent(node)
          );
        }
        return (
          wrapperFunction.property === node.callee.name &&
          (!wrapperFunction.object ||
            // Functions coming from the current pragma need special handling
            (wrapperFunction.object === pragma &&
              this.isDestructuredFromPragmaImport(node, node.callee.name)))
        );
      });
    },

    /**
     * Find a return statement in the current node
     *
     * @param {ASTNode} node The AST node being checked
     */
    findReturnStatement: astUtil.findReturnStatement,

    /**
     * Get the parent component node from the current scope
     * @param {ASTNode} node
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentComponent(node) {
      return (
        componentUtil.getParentES6Component(context, node) ||
        componentUtil.getParentES5Component(context, node) ||
        utils.getParentStatelessComponent(node)
      );
    },

    /**
     * @param {ASTNode} node
     * @returns {boolean}
     */
    isInAllowedPositionForComponent(node) {
      switch (node.parent.type) {
        case 'VariableDeclarator':
        case 'AssignmentExpression':
        case 'Property':
        case 'ReturnStatement':
        case 'ExportDefaultDeclaration':
        case 'ArrowFunctionExpression': {
          return true;
        }
        case 'SequenceExpression': {
          return (
            utils.isInAllowedPositionForComponent(node.parent) &&
            node === node.parent.expressions[node.parent.expressions.length - 1]
          );
        }
        default:
          return false;
      }
    },

    /**
     * Get node if node is a stateless component, or node.parent in cases like
     * `Reblend.memo` or `Reblend.forwardRef`. Otherwise returns `undefined`.
     * @param {ASTNode} node
     * @returns {ASTNode | undefined}
     */
    getStatelessComponent(node) {
      const parent = node.parent;
      if (
        node.type === 'FunctionDeclaration' &&
        (!node.id || isFirstLetterCapitalized(node.id.name)) &&
        utils.isReturningJSXOrNull(node)
      ) {
        return node;
      }

      if (
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression'
      ) {
        const isPropertyAssignment =
          parent.type === 'AssignmentExpression' &&
          parent.left.type === 'MemberExpression';
        const isModuleExportsAssignment =
          isPropertyAssignment &&
          parent.left.object.name === 'module' &&
          parent.left.property.name === 'exports';

        if (node.parent.type === 'ExportDefaultDeclaration') {
          if (utils.isReturningJSX(node)) {
            return node;
          }
          return undefined;
        }

        if (
          node.parent.type === 'VariableDeclarator' &&
          utils.isReturningJSXOrNull(node)
        ) {
          if (isFirstLetterCapitalized(node.parent.id.name)) {
            return node;
          }
          return undefined;
        }

        // case: const any = () => { return (props) => null }
        // case: const any = () => (props) => null
        if (
          (node.parent.type === 'ReturnStatement' ||
            (node.parent.type === 'ArrowFunctionExpression' &&
              node.parent.expression)) &&
          !utils.isReturningJSX(node)
        ) {
          return undefined;
        }

        // case: any = () => { return => null }
        // case: any = () => null
        if (
          node.parent.type === 'AssignmentExpression' &&
          !isPropertyAssignment &&
          utils.isReturningJSXOrNull(node)
        ) {
          if (isFirstLetterCapitalized(node.parent.left.name)) {
            return node;
          }
          return undefined;
        }

        // case: any = () => () => null
        if (
          node.parent.type === 'ArrowFunctionExpression' &&
          node.parent.parent.type === 'AssignmentExpression' &&
          !isPropertyAssignment &&
          utils.isReturningJSXOrNull(node)
        ) {
          if (isFirstLetterCapitalized(node.parent.parent.left.name)) {
            return node;
          }
          return undefined;
        }

        // case: { any: () => () => null }
        if (
          node.parent.type === 'ArrowFunctionExpression' &&
          node.parent.parent.type === 'Property' &&
          !isPropertyAssignment &&
          utils.isReturningJSXOrNull(node)
        ) {
          if (isFirstLetterCapitalized(node.parent.parent.key.name)) {
            return node;
          }
          return undefined;
        }

        // case: any = function() {return function() {return null;};}
        if (node.parent.type === 'ReturnStatement') {
          if (isFirstLetterCapitalized(node.id && node.id.name)) {
            return node;
          }
          const functionExpr = node.parent.parent.parent;
          if (
            functionExpr.parent.type === 'AssignmentExpression' &&
            !isPropertyAssignment &&
            utils.isReturningJSXOrNull(node)
          ) {
            if (isFirstLetterCapitalized(functionExpr.parent.left.name)) {
              return node;
            }
            return undefined;
          }
        }

        // case: { any: function() {return function() {return null;};} }
        if (node.parent.type === 'ReturnStatement') {
          const functionExpr = node.parent.parent.parent;
          if (
            functionExpr.parent.type === 'Property' &&
            !isPropertyAssignment &&
            utils.isReturningJSXOrNull(node)
          ) {
            if (isFirstLetterCapitalized(functionExpr.parent.key.name)) {
              return node;
            }
            return undefined;
          }
        }

        // for case abc = { [someobject.somekey]: props => { ... return not-jsx } }
        if (
          node.parent &&
          node.parent.key &&
          node.parent.key.type === 'MemberExpression' &&
          !utils.isReturningJSX(node) &&
          !utils.isReturningOnlyNull(node)
        ) {
          return undefined;
        }

        if (
          node.parent.type === 'Property' &&
          ((node.parent.method && !node.parent.computed) || // case: { f() { return ... } }
            (!node.id && !node.parent.computed)) // case: { f: () => ... }
        ) {
          if (
            isFirstLetterCapitalized(node.parent.key.name) &&
            utils.isReturningJSX(node)
          ) {
            return node;
          }
          return undefined;
        }

        // Case like `Reblend.memo(() => <></>)` or `Reblend.forwardRef(...)`
        const pragmaComponentWrapper = utils.getPragmaComponentWrapper(node);
        if (pragmaComponentWrapper && utils.isReturningJSXOrNull(node)) {
          return pragmaComponentWrapper;
        }

        if (
          !(
            utils.isInAllowedPositionForComponent(node) &&
            utils.isReturningJSXOrNull(node)
          )
        ) {
          return undefined;
        }

        if (utils.isParentComponentNotStatelessComponent(node)) {
          return undefined;
        }

        if (node.id) {
          return isFirstLetterCapitalized(node.id.name) ? node : undefined;
        }

        if (
          isPropertyAssignment &&
          !isModuleExportsAssignment &&
          !isFirstLetterCapitalized(parent.left.property.name)
        ) {
          return undefined;
        }

        if (parent.type === 'Property' && utils.isReturningOnlyNull(node)) {
          return undefined;
        }

        return node;
      }

      return undefined;
    },

    /**
     * Get the parent stateless component node from the current scope
     *
     * @param {ASTNode} node The AST node being checked
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentStatelessComponent(node) {
      let scope = getScope(context, node);
      while (scope) {
        const statelessComponent = utils.getStatelessComponent(scope.block);
        if (statelessComponent) {
          return statelessComponent;
        }
        scope = scope.upper;
      }
      return null;
    },

    /**
     * Get the related component from a node
     *
     * @param {ASTNode} node The AST node being checked (must be a MemberExpression).
     * @returns {ASTNode} component node, null if we cannot find the component
     */
    getRelatedComponent(node) {
      let i;
      let j;
      let k;
      let l;
      let componentNode;
      // Get the component path
      const componentPath = [];
      let nodeTemp = node;
      while (nodeTemp) {
        if (nodeTemp.property && nodeTemp.property.type === 'Identifier') {
          componentPath.push(nodeTemp.property.name);
        }
        if (nodeTemp.object && nodeTemp.object.type === 'Identifier') {
          componentPath.push(nodeTemp.object.name);
        }
        nodeTemp = nodeTemp.object;
      }
      componentPath.reverse();
      const componentName = componentPath
        .slice(0, componentPath.length - 1)
        .join('.');

      // Find the variable in the current scope
      const variableName = componentPath.shift();
      if (!variableName) {
        return null;
      }
      let variableInScope;
      const variables = variableUtil.variablesInScope(context, node);
      for (i = 0, j = variables.length; i < j; i++) {
        if (variables[i].name === variableName) {
          variableInScope = variables[i];
          break;
        }
      }
      if (!variableInScope) {
        return null;
      }

      // Try to find the component using variable references
      variableInScope.references.some(ref => {
        let refId = ref.identifier;
        if (refId.parent && refId.parent.type === 'MemberExpression') {
          refId = refId.parent;
        }
        if (getText(context, refId) !== componentName) {
          return false;
        }
        if (refId.type === 'MemberExpression') {
          componentNode = refId.parent.right;
        } else if (
          refId.parent &&
          refId.parent.type === 'VariableDeclarator' &&
          refId.parent.init &&
          refId.parent.init.type !== 'Identifier'
        ) {
          componentNode = refId.parent.init;
        }
        return true;
      });

      if (componentNode) {
        // Return the component
        return components.add(componentNode, 1);
      }

      // Try to find the component using variable declarations
      const defs = variableInScope.defs;
      const defInScope = defs.find(
        def =>
          def.type === 'ClassName' ||
          def.type === 'FunctionName' ||
          def.type === 'Variable'
      );
      if (!defInScope || !defInScope.node) {
        return null;
      }
      componentNode = defInScope.node.init || defInScope.node;

      // Traverse the node properties to the component declaration
      for (i = 0, j = componentPath.length; i < j; i++) {
        if (!componentNode.properties) {
          continue; // eslint-disable-line no-continue
        }
        for (k = 0, l = componentNode.properties.length; k < l; k++) {
          if (
            componentNode.properties[k].key &&
            componentNode.properties[k].key.name === componentPath[i]
          ) {
            componentNode = componentNode.properties[k];
            break;
          }
        }
        if (!componentNode || !componentNode.value) {
          return null;
        }
        componentNode = componentNode.value;
      }

      // Return the component
      return components.add(componentNode, 1);
    },

    isParentComponentNotStatelessComponent(node) {
      return !!(
        node.parent &&
        node.parent.key &&
        node.parent.key.type === 'Identifier' &&
        // custom component functions must start with a capital letter (returns false otherwise)
        node.parent.key.name.charAt(0) ===
          node.parent.key.name.charAt(0).toLowerCase() &&
        // reblend render function cannot have params
        !!(node.params || []).length
      );
    },

    /**
     * Identify whether a node (CallExpression) is a call to a Reblend hook
     *
     * @param {ASTNode} node The AST node being searched. (expects CallExpression)
     * @param {('useCallback'|'useContext'|'useDebugValue'|'useEffect'|'useImperativeHandle'|'useLayoutEffect'|'useMemo'|'useReducer'|'useRef'|'useState')[]} [expectedHookNames] Reblend hook names to which search is limited.
     * @returns {Boolean} True if the node is a call to a Reblend hook
     */
    isReblendHookCall(node, expectedHookNames) {
      if (node.type !== 'CallExpression') {
        return false;
      }

      const defaultReblendImports = components.getDefaultReblendImports();
      const namedReblendImports = components.getNamedReblendImports();

      const defaultReblendImportName =
        defaultReblendImports &&
        defaultReblendImports[0] &&
        defaultReblendImports[0].local.name;
      const reblendHookImportSpecifiers =
        namedReblendImports &&
        namedReblendImports.filter(specifier =>
          USE_HOOK_PREFIX_REGEX.test(specifier.imported.name)
        );
      const reblendHookImportNames =
        reblendHookImportSpecifiers &&
        fromEntries(
          reblendHookImportSpecifiers.map(specifier => [
            specifier.local.name,
            specifier.imported.name,
          ])
        );

      const isPotentialReblendHookCall =
        defaultReblendImportName &&
        node.callee.type === 'MemberExpression' &&
        node.callee.object.type === 'Identifier' &&
        node.callee.object.name === defaultReblendImportName &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name.match(USE_HOOK_PREFIX_REGEX);

      const isPotentialHookCall =
        reblendHookImportNames &&
        node.callee.type === 'Identifier' &&
        node.callee.name.match(USE_HOOK_PREFIX_REGEX);

      const scope =
        (isPotentialReblendHookCall || isPotentialHookCall) &&
        getScope(context, node);

      const reblendResolvedDefs =
        isPotentialReblendHookCall &&
        scope.references &&
        scope.references.find(
          reference => reference.identifier.name === defaultReblendImportName
        ).resolved.defs;

      const isReblendShadowed =
        isPotentialReblendHookCall &&
        reblendResolvedDefs &&
        reblendResolvedDefs.some(
          reblendDef => reblendDef.type !== 'ImportBinding'
        );

      const potentialHookReference =
        isPotentialHookCall &&
        scope.references &&
        scope.references.find(
          reference => reblendHookImportNames[reference.identifier.name]
        );

      const hookResolvedDefs =
        potentialHookReference && potentialHookReference.resolved.defs;
      const localHookName =
        (isPotentialReblendHookCall && node.callee.property.name) ||
        (isPotentialHookCall && potentialHookReference && node.callee.name);
      const isHookShadowed =
        isPotentialHookCall &&
        hookResolvedDefs &&
        hookResolvedDefs.some(
          hookDef =>
            hookDef.name.name === localHookName &&
            hookDef.type !== 'ImportBinding'
        );

      const isHookCall =
        (isPotentialReblendHookCall && !isReblendShadowed) ||
        (isPotentialHookCall && localHookName && !isHookShadowed);

      if (!isHookCall) {
        return false;
      }

      if (!expectedHookNames) {
        return true;
      }

      return arrayIncludes(
        expectedHookNames,
        (reblendHookImportNames && reblendHookImportNames[localHookName]) ||
          localHookName
      );
    },
  };

  // Component detection instructions
  const detectionInstructions = {
    CallExpression(node) {
      if (!utils.isPragmaComponentWrapper(node)) {
        return;
      }
      if (
        node.arguments.length > 0 &&
        astUtil.isFunctionLikeExpression(node.arguments[0])
      ) {
        components.add(node, 2);
      }
    },

    ClassExpression(node) {
      if (!componentUtil.isES6Component(node, context)) {
        return;
      }
      components.add(node, 2);
    },

    ClassDeclaration(node) {
      if (!componentUtil.isES6Component(node, context)) {
        return;
      }
      components.add(node, 2);
    },

    ObjectExpression(node) {
      if (!componentUtil.isES5Component(node, context)) {
        return;
      }
      components.add(node, 2);
    },

    FunctionExpression(node) {
      if (node.async && node.generator) {
        components.add(node, 0);
        return;
      }

      const component = utils.getStatelessComponent(node);
      if (!component) {
        return;
      }
      components.add(component, 2);
    },

    FunctionDeclaration(node) {
      if (node.async && node.generator) {
        components.add(node, 0);
        return;
      }

      node = utils.getStatelessComponent(node);
      if (!node) {
        return;
      }
      components.add(node, 2);
    },

    ArrowFunctionExpression(node) {
      const component = utils.getStatelessComponent(node);
      if (!component) {
        return;
      }
      components.add(component, 2);
    },

    ThisExpression(node) {
      const component = utils.getParentStatelessComponent(node);
      if (
        !component ||
        !/Function/.test(component.type) ||
        !node.parent.property
      ) {
        return;
      }
      // Ban functions accessing a property on a ThisExpression
      components.add(node, 0);
    },
  };

  // Detect Reblend import specifiers
  const reblendImportInstructions = {
    ImportDeclaration(node) {
      const isReblendImported =
        node.source.type === 'Literal' && node.source.value === 'reblendjs';
      if (!isReblendImported) {
        return;
      }

      node.specifiers.forEach(specifier => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          components.addDefaultReblendImport(specifier);
        }
        if (specifier.type === 'ImportSpecifier') {
          components.addNamedReblendImport(specifier);
        }
      });
    },
  };

  const ruleInstructions = rule(context, components, utils);
  const propTypesInstructions = propTypesUtil(context, components, utils);
  const usedPropTypesInstructions = usedPropTypesUtil(
    context,
    components,
    utils
  );
  const defaultPropsInstructions = defaultPropsUtil(context, components, utils);

  const mergedRule = mergeRules([
    detectionInstructions,
    propTypesInstructions,
    usedPropTypesInstructions,
    defaultPropsInstructions,
    reblendImportInstructions,
    ruleInstructions,
  ]);

  return mergedRule;
}

module.exports = Object.assign(Components, {
  detect(rule) {
    return componentRule.bind(this, rule);
  },
});
