/**
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

describe('htmltojsx', function() {
  it('should handle basic HTML', function() {
    var converter = new HTMLtoJSX({ createClass: false });
    expect(converter.convert('<div>Hello world!</div>').trim())
      .toBe('<div>Hello world!</div>');
  });

  it('should handle HTML comments', function() {
    var converter = new HTMLtoJSX({ createClass: false });
    expect(converter.convert('<!-- Hello World -->').trim())
      .toBe('{/* Hello World */}');
  });

  it('should convert tags to lowercase', function() {
    var converter = new HTMLtoJSX({ createClass: false });
    expect(converter.convert('<DIV>Hello world!</DIV>').trim())
      .toBe('<div>Hello world!</div>');
  });

  it('should strip single-line script tag', function() {
    var converter = new HTMLtoJSX({ createClass: false });
    expect(converter.convert('<div>foo<script>lol</script>bar</div>').trim())
      .toBe('<div>foobar</div>');
  });

  it('should strip multi-line script tag', function() {
    var converter = new HTMLtoJSX({ createClass: false });
    expect(converter.convert(
'<div>foo<script>\n' +
'lol\n' +
'lolz\n' +
'</script>bar</div>').trim())
      .toBe('<div>foobar</div>');
  });

  it('should create a new React component', function() {
    var converter = new HTMLtoJSX({
      createClass: true,
      outputClassName: 'FooComponent'
    });
    var result = converter.convert('<div>Hello world!</div>');
    expect(result).toBe(
      'var FooComponent = React.createClass({\n' +
      '  render: function() {\n' +
      '    return (\n' +
      '\n' +
      '      <div>Hello world!</div>\n' +
      '    );\n' +
      '  }\n' +
      '});'
    );
  });

  it('should wrap HTML with a div when multiple top-level', function() {
    var converter = new HTMLtoJSX({
      createClass: true,
      outputClassName: 'FooComponent'
    });
    var result = converter.convert('<span>1</span><span>2</span>');
    expect(result).toBe([
      'var FooComponent = React.createClass({',
      '  render: function() {',
      '    return (',
      '      <div>',
      '        <span>1</span><span>2</span>',
      '      </div>',
      '    );',
      '  }',
      '});'
    ].join('\n'));
  });

  describe('Attribute transformations', function() {
    it('should convert basic "style" attributes', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div style="color: red">Test</div>').trim())
        .toBe('<div style={{color: \'red\'}}>Test</div>');
    });

    it('should convert numeric "style" attributes', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div style="width: 100px">Test</div>').trim())
        .toBe('<div style={{width: 100}}>Test</div>');
    });

    it('should convert dashed "style" attributes', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div style="font-size: 12pt">Test</div>').trim())
        .toBe('<div style={{fontSize: \'12pt\'}}>Test</div>');
    });

    it('should convert "class" attribute', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div class="awesome">Test</div>').trim())
        .toBe('<div className="awesome">Test</div>');
    });

    it('should convert "for" attribute', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<label for="potato">Test</label>').trim())
        .toBe('<label htmlFor="potato">Test</label>');
    });
  });
});
