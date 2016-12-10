'use strict';

const mdcss = require('mdcss');
const fs = require('fs');
const path = require('path');
const plugin = require('./');
const test = require('tape');

test('mdcss-theme-github', (t) => {
  t.plan(1);

  const message = 'Test mdcss GitHub';
  const options = { theme: plugin({ title: 'mdcss GitHub' }), destination: 'demo' };
  const warning = 0;
  const warningMsg = `${message} (# of warnings)`;
  const inputPath = path.resolve('assets/style.css');
  let inputCSS = '';

  try {
    inputCSS = fs.readFileSync(inputPath, 'utf8');
  } catch (error) {
    fs.writeFileSync(inputPath, inputCSS);
  }

  mdcss.process(inputCSS, options).then((result) => {
    t.equal(result.warnings().length, warning, warningMsg);
  });
});
