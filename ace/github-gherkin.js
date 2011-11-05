var GherkinMode = require('ace/mode/gherkin').Mode;
var editor = window.editor.ace;
editor.getSession().setMode(new GherkinMode());
