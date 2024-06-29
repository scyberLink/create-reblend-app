/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const RulesOfHooks = require('./RulesOfHooks');
const ExhaustiveDeps = require('./ExhaustiveDeps');

exports.configs = {
  recommended: {
    plugins: ['eslint-plugin-reblend-hooks'],
    rules: {
      'reblend-hooks/rules-of-hooks': 'error',
      'reblend-hooks/exhaustive-deps': 'warn',
    },
  },
};

exports.rules = {
  'rules-of-hooks': RulesOfHooks,
  'exhaustive-deps': ExhaustiveDeps,
};
