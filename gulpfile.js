require('babel/register');

var gulp = require('gulp');

require('./gulp_tasks/spec.js');
require('./gulp_tasks/css.js');
require('./gulp_tasks/js.js');
require('./gulp_tasks/gh_pages.js');