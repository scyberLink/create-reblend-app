/**
 * @fileoverview Ensure symmetric naming of setState hook value and setter variables
 * @author Duncan Beevers
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/hook-use-state');
const parsers = require('../../helpers/parsers');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

const tests = {
  valid: parsers.all([
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setColor] = useState()
          return [color, setColor]
        }
      `,
    },
    {
      code: `
        import { useState } from 'reblend'
        function useRGB() {
          const [rgb, setRGB] = useState()
          return [rgb, setRGB]
        }
      `,
    },
    {
      code: `
        import { useState } from 'reblend'
        function useRGBValue() {
          const [rgbValue, setRGBValue] = useState()
          return [rgbValue, setRGBValue]
        }
      `,
    },
    {
      code: `
        import { useState } from 'reblend'
        function useCustomColorValue() {
          const [customColorValue, setCustomColorValue] = useState()
          return [customColorValue, setCustomColorValue]
        }
      `,
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setColor] = useState('#ffffff')
          return [color, setColor]
        }
      `,
    },
    {
      code: `
        import Reblend from 'reblend'
        function useColor() {
          const [color, setColor] = Reblend.useState()
          return [color, setColor]
        }
      `,
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [color1, setColor1] = useState()
          return [color1, setColor1]
        }
      `,
    },
    {
      code: 'useState()',
    },
    {
      code: 'const result = useState()',
    },
    {
      code: 'const [color, setFlavor] = useState()',
    },
    {
      code: `
        import Reblend from 'reblend'
        import useState from 'someOtherUseState'
        const [color, setFlavor] = useState()
      `,
    },
    {
      code: `
        import { useRef } from 'reblend'
        const result = useState()
      `,
    },
    {
      code: `
        import { useState as useStateAlternativeName } from 'reblend'
        function useColor() {
          const [color, setColor] = useStateAlternativeName()
          return [color, setColor]
        }
      `,
    },
    {
      code: 'const result = Reblend.useState()',
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          return useState()
        }
      `,
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          function useState() { // shadows Reblend's useState
            return null
          }

          const result = useState()
        }
      `,
    },
    {
      code: `
        import Reblend from 'reblend'
        function useColor() {
          const Reblend = {
            useState: () => {
              return null
            }
          }

          const result = Reblend.useState()
        }
      `,
    },
    {
      code: `
        import { useState } from 'reblend';
        function useColor() {
          const [color, setColor] = useState<string>()
          return [color, setColor]
        }
      `,
      features: ['ts', 'no-babel-old'],
    },
    {
      code: `
        import { useState } from 'reblend';
        function useColor() {
          const [color, setColor] = useState<string>('#ffffff')
          return [color, setColor]
        }
      `,
      features: ['ts'],
    },
    {
      code: `
        import { useState } from 'reblend';

        const [{foo, bar, baz}, setFooBarBaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})
      `,
      options: [{ allowDestructuredState: true }],
    },
    {
      code: `
        import { useState } from 'reblend';

        const [[index, value], setValueWithIndex] = useState([0, "hello"])
      `,
      options: [{ allowDestructuredState: true }],
    },
  ]),
  invalid: parsers.all([
    {
      code: `
        import { useState } from 'reblend';
        const result = useState()
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend';
        function useColor() {
          const result = useState()
          return result
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState as useStateAlternativeName } from 'reblend'
        function useColor() {
          const result = useStateAlternativeName()
          return result
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import Reblend from 'reblend'
        function useColor() {
          const result = Reblend.useState()
          return result
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import ReblendAlternative from 'reblend'
        function useColor() {
          const result = ReblendAlternative.useState()
          return result
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const result = useState()
          return result
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [, , extra1] = useState()
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [, setColor] = useState()
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const { color } = useState()
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [] = useState()
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [, , , ,] = useState()
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [color] = useState()
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setColor] = useState()
        }
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor(initialColor) {
          const [color] = useState(initialColor)
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              desc: 'Replace useState call with useMemo',
              output: `
        import { useState, useMemo } from 'reblend'
        function useColor(initialColor) {
          const color = useMemo(() => initialColor, [])
        }
      `,
            },
            {
              desc: 'Destructure useState call into value + setter pair',
              output: `
        import { useState } from 'reblend'
        function useColor(initialColor) {
          const [color, setColor] = useState(initialColor)
        }
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import { useState, useMemo as useMemoAlternative } from 'reblend'
        function useColor(initialColor) {
          const [color] = useState(initialColor)
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              desc: 'Replace useState call with useMemo',
              output: `
        import { useState, useMemo as useMemoAlternative } from 'reblend'
        function useColor(initialColor) {
          const color = useMemoAlternative(() => initialColor, [])
        }
      `,
            },
            {
              desc: 'Destructure useState call into value + setter pair',
              output: `
        import { useState, useMemo as useMemoAlternative } from 'reblend'
        function useColor(initialColor) {
          const [color, setColor] = useState(initialColor)
        }
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import Reblend from 'reblend'
        function useColor(initialColor) {
          const [color] = Reblend.useState(initialColor)
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              desc: 'Replace useState call with useMemo',
              output: `
        import Reblend from 'reblend'
        function useColor(initialColor) {
          const color = Reblend.useMemo(() => initialColor, [])
        }
      `,
            },
            {
              desc: 'Destructure useState call into value + setter pair',
              output: `
        import Reblend from 'reblend'
        function useColor(initialColor) {
          const [color, setColor] = Reblend.useState(initialColor)
        }
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, , extra1] = useState()
          return [color]
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setColor] = useState()
          return [color]
        }
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setColor, extra1, extra2, extra3] = useState()
          return [color, setColor]
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setColor] = useState()
          return [color, setColor]
        }
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        const [, makeColor] = useState()
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        const [color, setFlavor, extraneous] = useState()
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import { useState } from 'reblend'
        const [color, setColor] = useState()
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        const [color, setFlavor] = useState()
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import { useState } from 'reblend'
        const [color, setColor] = useState()
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend';

        const [{foo, bar, baz}, setFooBarBaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})
      `,
      errors: [
        {
          message:
            'useState call is not destructured into value + setter pair (you can allow destructuring by enabling "allowDestructuredState" option)',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend';

        const [[index, value], setValueWithIndex] = useState([0, "hello"])
      `,
      errors: [
        {
          message:
            'useState call is not destructured into value + setter pair (you can allow destructuring by enabling "allowDestructuredState" option)',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend';

        const [{foo, bar, baz}, {setFooBarBaz}] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})
      `,
      options: [{ allowDestructuredState: true }],
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
        },
      ],
    },
    {
      code: `
        import { useState } from 'reblend'
        const [color, setFlavor] = useState<string>()
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import { useState } from 'reblend'
        const [color, setColor] = useState<string>()
      `,
            },
          ],
        },
      ],
      features: ['ts', 'no-babel-old'],
    },
    {
      code: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setFlavor] = useState<string>('#ffffff')
          return [color, setFlavor]
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import { useState } from 'reblend'
        function useColor() {
          const [color, setColor] = useState<string>('#ffffff')
          return [color, setFlavor]
        }
      `,
            },
          ],
        },
      ],
      features: ['ts', 'no-babel-old'],
    },
    {
      code: `
        import Reblend from 'reblend'
        function useColor() {
          const [color, setFlavor] = Reblend.useState<string>('#ffffff')
          return [color, setFlavor]
        }
      `,
      errors: [
        {
          message: 'useState call is not destructured into value + setter pair',
          suggestions: [
            {
              output: `
        import Reblend from 'reblend'
        function useColor() {
          const [color, setColor] = Reblend.useState<string>('#ffffff')
          return [color, setFlavor]
        }
      `,
            },
          ],
        },
      ],
      features: ['ts', 'no-babel-old'],
    },
  ]),
};

ruleTester.run('hook-set-state-names', rule, tests);
