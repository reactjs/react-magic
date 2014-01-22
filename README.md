React-Magic
===========

React-Magic is an experimental library that uses the power of Facebook's awesome 
[React](http://facebook.github.io/react/) library to inject AJAX-loading 
goodness into plain old HTML webpages, without having to write any custom 
JavaScript. You can even use CSS transitions between the pages. Simply add a 
single script tag (or click a bookmarklet) and it "just works". 

It's magic!

But how?!
=========

React-Magic intercepts all navigation (link clicks and form posts) and loads 
the requested page via an AJAX request. React is then used to "diff" the old
HTML with the new HTML, and only update the parts of the DOM that have been 
changed.

No way!
=======
Yes way. Take a look at the 
[page transitions](http://stuff.dan.cx/facebook/react-hacks/magic/red.php) and 
[form submission](http://stuff.dan.cx/facebook/react-hacks/magic/feedback1.htm)
demos.

OMG I WANT IT
=============

To use React-Magic, add a `<script>` tag to the bottom of your page, right above
the `</body>`:

```html
<script src="http://reactjs.github.io/react-magic/magic-loader.js"></script>
```

This handles loading all the required scripts. Alternatively, you can put all 
the required scripts instead:

```html
<script src="http://facebook.github.io/react/js/react.min.js"></script> 
<script src="http://facebook.github.io/react/js/JSXTransformer.js"></script>
<script src="http://facebook.github.io/react/js/html-jsx-lib.js"></script>
<script src="http://reactjs.github.io/react-magic/magic.js"></script>
```

The end result is the same.

A fun party trick is adding a bookmarklet to your browser which can be used to
Reactify *any* plain HTML site. Click it and mystify your friends:

```javascript
javascript:(function(b){function c(){if(0!==d.length){var e=d.shift(),a=b.createElement("script");a.src=e;a.onload=c;b.body.appendChild(a)}}var d=["http://facebook.github.io/react/js/react.min.js","http://facebook.github.io/react/js/JSXTransformer.js","http://facebook.github.io/react/js/html-jsx-lib.js","http://reactjs.github.io/react-magic/magic.js"];c();return!1})(document);
```

This just loads the same scripts as referenced above.

Caveat Emptor
=============
Even magic comes with its limitations. Since this is experimental, it may not 
work properly in all browsers. If you're looking for something that works in 
IE6, you've come to the wrong place.

Similar Projects
================
This project has been inspired by the 
[Ajaxify](https://github.com/browserstate/ajaxify) project, which achieves a
similar outcome but using jQuery. What makes React-Magic different is that it 
only updates the DOM nodes that have changed, whereas Ajaxify and similar 
solutions just blow away the whole document.body on every page load.

License
=======
BSD License for React-Magic

Copyright (c) 2014, Facebook, Inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
 * Neither the name Facebook nor the names of its contributors may be used to
   endorse or promote products derived from this software without specific
   prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
