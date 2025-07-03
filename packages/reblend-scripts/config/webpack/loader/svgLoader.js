'use strict';

var _core = require('@babel/core');
const camelcase = require('camelcase');
const path = require('path');

function svgLoader(source) {
  const callback = this.async();
  let pascalCaseFilename = 'SvgLogo';

  const readSvg = () =>
    new Promise((resolve, reject) => {
      pascalCaseFilename = camelcase(path.parse(this.resourcePath).name, {
        pascalCase: true,
      });

      this.fs.readFile(this.resourcePath, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

  const previousExport = (() => {
    if (source.toString('utf-8').startsWith('export ')) {
      return source;
    }

    const exportMatches = source
      .toString('utf-8')
      .match(/^module.exports\s*=\s*(.*)/);
    return exportMatches ? `export default ${exportMatches[1]}` : null;
  })();

  const src = previousExport
    .split(
      previousExport.includes('default') ? 'export default ' : 'export '
    )[1]
    .split(';')[0];

  const babelOptions = {
    babelrc: false,
    configFile: false,
    filename: src,
    presets: [[require.resolve('babel-preset-reblend'), {}]],
  };

  const tranformSvg = svgContent => {
    new Promise((resolve, reject) => {
      try {
        const template = `
            import Reblend from 'reblendjs'
    
            function ${pascalCaseFilename}() {
                return (${svgContent})
            }
    
            ${previousExport}
            
            export { ${pascalCaseFilename}, ${pascalCaseFilename} as Component }
            `;
        resolve(template);
      } catch (error) {
        reject(error);
      }
    })
      .then(jsCode => {
        return (0, _core.transformAsync)(jsCode, babelOptions).then(
          ({ code }) => code
        );
      })
      .then(result => callback(null, result))
      .catch(err => callback(err));
  };

  readSvg().then(tranformSvg);
}

var _default = svgLoader;
exports.default = _default;
