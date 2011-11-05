// ==UserScript==
// @name        Github-Gherkin
// @description Gherkin editor for GitHub
// @include     https://github.com/*
// @include     http://github.com/*
// @author      Gherkin editor for GitHub by Aslak Hellesøy (http://aslakhellesoy.com/)
// ==/UserScript==

// Are we editing a .feature file?
if(document.location.pathname.match(/\/edit\/.*\.feature$/)) {
    (function() {
        // Loading scripts this way allows them to access the javascript objects.
        var script;

        script = document.createElement('script');
        script.src = 'http://localhost:3001/ace/github-gherkin.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);

        script = document.createElement('script');
        script.src = 'http://localhost:3001/ace/mode-gherkin.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    })();
}