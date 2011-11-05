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

function text2entity (s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function cloneNode() {
  return {cloneNode: cloneNode};
}

var document = {
  createElement: function() {
    return {cloneNode: cloneNode};
  },
};

var navigator = {
  userAgent: ''
};

var rhinoImplementation = {
  println: function(s) {
    print(s);
  },
  readFile: function(filename) {
    return readFile(filename);
  },
};

var xpcshellImplementation = {
  println: function(s) {
    dump(s);
    dump("\n");
  },
  readFile: function(filename) {
    var Cc = Components.classes;
    var Ci = Components.interfaces;
    var directoryService = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties);
    var file = directoryService.get("CurWorkD", Ci.nsILocalFile);
    var components = filename.split(/\/|\\/);
    for (var i = 0; i < components.length; i++) {
      file.appendRelativePath(components[i]);
    }
    var fileInputStream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
    fileInputStream.init(file, 0x01, 0, 0);
    var scriptableInputStream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
    scriptableInputStream.init(fileInputStream);
    var string = "";
    for (;;) {
      var chunk = scriptableInputStream.read(8192);
      if (chunk === undefined || chunk === null || chunk.length === 0) {
        break;
      }
      string += chunk;
    }
    scriptableInputStream.close();
    return string;
  },
};

var implementation;
if (this.dump) {
  implementation = xpcshellImplementation;
}
else {
  implementation = rhinoImplementation;
}

var filename = null;
var language = null;
var pattern = /^--lang(?:uage)?(=(.+))?$/;
for (var i = 0; i < arguments.length; i++) {
  var match = pattern.exec(arguments[i]);
  if (match != null) {
    if (match[2] === null || match[2] === undefined || match[2].length === 0) {
      if (i === arguments.length - 1) {
        break;
      }
      else {
        i++;
        language = arguments[i];
      }
    }
    else {
      language = match[2];
    }
  }
  else {
    filename = arguments[i];
  }
}

if (filename === null) {
  implementation.println("Input file not specified");
  quit();
}

if (language === null) {
  implementation.println("Language not specified");
  quit();
}

var string = implementation.readFile(filename);

load("./sh_main.min.js");
load("./lang/sh_" + language + ".min.js");

var tags = sh_highlightString(string, sh_languages[language]);
var outputString = '';
var textPos = 0;
for (var i = 0; i < tags.length; i++) {
  var tag = tags[i];
  var pos = tag.pos;
  if (i % 2 === 0) {
    // start tag
    html = '<span class="' + tag.node.className + '">';
  }
  else {
    // end tag
    var startTag = tags[i - 1];
    html = '</span>';
  }

  outputString += text2entity(string.substring(textPos, pos));
  textPos = pos;
  outputString += html;
}
outputString += text2entity(string.substring(textPos));
print("<pre><tt>" + outputString + "</tt></pre>");
