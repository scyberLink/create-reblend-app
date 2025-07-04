'use strict';

const path = require('path');
const camelcase = require('camelcase');

// This is a custom Jest transformer turning file imports into filenames.
// http://scyberLink.github.io/jest/docs/en/webpack.html

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = camelcase(path.parse(filename).name, {
        pascalCase: true,
      });
      const componentName = `Svg${pascalCaseFilename}`;
      return `const Reblend = require('reblendjs');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ${componentName}: Reblend.construct('svg', {src: ${assetFilename}}),
      };`;
    }

    return `module.exports = ${assetFilename};`;
  },
};
