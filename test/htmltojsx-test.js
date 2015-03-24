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

  it('should create a new React without var name', function() {
    var converter = new HTMLtoJSX({
      createClass: true
    });
    var result = converter.convert('<div>Hello world!</div>');
    expect(result).toBe(
      'React.createClass({\n' +
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

  describe('escaped characters', function() {
    it('should handle escaped < symbols', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div>&lt;</div>').trim())
        .toBe('<div>&lt;</div>');
    });

    it('should handle unescaped copyright symbols', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div>©</div>').trim())
        .toBe('<div>©</div>');
    });
  });

  describe('Attribute transformations', function() {
    it('should convert basic "style" attributes', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div style="color: red">Test</div>').trim())
        .toBe('<div style={{color: \'red\'}}>Test</div>');
    });

    it('should convert CSS shorthand "style" values', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<div style="padding: 10px 15px 20px 25px;">Test</div>').trim())
        .toBe('<div style={{padding: \'10px 15px 20px 25px\'}}>Test</div>');
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

    it('should maintain value-less attributes', function() {
      var converter = new HTMLtoJSX({ createClass: false });
      expect(converter.convert('<input disabled>').trim())
        .toBe('<input disabled />');
    });

    it('should set <input> "value" to "defaultValue" to allow input editing', function() {
      var converter = new HTMLtoJSX({ createClass: false });
        expect(converter.convert('<input value="Darth Vader">').trim())
          .toBe('<input defaultValue="Darth Vader" />');
    });

    it('should not set "value" to "defaultValue" for non-<input> elements', function() {
      var converter = new HTMLtoJSX({ createClass: false });
        expect(converter.convert('<select><option value="Hans"></select>').trim())
          .toBe('<select><option value="Hans" /></select>');
    });

    it('should set <input> "checked" to "defaultChecked" to allow box checking', function() {
      var converter = new HTMLtoJSX({ createClass: false });
        expect(converter.convert('<input type="checkbox" checked>').trim())
          .toBe('<input type="checkbox" defaultChecked />');
    });
  });
});
