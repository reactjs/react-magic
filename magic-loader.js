/**!
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant 
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/*
// Minified
javascript:(function(b){function c(){if(0!==d.length){var e=d.shift(),a=b.createElement("script");a.src=e;a.onload=c;b.body.appendChild(a)}}var d=["http://facebook.github.io/react/js/react.min.js","http://facebook.github.io/react/js/JSXTransformer.js","http://facebook.github.io/react/js/html-jsx-lib.js","http://daniel15.github.io/react-magic/magic.js"];c();return!1})(document);
*/

(function(document) {
  var scripts = [
    'http://facebook.github.io/react/js/react.min.js', 
    'http://facebook.github.io/react/js/JSXTransformer.js',
    'http://facebook.github.io/react/js/html-jsx-lib.js',
    'http://daniel15.github.io/react-magic/magic.js'
  ];

  // Sometimes Chrome was loading the scripts in the wrong order (lolwat)
  // We need to enforce order, so manually chain the loading.
  function loadNext() {
    if (scripts.length === 0) {
      return;
    }
    var nextScript = scripts.shift();
    var script = document.createElement('script');
    script.src = nextScript;
    script.onload = loadNext;
    document.body.appendChild(script);
  }
  loadNext();

  return false;
})(document);