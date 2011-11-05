Organization
*************

source-highlight-lang/
  Contains language definitions taken from the program "source-highlight".  These
  are converted to JavaScript and placed in lang/.
sh2js.pl, JavaScript/, Regex/, SourceHighlight/
  Converts source-highlight language definitions to JavaScript.
highlight-themes/
  Highlighting themes from the program "highlight".  These are converted to CSS
  and placed in css/.
h2css.pl
  Converts highlight styles to CSS.
source-highlight-tests/
  Test data taken from source-highlight.
t/, command-line.js, source-highlight.sh
  The test suite for Perl code.
scriptaculous-js-1.8.1/
  Contains script.aculo.us (http://script.aculo.us/) for unit tests.
test.html, test-data.html, test-unit-scriptaculous.html, test-unit-scriptaculous-async.html
  The test suite for JavaScript code.


Prerequisites
*************

Building and testing all the components will require a number of external
programs:
* A GNU system, including GNU Make
* Perl
* YUI Compressor
* JSLint
* Java
* Rhino
* XPCShell (from a development version of Firefox)
* The Perl module Test::Differences
* A web server


Building
********

"make lang" builds the language-specific *.js files in lang/ from
source-highlight definition files in source-highlight-lang/.  If you add a new
definition file in source-highlight-lang/, add the name of the language to
the Makefile.

"make css" builds the *.css files in css/ from highlight themes in
highlight-themes.

"make min" builds minified *.js files.

"make all" or "make" builds all three of the above targets.


Testing
*******

Running "make jslint" runs JSLint on sh_main.js.

Running "make test" runs the Perl test suite.

Running "make jscoverage" is used for code coverage reports.  You need
jscoverage (http://siliconforks.com/jscoverage/) installed for this to work. 
This creates a directory instrumented/ with instrumented code.  Open
instrumented/jscoverage.html?test.html in a web browser to run the SHJS tests
with code coverage.
