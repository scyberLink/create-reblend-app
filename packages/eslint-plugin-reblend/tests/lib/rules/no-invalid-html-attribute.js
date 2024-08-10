/**
 * @fileoverview Forbid target='_blank' attribute
 * @author Kevin Miller
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-invalid-html-attribute');
const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('no-invalid-html-attribute', rule, {
  valid: parsers.all([
    { code: '<a rel="alternate"></a>' },
    { code: 'Reblend.createElement("a", { rel: "alternate" })' },
    { code: 'Reblend.createElement("a", { rel: ["alternate"] })' },
    { code: '<a rel="author"></a>' },
    { code: 'Reblend.createElement("a", { rel: "author" })' },
    { code: 'Reblend.createElement("a", { rel: ["author"] })' },
    { code: '<a rel="bookmark"></a>' },
    { code: 'Reblend.createElement("a", { rel: "bookmark" })' },
    { code: 'Reblend.createElement("a", { rel: ["bookmark"] })' },
    { code: '<a rel="external"></a>' },
    { code: 'Reblend.createElement("a", { rel: "external" })' },
    { code: 'Reblend.createElement("a", { rel: ["external"] })' },
    { code: '<a rel="help"></a>' },
    { code: 'Reblend.createElement("a", { rel: "help" })' },
    { code: 'Reblend.createElement("a", { rel: ["help"] })' },
    { code: '<a rel="license"></a>' },
    { code: 'Reblend.createElement("a", { rel: "license" })' },
    { code: 'Reblend.createElement("a", { rel: ["license"] })' },
    { code: '<a rel="next"></a>' },
    { code: 'Reblend.createElement("a", { rel: "next" })' },
    { code: 'Reblend.createElement("a", { rel: ["next"] })' },
    { code: '<a rel="nofollow"></a>' },
    { code: 'Reblend.createElement("a", { rel: "nofollow" })' },
    { code: 'Reblend.createElement("a", { rel: ["nofollow"] })' },
    { code: '<a rel="noopener"></a>' },
    { code: 'Reblend.createElement("a", { rel: "noopener" })' },
    { code: 'Reblend.createElement("a", { rel: ["noopener"] })' },
    { code: '<a rel="noreferrer"></a>' },
    { code: 'Reblend.createElement("a", { rel: "noreferrer" })' },
    { code: 'Reblend.createElement("a", { rel: ["noreferrer"] })' },
    { code: '<a rel="opener"></a>' },
    { code: 'Reblend.createElement("a", { rel: "opener" })' },
    { code: 'Reblend.createElement("a", { rel: ["opener"] })' },
    { code: '<a rel="prev"></a>' },
    { code: 'Reblend.createElement("a", { rel: "prev" })' },
    { code: 'Reblend.createElement("a", { rel: ["prev"] })' },
    { code: '<a rel="search"></a>' },
    { code: 'Reblend.createElement("a", { rel: "search" })' },
    { code: 'Reblend.createElement("a", { rel: ["search"] })' },
    { code: '<a rel="tag"></a>' },
    { code: 'Reblend.createElement("a", { rel: "tag" })' },
    { code: 'Reblend.createElement("a", { rel: ["tag"] })' },
    { code: '<area rel="alternate"></area>' },
    { code: 'Reblend.createElement("area", { rel: "alternate" })' },
    { code: 'Reblend.createElement("area", { rel: ["alternate"] })' },
    { code: '<area rel="author"></area>' },
    { code: 'Reblend.createElement("area", { rel: "author" })' },
    { code: 'Reblend.createElement("area", { rel: ["author"] })' },
    { code: '<area rel="bookmark"></area>' },
    { code: 'Reblend.createElement("area", { rel: "bookmark" })' },
    { code: 'Reblend.createElement("area", { rel: ["bookmark"] })' },
    { code: '<area rel="external"></area>' },
    { code: 'Reblend.createElement("area", { rel: "external" })' },
    { code: 'Reblend.createElement("area", { rel: ["external"] })' },
    { code: '<area rel="help"></area>' },
    { code: 'Reblend.createElement("area", { rel: "help" })' },
    { code: 'Reblend.createElement("area", { rel: ["help"] })' },
    { code: '<area rel="license"></area>' },
    { code: 'Reblend.createElement("area", { rel: "license" })' },
    { code: 'Reblend.createElement("area", { rel: ["license"] })' },
    { code: '<area rel="next"></area>' },
    { code: 'Reblend.createElement("area", { rel: "next" })' },
    { code: 'Reblend.createElement("area", { rel: ["next"] })' },
    { code: '<area rel="nofollow"></area>' },
    { code: 'Reblend.createElement("area", { rel: "nofollow" })' },
    { code: 'Reblend.createElement("area", { rel: ["nofollow"] })' },
    { code: '<area rel="noopener"></area>' },
    { code: 'Reblend.createElement("area", { rel: "noopener" })' },
    { code: 'Reblend.createElement("area", { rel: ["noopener"] })' },
    { code: '<area rel="noreferrer"></area>' },
    { code: 'Reblend.createElement("area", { rel: "noreferrer" })' },
    { code: 'Reblend.createElement("area", { rel: ["noreferrer"] })' },
    { code: '<area rel="opener"></area>' },
    { code: 'Reblend.createElement("area", { rel: "opener" })' },
    { code: 'Reblend.createElement("area", { rel: ["opener"] })' },
    { code: '<area rel="prev"></area>' },
    { code: 'Reblend.createElement("area", { rel: "prev" })' },
    { code: 'Reblend.createElement("area", { rel: ["prev"] })' },
    { code: '<area rel="search"></area>' },
    { code: 'Reblend.createElement("area", { rel: "search" })' },
    { code: 'Reblend.createElement("area", { rel: ["search"] })' },
    { code: '<area rel="tag"></area>' },
    { code: 'Reblend.createElement("area", { rel: "tag" })' },
    { code: 'Reblend.createElement("area", { rel: ["tag"] })' },
    { code: '<link rel="alternate"></link>' },
    { code: 'Reblend.createElement("link", { rel: "alternate" })' },
    { code: 'Reblend.createElement("link", { rel: ["alternate"] })' },
    { code: '<link rel="author"></link>' },
    { code: 'Reblend.createElement("link", { rel: "author" })' },
    { code: 'Reblend.createElement("link", { rel: ["author"] })' },
    { code: '<link rel="canonical"></link>' },
    { code: 'Reblend.createElement("link", { rel: "canonical" })' },
    { code: 'Reblend.createElement("link", { rel: ["canonical"] })' },
    { code: '<link rel="dns-prefetch"></link>' },
    { code: 'Reblend.createElement("link", { rel: "dns-prefetch" })' },
    { code: 'Reblend.createElement("link", { rel: ["dns-prefetch"] })' },
    { code: '<link rel="help"></link>' },
    { code: 'Reblend.createElement("link", { rel: "help" })' },
    { code: 'Reblend.createElement("link", { rel: ["help"] })' },
    { code: '<link rel="icon"></link>' },
    { code: 'Reblend.createElement("link", { rel: "icon" })' },
    { code: 'Reblend.createElement("link", { rel: ["icon"] })' },
    { code: '<link rel="shortcut icon"></link>' },
    { code: 'Reblend.createElement("link", { rel: "shortcut icon" })' },
    { code: 'Reblend.createElement("link", { rel: ["shortcut icon"] })' },
    { code: '<link rel="license"></link>' },
    { code: 'Reblend.createElement("link", { rel: "license" })' },
    { code: 'Reblend.createElement("link", { rel: ["license"] })' },
    { code: '<link rel="manifest"></link>' },
    { code: 'Reblend.createElement("link", { rel: "manifest" })' },
    { code: 'Reblend.createElement("link", { rel: ["manifest"] })' },
    { code: '<link rel="modulepreload"></link>' },
    { code: 'Reblend.createElement("link", { rel: "modulepreload" })' },
    { code: 'Reblend.createElement("link", { rel: ["modulepreload"] })' },
    { code: '<link rel="next"></link>' },
    { code: 'Reblend.createElement("link", { rel: "next" })' },
    { code: 'Reblend.createElement("link", { rel: ["next"] })' },
    { code: '<link rel="pingback"></link>' },
    { code: 'Reblend.createElement("link", { rel: "pingback" })' },
    { code: 'Reblend.createElement("link", { rel: ["pingback"] })' },
    { code: '<link rel="preconnect"></link>' },
    { code: 'Reblend.createElement("link", { rel: "preconnect" })' },
    { code: 'Reblend.createElement("link", { rel: ["preconnect"] })' },
    { code: '<link rel="prefetch"></link>' },
    { code: 'Reblend.createElement("link", { rel: "prefetch" })' },
    { code: 'Reblend.createElement("link", { rel: ["prefetch"] })' },
    { code: '<link rel="preload"></link>' },
    { code: 'Reblend.createElement("link", { rel: "preload" })' },
    { code: 'Reblend.createElement("link", { rel: ["preload"] })' },
    { code: '<link rel="prerender"></link>' },
    { code: 'Reblend.createElement("link", { rel: "prerender" })' },
    { code: 'Reblend.createElement("link", { rel: ["prerender"] })' },
    { code: '<link rel="prev"></link>' },
    { code: 'Reblend.createElement("link", { rel: "prev" })' },
    { code: 'Reblend.createElement("link", { rel: ["prev"] })' },
    { code: '<link rel="search"></link>' },
    { code: 'Reblend.createElement("link", { rel: "search" })' },
    { code: 'Reblend.createElement("link", { rel: ["search"] })' },
    { code: '<link rel="stylesheet"></link>' },
    { code: 'Reblend.createElement("link", { rel: "stylesheet" })' },
    { code: 'Reblend.createElement("link", { rel: ["stylesheet"] })' },
    { code: '<form rel="external"></form>' },
    { code: 'Reblend.createElement("form", { rel: "external" })' },
    { code: 'Reblend.createElement("form", { rel: ["external"] })' },
    { code: '<form rel="help"></form>' },
    { code: 'Reblend.createElement("form", { rel: "help" })' },
    { code: 'Reblend.createElement("form", { rel: ["help"] })' },
    { code: '<form rel="license"></form>' },
    { code: 'Reblend.createElement("form", { rel: "license" })' },
    { code: 'Reblend.createElement("form", { rel: ["license"] })' },
    { code: '<form rel="next"></form>' },
    { code: 'Reblend.createElement("form", { rel: "next" })' },
    { code: 'Reblend.createElement("form", { rel: ["next"] })' },
    { code: '<form rel="nofollow"></form>' },
    { code: 'Reblend.createElement("form", { rel: "nofollow" })' },
    { code: 'Reblend.createElement("form", { rel: ["nofollow"] })' },
    { code: '<form rel="noopener"></form>' },
    { code: 'Reblend.createElement("form", { rel: "noopener" })' },
    { code: 'Reblend.createElement("form", { rel: ["noopener"] })' },
    { code: '<form rel="noreferrer"></form>' },
    { code: 'Reblend.createElement("form", { rel: "noreferrer" })' },
    { code: 'Reblend.createElement("form", { rel: ["noreferrer"] })' },
    { code: '<form rel="opener"></form>' },
    { code: 'Reblend.createElement("form", { rel: "opener" })' },
    { code: 'Reblend.createElement("form", { rel: ["opener"] })' },
    { code: '<form rel="prev"></form>' },
    { code: 'Reblend.createElement("form", { rel: "prev" })' },
    { code: 'Reblend.createElement("form", { rel: ["prev"] })' },
    { code: '<form rel="search"></form>' },
    { code: 'Reblend.createElement("form", { rel: "search" })' },
    { code: 'Reblend.createElement("form", { rel: ["search"] })' },
    { code: '<form rel={callFoo()}></form>' },
    { code: 'Reblend.createElement("form", { rel: callFoo() })' },
    { code: 'Reblend.createElement("form", { rel: [callFoo()] })' },
    { code: '<a rel={{a: "noreferrer"}["a"]}></a>' },
    { code: '<a rel={{a: "noreferrer"}["b"]}></a>' },
    { code: '<Foo rel></Foo>' },
    { code: 'Reblend.createElement("Foo", { rel: true })' },
    {
      code: `
        Reblend.createElement('a', {
          ...rest,
          href: to,
        })
      `,
    },
    {
      code: '<link rel="apple-touch-icon" sizes="60x60" href="apple-touch-icon-60x60.png" />',
    },
    {
      code: '<link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-76x76.png" />',
    },
    {
      code: '<link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png" />',
    },
    {
      code: '<link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png" />',
    },
    {
      code: '<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png" />',
    },
    {
      code: '<link rel="apple-touch-startup-image" href="launch.png" />',
    },
    {
      code: '<link rel="apple-touch-startup-image" href="iphone5.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />',
    },
    {
      code: '<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff" />',
    },
  ]),
  invalid: parsers.all(
    [].concat(
      {
        code: '<a rel="alternatex"></a>',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              attributeName: 'rel',
              reportingValue: 'alternatex',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternatex' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: "alternatex" })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              attributeName: 'rel',
              reportingValue: 'alternatex',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternatex' },
                output: 'Reblend.createElement("a", { rel: "" })',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: ["alternatex"] })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'alternatex',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternatex' },
                output: 'Reblend.createElement("a", { rel: [""] })',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="alternatex alternate"></a>',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              attributeName: 'rel',
              reportingValue: 'alternatex',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternatex' },
                output: '<a rel=" alternate"></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: "alternatex alternate" })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              attributeName: 'rel',
              reportingValue: 'alternatex alternate',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternatex alternate' },
                output: 'Reblend.createElement("a", { rel: "" })',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: ["alternatex alternate"] })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'alternatex alternate',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternatex alternate' },
                output: 'Reblend.createElement("a", { rel: [""] })',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="alternate alternatex"></a>',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'alternatex',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternatex' },
                output: '<a rel="alternate "></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: "alternate alternatex" })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'alternate alternatex',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternate alternatex' },
                output: 'Reblend.createElement("a", { rel: "" })',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: ["alternate alternatex"] })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'alternate alternatex',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternate alternatex' },
                output: 'Reblend.createElement("a", { rel: [""] })',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<html rel></html>',
        errors: [
          {
            messageId: 'onlyMeaningfulFor',
            data: {
              attributeName: 'rel',
              tagNames: '"<link>", "<a>", "<area>", "<form>"',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveDefault',
                data: { attributeName: 'rel' },
                output: '<html ></html>',
              },
            ],
            type: 'JSXIdentifier',
          },
        ],
      },
      {
        code: 'Reblend.createElement("html", { rel: 1 })',
        errors: [
          {
            messageId: 'onlyMeaningfulFor',
            data: {
              attributeName: 'rel',
              tagNames: '"<link>", "<a>", "<area>", "<form>"',
            },
            // suggestions: [
            //   {
            //     messageId: 'suggestRemoveDefault',
            //     data: { attributeName: 'rel' },
            //     output: 'Reblend.createElement("html", { })',
            //   },
            // ],
            column: 31,
            type: 'Identifier',
          },
        ],
      },
      {
        code: '<a rel></a>',
        errors: [
          {
            messageId: 'emptyIsMeaningless',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveEmpty',
                data: { attributeName: 'rel' },
                output: '<a ></a>',
              },
            ],
            type: 'JSXIdentifier',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: 1 })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              attributeName: 'rel',
              reportingValue: 1,
            },
            // suggestions: [
            //   {
            //     messageId: 'suggestRemoveDefault',
            //     output: 'Reblend.createElement("a", { })',
            //   },
            // ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel() { return 1; } })',
        errors: [
          {
            messageId: 'noMethod',
            data: { attributeName: 'rel' },
            type: 'Property',
          },
        ],
      },
      {
        code: '<span rel></span>',
        errors: [
          {
            messageId: 'onlyMeaningfulFor',
            data: {
              attributeName: 'rel',
              tagNames: '"<link>", "<a>", "<area>", "<form>"',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveDefault',
                data: { attributeName: 'rel' },
                output: '<span ></span>',
              },
            ],
            type: 'JSXIdentifier',
          },
        ],
      },
      {
        code: '<a rel={null}></a>',
        errors: [
          {
            messageId: 'onlyStrings',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveNonString',
                data: { attributeName: 'rel' },
                output: '<a ></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel={5}></a>',
        errors: [
          {
            messageId: 'onlyStrings',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveNonString',
                data: { attributeName: 'rel' },
                output: '<a ></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel={true}></a>',
        errors: [
          {
            messageId: 'onlyStrings',
            data: { attributeName: 'rel', reportingValue: 'true' },
            suggestions: [
              {
                messageId: 'suggestRemoveNonString',
                data: { attributeName: 'rel', reportingValue: 'true' },
                output: '<a ></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel={{}}></a>',
        errors: [
          {
            messageId: 'onlyStrings',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveDefault',
                data: { attributeName: 'rel' },
                output: '<a ></a>',
              },
            ],
            type: 'JSXExpressionContainer',
          },
        ],
      },
      {
        code: '<a rel={undefined}></a>',
        errors: [
          {
            messageId: 'onlyStrings',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveDefault',
                data: { attributeName: 'rel' },
                output: '<a ></a>',
              },
            ],
            type: 'JSXExpressionContainer',
          },
        ],
      },
      {
        code: '<a rel="noreferrer noopener foobar"></a>',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              attributeName: 'rel',
              reportingValue: 'foobar',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'foobar' },
                output: '<a rel="noreferrer noopener "></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="noreferrer noopener   "></a>',
        errors: [
          {
            messageId: 'spaceDelimited',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveWhitespaces',
                data: { attributeName: 'rel' },
                output: '<a rel="noreferrer noopener"></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="noreferrer        noopener"></a>',
        errors: [
          {
            messageId: 'spaceDelimited',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveWhitespaces',
                data: { attributeName: 'rel' },
                output: '<a rel="noreferrer noopener"></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="noreferrer\xa0\xa0noopener"></a>',
        errors: [
          {
            messageId: 'spaceDelimited',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveWhitespaces',
                data: { attributeName: 'rel' },
                output: '<a rel="noreferrer noopener"></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel={"noreferrer noopener foobar"}></a>',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'foobar',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'foobar' },
                output: '<a rel={"noreferrer noopener "}></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: 'Reblend.createElement("a", { rel: ["noreferrer", "noopener", "foobar" ] })',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'foobar',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'foobar' },
                output:
                  'Reblend.createElement("a", { rel: ["noreferrer", "noopener", "" ] })',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel={"foobar noreferrer noopener"}></a>',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'foobar',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'foobar' },
                output: '<a rel={" noreferrer noopener"}></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      parsers.skipDueToMultiErrorSorting
        ? []
        : {
            code: '<a rel={"foobar batgo       noopener"}></a>',
            errors: [
              {
                messageId: 'neverValid',
                data: {
                  reportingValue: 'foobar',
                  attributeName: 'rel',
                },
                suggestions: [
                  {
                    messageId: 'suggestRemoveInvalid',
                    data: { reportingValue: 'foobar' },
                    output: '<a rel={" batgo       noopener"}></a>',
                  },
                ],
                type: 'Literal',
              },
              {
                messageId: 'neverValid',
                data: {
                  reportingValue: 'batgo',
                  attributeName: 'rel',
                },
                suggestions: [
                  {
                    messageId: 'suggestRemoveInvalid',
                    data: { reportingValue: 'batgo' },
                    output: '<a rel={"foobar        noopener"}></a>',
                  },
                ],
                type: 'Literal',
              },
              {
                messageId: 'spaceDelimited',
                data: { attributeName: 'rel' },
                suggestions: [
                  {
                    messageId: 'suggestRemoveWhitespaces',
                    data: { attributeName: 'rel' },
                    output: '<a rel={"foobar batgo noopener"}></a>',
                  },
                ],
              },
            ],
          },
      {
        code: '<a rel={"        noopener"}></a>',
        errors: [
          {
            messageId: 'spaceDelimited',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveWhitespaces',
                data: { attributeName: 'rel' },
                output: '<a rel={"noopener"}></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel={"noopener        "}></a>',
        errors: [
          {
            messageId: 'spaceDelimited',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveWhitespaces',
                data: { attributeName: 'rel' },
                output: '<a rel={"noopener"}></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      parsers.skipDueToMultiErrorSorting
        ? []
        : {
            code: '<a rel={" batgo noopener"}></a>',
            errors: [
              {
                messageId: 'neverValid',
                data: {
                  reportingValue: 'batgo',
                  attributeName: 'rel',
                },
                suggestions: [
                  {
                    messageId: 'suggestRemoveInvalid',
                    data: { reportingValue: 'batgo' },
                    output: '<a rel={"  noopener"}></a>',
                  },
                ],
                type: 'Literal',
              },
              {
                messageId: 'spaceDelimited',
                data: { attributeName: 'rel' },
                suggestions: [
                  {
                    messageId: 'suggestRemoveWhitespaces',
                    data: { attributeName: 'rel' },
                    output: '<a rel={"batgo noopener"}></a>',
                  },
                ],
              },
            ],
          },
      {
        code: '<a rel={"batgo noopener"}></a>',
        errors: [
          {
            messageId: 'neverValid',
            data: {
              reportingValue: 'batgo',
              attributeName: 'rel',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'batgo' },
                output: '<a rel={" noopener"}></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel={" noopener"}></a>',
        errors: [
          {
            messageId: 'spaceDelimited',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveWhitespaces',
                data: { attributeName: 'rel' },
                output: '<a rel={"noopener"}></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="canonical"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'canonical',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'canonical' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="dns-prefetch"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'dns-prefetch',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'dns-prefetch' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="icon"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'icon',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'icon' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="shortcut"></link>',
        errors: [
          {
            messageId: 'notAlone',
            data: {
              reportingValue: 'shortcut',
              missingValue: 'icon',
            },
            type: 'Literal',
          },
        ],
      },
      parsers.skipDueToMultiErrorSorting
        ? []
        : {
            code: '<link rel="shortcut foo"></link>',
            errors: [
              {
                messageId: 'neverValid',
                data: {
                  attributeName: 'rel',
                  reportingValue: 'foo',
                },
                suggestions: [
                  {
                    messageId: 'suggestRemoveInvalid',
                    data: {
                      attributeName: 'rel',
                      reportingValue: 'foo',
                    },
                    output: '<link rel="shortcut "></link>',
                  },
                ],
                type: 'Literal',
              },
              {
                messageId: 'notPaired',
                data: {
                  reportingValue: 'shortcut',
                  secondValue: 'foo',
                  missingValue: 'icon',
                },
                type: 'Literal',
              },
            ],
          },
      {
        code: '<link rel="shortcut  icon"></link>',
        errors: [
          {
            messageId: 'spaceDelimited',
            data: { attributeName: 'rel' },
            suggestions: [
              {
                messageId: 'suggestRemoveWhitespaces',
                data: { attributeName: 'rel' },
                output: '<link rel="shortcut icon"></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      parsers.skipDueToMultiErrorSorting
        ? []
        : {
            code: '<link rel="shortcut  foo"></link>',
            errors: [
              {
                messageId: 'neverValid',
                data: {
                  attributeName: 'rel',
                  reportingValue: 'foo',
                },
                suggestions: [
                  {
                    messageId: 'suggestRemoveInvalid',
                    data: {
                      attributeName: 'rel',
                      reportingValue: 'foo',
                    },
                    output: '<link rel="shortcut  "></link>',
                  },
                ],
                type: 'Literal',
              },
              {
                messageId: 'notAlone',
                data: {
                  attributeName: 'rel',
                  reportingValue: 'shortcut',
                  missingValue: 'icon',
                },
              },
              {
                messageId: 'spaceDelimited',
                data: { attributeName: 'rel' },
                suggestions: [
                  {
                    messageId: 'suggestRemoveWhitespaces',
                    data: { attributeName: 'rel' },
                    output: '<link rel="shortcut foo"></link>',
                  },
                ],
                type: 'Literal',
              },
            ],
          },
      {
        code: '<a rel="manifest"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'manifest',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'manifest' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="modulepreload"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'modulepreload',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'modulepreload' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="pingback"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'pingback',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'pingback' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="preconnect"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'preconnect',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'preconnect' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="prefetch"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'prefetch',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'prefetch' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="preload"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'preload',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'preload' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="prerender"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'prerender',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'prerender' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<a rel="stylesheet"></a>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'stylesheet',
              attributeName: 'rel',
              elementName: 'a',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'stylesheet' },
                output: '<a rel=""></a>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="canonical"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'canonical',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'canonical' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="dns-prefetch"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'dns-prefetch',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'dns-prefetch' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="icon"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'icon',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'icon' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="manifest"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'manifest',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'manifest' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="modulepreload"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'modulepreload',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'modulepreload' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="pingback"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'pingback',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'pingback' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="preconnect"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'preconnect',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'preconnect' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="prefetch"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'prefetch',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'prefetch' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="preload"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'preload',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'preload' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="prerender"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'prerender',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'prerender' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<area rel="stylesheet"></area>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'stylesheet',
              attributeName: 'rel',
              elementName: 'area',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'stylesheet' },
                output: '<area rel=""></area>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="bookmark"></link>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'bookmark',
              attributeName: 'rel',
              elementName: 'link',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'bookmark' },
                output: '<link rel=""></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="external"></link>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'external',
              attributeName: 'rel',
              elementName: 'link',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'external' },
                output: '<link rel=""></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="nofollow"></link>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'nofollow',
              attributeName: 'rel',
              elementName: 'link',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'nofollow' },
                output: '<link rel=""></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="noopener"></link>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'noopener',
              attributeName: 'rel',
              elementName: 'link',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'noopener' },
                output: '<link rel=""></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="noreferrer"></link>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'noreferrer',
              attributeName: 'rel',
              elementName: 'link',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'noreferrer' },
                output: '<link rel=""></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="opener"></link>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'opener',
              attributeName: 'rel',
              elementName: 'link',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'opener' },
                output: '<link rel=""></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<link rel="tag"></link>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'tag',
              attributeName: 'rel',
              elementName: 'link',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'tag' },
                output: '<link rel=""></link>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="alternate"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'alternate',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'alternate' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="author"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'author',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'author' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="bookmark"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'bookmark',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'bookmark' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="canonical"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'canonical',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'canonical' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="dns-prefetch"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'dns-prefetch',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'dns-prefetch' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="icon"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'icon',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'icon' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="manifest"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'manifest',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'manifest' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="modulepreload"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'modulepreload',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'modulepreload' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="pingback"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'pingback',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'pingback' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="preconnect"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'preconnect',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'preconnect' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="prefetch"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'prefetch',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'prefetch' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="preload"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'preload',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'preload' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="prerender"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'prerender',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'prerender' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="stylesheet"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'stylesheet',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'stylesheet' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel="tag"></form>',
        errors: [
          {
            messageId: 'notValidFor',
            data: {
              reportingValue: 'tag',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveInvalid',
                data: { reportingValue: 'tag' },
                output: '<form rel=""></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      },
      {
        code: '<form rel=""></form>',
        errors: [
          {
            messageId: 'noEmpty',
            data: {
              reportingValue: 'tag',
              attributeName: 'rel',
              elementName: 'form',
            },
            suggestions: [
              {
                messageId: 'suggestRemoveEmpty',
                data: { attributeName: 'rel' },
                output: '<form ></form>',
              },
            ],
            type: 'Literal',
          },
        ],
      }
    )
  ),
});
