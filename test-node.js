var HTMLtoJSX = require('../');
var converter = new HTMLtoJSX();
console.log(converter.convert('<div>&lt;</div>'));
