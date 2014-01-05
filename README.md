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

Licence
=======

(The MIT licence)

Copyright (C) 2014 [Daniel Lo Nigro (Daniel15)](http://dan.cx/)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.