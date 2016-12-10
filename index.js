const ejs = require('ejs');
const ext = require('object-assign');
const fs = require('fs');
const path = require('path');

module.exports = (themeopts) => {
  // set theme options object
  themeopts = Object(themeopts);

  // set theme logo
  themeopts.logo = themeopts.logo || 'data:image/png;base64,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';

  // set theme title
  themeopts.title = themeopts.title || 'Style Guide';

  // set theme css
  themeopts.css = themeopts.css || ['style.css'];

  // set theme css
  themeopts.js = themeopts.js || [];

  // set example conf
  themeopts.examples = ext({
    base: '',
    target: '_self',
    css: ['style.css'],
    js: [],
    bodyjs: [],
    htmlcss: 'background:none;border:0;clip:auto;display:block;height:auto;margin:0;padding:0;position:static;width:auto;',
    bodycss: 'background:none;border:0;clip:auto;display:block;height:auto;margin:0;padding:16px;position:static;width:auto;',
  }, themeopts.examples);

  // return theme
  return (docs) => {
    // set assets directory and template
    docs.assets = path.join(__dirname, 'assets');
    docs.template = path.join(__dirname, 'template.ejs');

    // set theme options
    docs.themeopts = themeopts;

    // return promise
    return new Promise((resolve, reject) => {
      // read template
      fs.readFile(docs.template, 'utf8', (error, contents) => {
        // throw if template could not be read
        if (error) reject(error);
        else {
          // set examples options
          docs.opts = ext({}, docs.opts, docs.themeopts);

          // set compiled template
          docs.template = ejs.compile(contents)(docs);

          // resolve docs
          resolve(docs);
        }
      });
    });
  };
};

module.exports.type = 'mdcss-theme';
