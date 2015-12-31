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
console.log('test')
/////////////////////////////////
// DIRECT INSERT OF HTML2JSX
/////////////////////////////////
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):"object"==typeof exports?exports.HTMLtoJSX=e():t.HTMLtoJSX=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){/** @preserve
   *  Copyright (c) 2014, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   *
   */
"use strict";function i(t,e){if(1===e)return t;if(0>e)throw new Error;for(var n="";e;)1&e&&(n+=t),(e>>=1)&&(t+=t);return n}function r(t,e){return t.slice(-e.length)===e}function o(t,e){return r(t,e)?t.slice(0,-e.length):t}function s(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})}function a(t){return!/[^\s]/.test(t)}function u(t){return/^\d+px$/.test(t)}function l(t){return void 0!==t&&null!==t&&("number"==typeof t||parseInt(t,10)==t)}function c(t){return _.textContent=t,_.innerHTML}var h={ELEMENT:1,TEXT:3,COMMENT:8},d={"for":"htmlFor","class":"className"},p={input:{checked:"defaultChecked",value:"defaultValue"}},f=n(1);for(var m in f.Properties)if(f.Properties.hasOwnProperty(m)){var g=f.DOMAttributeNames[m]||m.toLowerCase();d[g]||(d[g]=m)}var E;E=function(t){return document.createElement(t)};var _=E("div"),v=function(t){this.config=t||{},void 0===this.config.createClass&&(this.config.createClass=!0),this.config.indent||(this.config.indent="  ")};v.prototype={reset:function(){this.output="",this.level=0,this._inPreTag=!1},convert:function(t){this.reset();var e=E("div");return e.innerHTML="\n"+this._cleanInput(t)+"\n",this.config.createClass&&(this.output=this.config.outputClassName?"var "+this.config.outputClassName+" = React.createClass({\n":"React.createClass({\n",this.output+=this.config.indent+"render: function() {\n",this.output+=this.config.indent+this.config.indent+"return (\n"),this._onlyOneTopLevel(e)?this._traverse(e):(this.output+=this.config.indent+this.config.indent+this.config.indent,this.level++,this._visit(e)),this.output=this.output.trim()+"\n",this.config.createClass&&(this.output+=this.config.indent+this.config.indent+");\n",this.output+=this.config.indent+"}\n",this.output+="});"),this.output},_cleanInput:function(t){return t=t.trim(),t=t.replace(/<script([\s\S]*?)<\/script>/g,"")},_onlyOneTopLevel:function(t){if(1===t.childNodes.length&&t.childNodes[0].nodeType===h.ELEMENT)return!0;for(var e=!1,n=0,i=t.childNodes.length;i>n;n++){var r=t.childNodes[n];if(r.nodeType===h.ELEMENT){if(e)return!1;e=!0}else if(r.nodeType===h.TEXT&&!a(r.textContent))return!1}return!0},_getIndentedNewline:function(){return"\n"+i(this.config.indent,this.level+2)},_visit:function(t){this._beginVisit(t),this._traverse(t),this._endVisit(t)},_traverse:function(t){this.level++;for(var e=0,n=t.childNodes.length;n>e;e++)this._visit(t.childNodes[e]);this.level--},_beginVisit:function(t){switch(t.nodeType){case h.ELEMENT:this._beginVisitElement(t);break;case h.TEXT:this._visitText(t);break;case h.COMMENT:this._visitComment(t);break;default:console.warn("Unrecognised node type: "+t.nodeType)}},_endVisit:function(t){switch(t.nodeType){case h.ELEMENT:this._endVisitElement(t);break;case h.TEXT:case h.COMMENT:}},_beginVisitElement:function(t){for(var e=t.tagName.toLowerCase(),n=[],i=0,r=t.attributes.length;r>i;i++)n.push(this._getElementAttribute(t,t.attributes[i]));"textarea"===e&&n.push("defaultValue={"+JSON.stringify(t.value)+"}"),"style"===e&&n.push("dangerouslySetInnerHTML={{__html: "+JSON.stringify(t.textContent)+" }}"),"pre"===e&&(this._inPreTag=!0),this.output+="<"+e,n.length>0&&(this.output+=" "+n.join(" ")),this._isSelfClosing(t)||(this.output+=">")},_endVisitElement:function(t){var e=t.tagName.toLowerCase();this.output=o(this.output,this.config.indent),this.output+=this._isSelfClosing(t)?" />":"</"+t.tagName.toLowerCase()+">","pre"===e&&(this._inPreTag=!1)},_isSelfClosing:function(t){return!t.firstChild||"textarea"===t.tagName.toLowerCase()||"style"===t.tagName.toLowerCase()},_visitText:function(t){var e=t.parentNode&&t.parentNode.tagName.toLowerCase();if("textarea"!==e&&"style"!==e){var n=c(t.textContent);this._inPreTag?n=n.replace(/\r/g,"").replace(/( {2,}|\n|\t|\{|\})/g,function(t){return"{"+JSON.stringify(t)+"}"}):n.indexOf("\n")>-1&&(n=n.replace(/\n\s*/g,this._getIndentedNewline())),this.output+=n}},_visitComment:function(t){this.output+="{/*"+t.textContent.replace("*/","* /")+"*/}"},_getElementAttribute:function(t,e){switch(e.name){case"style":return this._getStyleAttribute(e.value);default:var n=t.tagName.toLowerCase(),i=p[n]&&p[n][e.name]||d[e.name]||e.name,r=i;return l(e.value)?r+="={"+e.value+"}":e.value.length>0&&(r+='="'+e.value.replace('"',"&quot;")+'"'),r}},_getStyleAttribute:function(t){var e=new S(t).toJSXString();return"style={{"+e+"}}"}};var S=function(t){this.parse(t)};S.prototype={parse:function(t){this.styles={},t.split(";").forEach(function(t){t=t.trim();var e=t.indexOf(":"),n=t.substr(0,e),i=t.substr(e+1).trim();""!==n&&(n=n.toLowerCase(),this.styles[n]=i)},this)},toJSXString:function(){var t=[];for(var e in this.styles)this.styles.hasOwnProperty(e)&&t.push(this.toJSXKey(e)+": "+this.toJSXValue(this.styles[e]));return t.join(", ")},toJSXKey:function(t){return/^-ms-/.test(t)&&(t=t.substr(1)),s(t)},toJSXValue:function(t){return l(t)?t:u(t)?o(t,"px"):"'"+t.replace(/'/g,'"')+"'"}},t.exports=v},function(t,e,n){"use strict";var i,r=n(2),o=n(3),s=r.injection.MUST_USE_ATTRIBUTE,a=r.injection.MUST_USE_PROPERTY,u=r.injection.HAS_BOOLEAN_VALUE,l=r.injection.HAS_SIDE_EFFECTS,c=r.injection.HAS_NUMERIC_VALUE,h=r.injection.HAS_POSITIVE_NUMERIC_VALUE,d=r.injection.HAS_OVERLOADED_BOOLEAN_VALUE;if(o.canUseDOM){var p=document.implementation;i=p&&p.hasFeature&&p.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")}var f={isCustomAttribute:RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),Properties:{accept:null,acceptCharset:null,accessKey:null,action:null,allowFullScreen:s|u,allowTransparency:s,alt:null,async:u,autoComplete:null,autoPlay:u,cellPadding:null,cellSpacing:null,charSet:s,checked:a|u,classID:s,className:i?s:a,cols:s|h,colSpan:null,content:null,contentEditable:null,contextMenu:s,controls:a|u,coords:null,crossOrigin:null,data:null,dateTime:s,defer:u,dir:null,disabled:s|u,download:d,draggable:null,encType:null,form:s,formAction:s,formEncType:s,formMethod:s,formNoValidate:u,formTarget:s,frameBorder:s,headers:null,height:s,hidden:s|u,high:null,href:null,hrefLang:null,htmlFor:null,httpEquiv:null,icon:null,id:a,label:null,lang:null,list:s,loop:a|u,low:null,manifest:s,marginHeight:null,marginWidth:null,max:null,maxLength:s,media:s,mediaGroup:null,method:null,min:null,multiple:a|u,muted:a|u,name:null,noValidate:u,open:u,optimum:null,pattern:null,placeholder:null,poster:null,preload:null,radioGroup:null,readOnly:a|u,rel:null,required:u,role:s,rows:s|h,rowSpan:null,sandbox:null,scope:null,scoped:u,scrolling:null,seamless:s|u,selected:a|u,shape:null,size:s|h,sizes:s,span:h,spellCheck:null,src:null,srcDoc:a,srcSet:s,start:c,step:null,style:null,tabIndex:null,target:null,title:null,type:null,useMap:null,value:a|l,width:s,wmode:s,autoCapitalize:null,autoCorrect:null,itemProp:s,itemScope:s|u,itemType:s,itemID:s,itemRef:s,property:null,unselectable:s},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMPropertyNames:{autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoCorrect:"autocorrect",autoFocus:"autofocus",autoPlay:"autoplay",encType:"encoding",hrefLang:"hreflang",radioGroup:"radiogroup",spellCheck:"spellcheck",srcDoc:"srcdoc",srcSet:"srcset"}};t.exports=f},function(t,e,n){"use strict";function i(t,e){return(t&e)===e}var r=n(4),o={MUST_USE_ATTRIBUTE:1,MUST_USE_PROPERTY:2,HAS_SIDE_EFFECTS:4,HAS_BOOLEAN_VALUE:8,HAS_NUMERIC_VALUE:16,HAS_POSITIVE_NUMERIC_VALUE:48,HAS_OVERLOADED_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(t){var e=t.Properties||{},n=t.DOMAttributeNames||{},s=t.DOMPropertyNames||{},u=t.DOMMutationMethods||{};t.isCustomAttribute&&a._isCustomAttributeFunctions.push(t.isCustomAttribute);for(var l in e){r(!a.isStandardName.hasOwnProperty(l)),a.isStandardName[l]=!0;var c=l.toLowerCase();if(a.getPossibleStandardName[c]=l,n.hasOwnProperty(l)){var h=n[l];a.getPossibleStandardName[h]=l,a.getAttributeName[l]=h}else a.getAttributeName[l]=c;a.getPropertyName[l]=s.hasOwnProperty(l)?s[l]:l,a.getMutationMethod[l]=u.hasOwnProperty(l)?u[l]:null;var d=e[l];a.mustUseAttribute[l]=i(d,o.MUST_USE_ATTRIBUTE),a.mustUseProperty[l]=i(d,o.MUST_USE_PROPERTY),a.hasSideEffects[l]=i(d,o.HAS_SIDE_EFFECTS),a.hasBooleanValue[l]=i(d,o.HAS_BOOLEAN_VALUE),a.hasNumericValue[l]=i(d,o.HAS_NUMERIC_VALUE),a.hasPositiveNumericValue[l]=i(d,o.HAS_POSITIVE_NUMERIC_VALUE),a.hasOverloadedBooleanValue[l]=i(d,o.HAS_OVERLOADED_BOOLEAN_VALUE),r(!a.mustUseAttribute[l]||!a.mustUseProperty[l]),r(a.mustUseProperty[l]||!a.hasSideEffects[l]),r(!!a.hasBooleanValue[l]+!!a.hasNumericValue[l]+!!a.hasOverloadedBooleanValue[l]<=1)}}},s={},a={ID_ATTRIBUTE_NAME:"data-reactid",isStandardName:{},getPossibleStandardName:{},getAttributeName:{},getPropertyName:{},getMutationMethod:{},mustUseAttribute:{},mustUseProperty:{},hasSideEffects:{},hasBooleanValue:{},hasNumericValue:{},hasPositiveNumericValue:{},hasOverloadedBooleanValue:{},_isCustomAttributeFunctions:[],isCustomAttribute:function(t){for(var e=0;e<a._isCustomAttributeFunctions.length;e++){var n=a._isCustomAttributeFunctions[e];if(n(t))return!0}return!1},getDefaultValueForProperty:function(t,e){var n,i=s[t];return i||(s[t]=i={}),e in i||(n=document.createElement(t),i[e]=n[e]),i[e]},injection:o};t.exports=a},function(t){"use strict";var e=!("undefined"==typeof window||!window.document||!window.document.createElement),n={canUseDOM:e,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:e&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:e&&!!window.screen,isInWorker:!e};t.exports=n},function(t){"use strict";var e=function(t,e,n,i,r,o,s,a){if(!t){var u;if(void 0===e)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,i,r,o,s,a],c=0;u=new Error("Invariant Violation: "+e.replace(/%s/g,function(){return l[c++]}))}throw u.framesToPop=1,u}};t.exports=e}])});
var converter;
///////////////////////////////////////////////////



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
  React.render(processed, document.body);
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
