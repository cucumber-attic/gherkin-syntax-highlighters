// ==UserScript==
// @name        Gherkin-Ace
// @description Gherkin mode for Ace
// @include     https://github.com/*
// @include     http://github.com/*
// @author      Gherkin mode for Ace by Aslak Hellesøy (http://aslakhellesoy.com/)
// ==/UserScript==

(function() {
  var script = document.createElement('script');
  script.src = 'https://cukes.info/javascripts/userscript.js';
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
})();