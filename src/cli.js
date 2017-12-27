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
    .example(
      'cat file.htm | $0 -c AwesomeComponent',
      'Creates React component "AwesomeComponent" based on data piped in'
    )
    .strict();

  var files = args.argv._;

  // print error if called directly (not piped) and no files are specified
  if (process.stdin.isTTY && (!files || files.length === 0)) {
      console.error('Please provide a file name');
      args.showHelp();
      process.exit(1);
  }
  return args.argv;
}

function buildConverterCb(createClass, outputClassName) {
  var converter = new HTMLtoJSX({
    createClass: createClass,
    outputClassName: outputClassName
  });

  return function(err, input) {
    if (err) {
      console.error(err.stack);
      process.exit(2);
    }

    var output = converter.convert(input);
    console.log(output);
    process.exit();
  }
}

function readFromPipe(cb) {
  var data = '';
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(chunk) {
    data += chunk;
  });
  process.stdin.on('end', function() {
    return cb(null, data);
  });
}


function main() {
  var argv = getArgs();
  var convertInputCb = buildConverterCb(!!argv.className, argv.className);

  if (process.stdin.isTTY) {
    return fs.readFile(argv._[0], 'utf-8', convertInputCb);
  }
  return readFromPipe(convertInputCb);
}

main();
