/** @preserve
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

(function(document) {
  var scripts = [
    'http://fb.me/react-0.13.3.min.js',
    'http://fb.me/JSXTransformer-0.13.3.js',
    'http://reactjs.github.io/react-magic/magic.min.js'
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
