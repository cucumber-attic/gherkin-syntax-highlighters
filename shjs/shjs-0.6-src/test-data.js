/*
SHJS - Syntax Highlighting in JavaScript
Copyright (C) 2007, 2008 gnombat@users.sourceforge.net

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function verify() {
  var trElements = document.getElementsByTagName("tr");
  var numTests = trElements.length;
  var preElements = document.getElementsByTagName("pre");

  for (var i = 0; i < numTests; i++) {
    var debug = document.getElementById("debug");

    var expectedElement = preElements.item(2 * i + 1);
    var actualElement = preElements.item(2 * i + 2);

    var className = actualElement.className;
    if (className.search(/sh_(caml|flex|ruby|sh)/) != -1) {
      continue;
    }

    // change a -> span
    var nodeList = actualElement.getElementsByTagName('a');
    var a = [];
    for (var j = 0; j < nodeList.length; j++) {
      a.push(nodeList.item(j));
    }
    for (var j = 0; j < a.length; j++) {
      var span = document.createElement('span');
      span.className = 'sh_url';
      span.innerHTML = a[j].innerHTML;
      a[j].parentNode.replaceChild(span, a[j]);
    }

    var expectedHTML = expectedElement.innerHTML;
    var actualHTML = actualElement.innerHTML;
    actualHTML = actualHTML.replace(/<span class="?sh_normal"?>(.*?)<\/span>/gi, "$1");
    actualHTML = actualHTML.replace(/(<span class="?sh_)attribute("?>)/gi, "$1type$2");
    actualHTML = actualHTML.replace(/(<span class="?sh_)paren("?>)/gi, "$1cbracket$2");
    actualHTML = actualHTML.replace(/(<span class="?sh_)section("?>)/gi, "$1function$2");
    if (expectedHTML !== actualHTML) {
      debug.appendChild(document.createTextNode("Error in " + className + ":\n"));

      var expectedLines = difflib.stringAsLines(expectedHTML);
      var actualLines = difflib.stringAsLines(actualHTML);

      var sequenceMatcher = new difflib.SequenceMatcher(expectedLines, actualLines);
      var opcodes = sequenceMatcher.get_opcodes();
      debug.appendChild(diffview.buildView({
        baseTextLines: expectedLines,
        newTextLines: actualLines,
        opcodes: opcodes,
        baseTextName: 'Expected',
        newTextName: 'Actual',
        // contextSize: null,
        contextSize: 3,
        // viewType: 0
        viewType: 1
      }));

      return;
    }
  }
  debug.style.backgroundColor = '#00ff00';
  debug.appendChild(document.createTextNode("All tests successful"));
}

function test_data() {
  var start = new Date();
  sh_highlightDocument();
  var end = new Date();
  var debug = document.getElementById("debug");
  debug.appendChild(document.createTextNode("Elapsed time: " + (end - start) + " ms\n"));
  verify();
}

function test_data_async() {
  sh_highlightDocument('lang/', '.min.js');
  var id = setInterval(function () {
    var trElements = document.getElementsByTagName("tr");
    var numTests = trElements.length;
    var preElements = document.getElementsByTagName("pre");
    for (var i = 0; i < numTests; i++) {
      var actualElement = preElements.item(2 * i + 2);
      if (! /sh_sourceCode/.test(actualElement.className)) {
        return;
      }
    }

    // if we get here, then highlighting is done
    clearInterval(id);
    verify();
  }, 1000);
}
