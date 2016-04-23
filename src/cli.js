#!/usr/bin/env node
'use strict';

var fs = require('fs');
var HTMLtoJSX = require('./htmltojsx.js');

var tidy = require('htmltidy').tidy;
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
  // if input coming from
  if (process.stdin.isTTY && (!files || files.length === 0)) {
      console.error('Please provide a file name');
      args.showHelp();
      process.exit(1);
  }
  return args.argv;
}

function main() {
  var argv = getArgs();

  var converter = new HTMLtoJSX({
    createClass: !!argv.className,
    outputClassName: argv.className
  });

  if (process.stdin.isTTY){
    fs.readFile(argv._[0], 'utf-8', function(err, input) {
      if (err) {
        console.error(err.stack);
        process.exit(2);
      }
      tidy(input, function(err, html){
        if (err) {
          console.error(err.stack);
          process.exit(2);
        }

        var output = converter.convert(html);
        console.log(output);
        process.exit();
      });
    });
  }
  else{
    var data = '';
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', function(chunk){
      data += chunk;
    });

    process.stdin.on('end', function(){
      tidy(data, function(err, html){
        if (err) {
          console.error(err.stack);
          process.exit(2);
        }

        var output = converter.convert(html);
        console.log(output);
        process.exit();
      })
    });
  }
}

main();
