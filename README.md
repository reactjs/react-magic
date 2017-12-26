React-Magic and HTMLtoJSX
=========================

React-Magic is an experimental library that uses the power of Facebook's
[React](http://facebook.github.io/react/) library to inject AJAX-loading
goodness into plain old HTML webpages, without having to write any custom
JavaScript. You can even use CSS transitions between the pages. Simply add a
single script tag (or click a bookmarklet) and "it just works".

[HTMLtoJSX](README-htmltojsx.md) is a component of React-Magic that converts
HTML to JSX. It can be used standalone, either on the web or via Node.js.

Under the covers
================

React-Magic intercepts all navigation (link clicks and form posts) and loads
the requested page via an AJAX request. React is then used to "diff" the old
HTML with the new HTML, and only update the parts of the DOM that have been
changed.

Demos
=====

* [Page transitions](http://stuff.dan.cx/facebook/react-hacks/magic/red.php)
* [Form submission](http://stuff.dan.cx/facebook/react-hacks/magic/feedback1.htm)

Usage
=====

To use React-Magic, add a `<script>` tag to the bottom of your page, right above
the `</body>`:

```html
<script src="http://magic.reactjs.net/magic-loader.js"></script>
```

This handles loading all the required scripts. Alternatively, you can put all
the required scripts instead:

```html
<script src="http://fb.me/react-0.13.3.min.js"></script>
<script src="http://fb.me/JSXTransformer-0.13.3.js"></script>
<script src="http://magic.reactjs.net/magic.min.js"></script>
```

The end result is the same.

A fun party trick is adding a bookmarklet to your browser which can be used to
Reactify *any* plain HTML site. Click it and mystify your friends:

```javascript
javascript:(function(b){function c(){if(0!==d.length){var e=d.shift(),a=b.createElement("script");a.src=e;a.onload=c;b.body.appendChild(a)}}var d=["http://fb.me/react-0.13.3.min.js","http://fb.me/JSXTransformer-0.13.3.js","http://magic.reactjs.net/magic.min.js"];c();return!1})(document);
```

This just loads the same scripts as referenced above.

Caveat Emptor
=============
Even magic comes with its limitations. Since this project is experimental, it may not
work properly in all browsers. If you're looking for something that works in
IE6, you've come to the wrong place.

Development
===========
Run `gulp watch` from the root to automatically rebuild the compiled JavaScript
files as you edit them. To run the unit tests, point a web server to 
`build/site` then navigate to `test.htm`. If you use the LiveReload browser 
extension, the tests will automatically reload and rerun when you modify any of 
the JavaScript.

Similar Projects
================
This project has been inspired by the
[Ajaxify](https://github.com/browserstate/ajaxify) project, which achieves a
similar outcome but using jQuery. What makes React-Magic different is that it
only updates the DOM nodes that have changed, whereas Ajaxify and similar
solutions just blow away the whole document.body on every page load.
