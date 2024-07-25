'use strict';

var _core = require('@babel/core');

function svgLoader(source) {
  const callback = this.async();
  const babelOptions = {
    babelrc: false,
    configFile: false,

    presets: [
      [
        require.resolve('babel-plugin-transform-reblend-jsx'),
        {
          includeTypescript: false,
        },
      ],
    ],
  };

  const readSvg = () =>
    new Promise((resolve, reject) => {
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

  const tranformSvg = svg =>
    new Promise((resolve, reject) => {
      try {
        const src = previousExport
          .split(
            previousExport.includes('default') ? 'export default ' : 'export '
          )[1]
          .split(';')[0];
        const template = `
            import Reblend from 'reblendjs'
    
            function SvgLogo(props) {
                return (<img src={${src}} {...props}/>)
            }
    
            ${previousExport}
            
            export { SvgLogo as ReblendComponent }
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

  if (previousExport) {
    readSvg().then(tranformSvg);
  } else {
    tranformSvg(source);
  }
}

var _default = svgLoader;
exports.default = _default;
