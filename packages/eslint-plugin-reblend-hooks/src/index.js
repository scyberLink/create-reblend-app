/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import RulesOfHooks from './RulesOfHooks';
import ExhaustiveDeps from './ExhaustiveDeps';

export const configs = {
  recommended: {
    plugins: ['reblend-hooks'],
    rules: {
      'reblend-hooks/rules-of-hooks': 'error',
      'reblend-hooks/exhaustive-deps': 'warn',
    },
  },
};

export const rules = {
  'rules-of-hooks': RulesOfHooks,
  'exhaustive-deps': ExhaustiveDeps,
};