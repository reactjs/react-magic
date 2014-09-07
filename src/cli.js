#!/usr/bin/env node
'use strict';

var fs = require('fs');
var HTMLtoJSX = require('./htmltojsx.js');
var yargs = require('yargs');

function getArgs() {
  var args = yargs
    .usage(
      'Converts HTML to JSX for use with React.\n' +
      'Usage: $0 [-c ComponentName] file.htm'
    )
    .describe('className', 'Create a React component (wraps JSX in React.createClass call)')
    .alias('className', 'c')
    .help('help')
    .example(
      '$0 -c AwesomeComponent awesome.htm',
      'Creates React component "AwesomeComponent" based on awesome.htm'
    )
    .strict();

  var files = args.argv._;
  if (!files || files.length === 0) {
    console.error('Please provide a file name');
    args.showHelp();
    process.exit(1);
  }
  return args.argv;
}

function main() {
  var argv = getArgs();
  fs.readFile(argv._[0], 'utf-8', function(err, input) {
    if (err) {
      console.error(err.stack);
      process.exit(2);
    }
    var converter = new HTMLtoJSX({
      createClass: !!argv.className,
      outputClassName: argv.className
    });
    var output = converter.convert(input);
    console.log(output);
  });
}

main();
