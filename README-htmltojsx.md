HTMLtoJSX
=========

HTMLtoJSX converts HTML to JSX for use with [React](facebook.github.io/react/).

Installation
============

```
npm install htmltojsx
```

Alternatively, a web-based version is available at http://facebook.github.io/react/html-jsx.html

Usage
=====
HTMLtoJSX can be used either as a command-line application or as a Node.js module. To use the command-line version, invoke the `htmltojsx` command:

```
$ htmltojsx --help
Converts HTML to JSX for use with React.
Usage: htmltojsx [-c ComponentName] file.htm

Examples:
  htmltojsx -c AwesomeComponent awesome.htm    Creates React component "AwesomeComponent" based on awesome.htm


Options:
  --className, -c  Create a React component (wraps JSX in React.createClass call)
  --help           Show help
```

To use the Node.js module, `require('htmltojsx')` and create a new instance. This is the same interface as the web-based version:

```
var HTMLtoJSX = require('htmltojsx');
var converter = new HTMLtoJSX({
  createClass: true,
  outputClassName: 'AwesomeComponent'
});
var output = converter.convert('<div>Hello world!</div>');
```

Changelog
=========
0.2.4 - 6th August 2015
-----------------------
 - [#31](https://github.com/reactjs/react-magic/issues/31) - Fixed `jsdom`
   dependency

0.2.3 - 5th August 2015
-----------------------
 - [#8](https://github.com/reactjs/react-magic/issues/8) - Handle 
   case-insensitive attributes and style names
 - [#29](https://github.com/reactjs/react-magic/pull/29) - Switch to 
   `jsdom-no-contextify` to support older versions of Node.js
 - 
0.2.2 - 4th May 2015
--------------------
 - [#21](https://github.com/reactjs/react-magic/issues/21) - Allow output of 
   React classes without class name
 - [#25](https://github.com/reactjs/react-magic/pull/25) - Update version of 
   JSDOM

0.2.1 - 1st February 2015
-------------------------
 - [#10](https://github.com/reactjs/react-magic/pull/10) - Handle inline CSS
   shorthand style values
 - [#13](https://github.com/reactjs/react-magic/pull/13) - Maintain valueless
   attributes handled by JSX
 - [#15](https://github.com/reactjs/react-magic/pull/15) - Use uncontrolled
   input fields so they can still be edited
 - [#11](https://github.com/reactjs/react-magic/issues/11) - Ensure HTML
   entities are handled correctly

0.2.0 - 7th September 2014
--------------------------
 - Initial release
