'use strict';

const { join } = require('path');

module.exports = {
  extends: [join(__dirname, 'lib', 'common.js'), 'xo-space'],
  env: {
    es6: false
  }
};
