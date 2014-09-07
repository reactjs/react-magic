/** @preserve
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

var HTMLtoJSX = require('./htmltojsx');

var converter;

var ALLOWED_CONTENT_TYPES = ['text/html', 'text/plain'];

/**
 * Does an AJAX load of the specified URL.
 *
 * @param {String} url        URL to load
 * @param {Object} rawData    Object containing data to send in request. If
 *                            specified, a post is done. Otherwise, a get is
 *                            done.
 * @param {Function} callback Function to call once request returns
 */
function load(url, rawData, callback) {
  var xhr = new XMLHttpRequest();
  var data;
  if (rawData) {
    // Assume anything with data is a POST request
    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    data = Object.keys(rawData)
      .map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(rawData[key]);
      })
      .join('&');
  } else {
    // No data, use a GET request
    xhr.open('get', url + '?cachebust=' + Date.now(), true);
  }

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.responseText, xhr);
    }
  }
  xhr.send(data);
  return xhr;
}

/**
 * Creates a React component from the specified HTML. First converts the HTML
 * to JSX, then executes the JSX to create the virtual DOM.
 *
 * @param {String} html HTML to convert
 * @return {Object} React virtual DOM representation
 */
function reactComponentFromHTML(html) {
  var jsx = '/** @jsx React.DOM */ ' + converter.convert(html);
  try {
    return JSXTransformer.exec(jsx);
  } catch (ex) {
    throw new Error('Something bad happened when transforming HTML to JSX: ' + ex);
    console.log(jsx);
    window.location.reload()
  }
}

/**
 * Renders the specified HTML to the body, by converting it to a React
 * component then rendering the component. Rather than blowing away and
 * overwriting the body, React will handle state transition from the existing
 * state to the new state.
 *
 * @param {String} html HTML to render
 */
function render(html) {
  var processed = reactComponentFromHTML(html);
  React.renderComponent(processed, document.body);
}

/**
 * Handles a click event on the body. Uses pushState to change the current
 * page state, and trigger the AJAX load of the next page.
 *
 * @param {MouseEvent} event
 */
function handleClick(event) {
  // We only care about clicks on links
  if (
    !event.target
    || !event.target.tagName
    || event.target.tagName.toLowerCase() != 'a'
  ) {
    return;
  }
  history.pushState(null, null, event.target.href);
  handleStateChange();
  event.preventDefault();
}

/**
 * Handles a form submission. For now, assumes all forms are POST forms.
 *
 * @param {Event} event
 */
function handleSubmit(event) {
  var formValues = serialiseForm(event.target);
  history.pushState({ formValues: formValues }, null, event.target.action);
  handleStateChange();
  event.preventDefault();
}

/**
 * Called when the page state is changed, either through clicking a link,
 * submitting a form, or the user using the browser's Back/Forward navigation
 */
function handleStateChange() {
  document.title = 'Loading...';
  document.body.classList.add('react-loading');
  load(
    window.location.href,
    history.state && history.state.formValues,
    loadComplete
  );
}

/**
 * Called when a page is successfully AJAX loaded.
 *
 * @param {String} content Response from the server
 * @param {XMLHttpRequest} xhr
 */
function loadComplete(content, xhr) {
  // Force a full page load if it's not a compatible content type or a
  // non-2xx status code
  var contentType = xhr.getResponseHeader('Content-Type').split(';')[0];
  var shouldDoFullLoad =
    ALLOWED_CONTENT_TYPES.indexOf(contentType) === -1 ||
    xhr.status < 200 ||
    xhr.status > 299;
  if (shouldDoFullLoad) {
    window.location.reload();
    return;
  }

  var body = getTagContent(content, 'body');
  var title = getTagContent(content, 'title');
  document.title = title;
  render(body);
  document.body.classList.remove('react-loading');
}

/**
 * Serlialises all the fields in the specified form, for posting in an AJAX
 * request.
 *
 * @param {FormElement} form
 * @return {Object} Form data
 */
function serialiseForm(form) {
  var values = {};
  var inputs = form.getElementsByTagName('input');
  for (var i = 0, count = inputs.length; i < count; i++) {
    var input = inputs[i];
    // Ignore unselected checkboxes or radio buttons
    if ((input.type === 'checkbox' || input.type === 'radio') && !input.checked) {
      continue;
    }
    values[inputs[i].name] = inputs[i].value;
  }
  return values;
}

/**
 * Ugly hacky way to find the body of the response. ಠ_ಠ
 *
 * @param {String} content Response from the server
 * @param {String} tag     HTML tag to look for
 * @return {String} Content contained within the specified HTML tag
 */
function getTagContent(content, tag) {
  var tagStart = '<' + tag;
  var tagEnd = '</' + tag;
  var tagStartPos = content.indexOf(tagStart);
  var tagStartPos2 = content.indexOf('>', tagStartPos);
  var tagEndPos = content.lastIndexOf(tagEnd);

  var tagContent = content.slice(tagStartPos2 + 1, tagEndPos);
  return tagContent;
}

/**
 * Initialise the magic.
 */
function init() {
  converter = new HTMLtoJSX({
    createClass: false
  });
  var initialHTML = document.body.innerHTML;

  // Re-render existing content using React, so state transitions work
  // correctly.
  render(initialHTML);
  // Temporary hack
  // TODO: Figure out why doing this twice behaves slightly
  // differently (extra DIV wrapper for first render??)
  render(initialHTML);

  initEvents();
}

function initEvents() {
  document.body.addEventListener('click', handleClick, false);
  document.body.addEventListener('submit', handleSubmit, false);
  window.addEventListener('popstate', handleStateChange, false);
}

init();
