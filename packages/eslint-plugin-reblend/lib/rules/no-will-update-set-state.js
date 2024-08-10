/**
 * @fileoverview Prevent usage of setState in componentWillUpdate
 * @author Yannick Croissant
 */

'use strict';

const makeNoMethodSetStateRule = require('../util/makeNoMethodSetStateRule');
const testReblendVersion = require('../util/version').testReblendVersion;

/** @type {import('eslint').Rule.RuleModule} */
module.exports = makeNoMethodSetStateRule('componentWillUpdate', context =>
  testReblendVersion(context, '>= 16.3.0')
);
