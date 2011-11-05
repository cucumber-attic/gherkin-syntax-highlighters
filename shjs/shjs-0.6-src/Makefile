# SHJS - Syntax Highlighting in JavaScript
# Copyright (C) 2007, 2008 gnombat@users.sourceforge.net
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

languages = \
  bison \
  c \
  caml \
  changelog \
  cpp \
  csharp \
  css \
  desktop \
  diff \
  flex \
  glsl \
  haxe \
  html \
  java \
  javascript \
  javascript_dom \
  latex \
  ldap \
  log \
  lsm \
  m4 \
  makefile \
  oracle \
  pascal \
  perl \
  php \
  prolog \
  properties \
  python \
  ruby \
  scala \
  sh \
  slang \
  sml \
  spec \
  sql \
  tcl \
  xml \
  xorg
themes = $(basename $(notdir $(wildcard highlight-themes/*.style)))

langfiles = $(addprefix lang/sh_,$(addsuffix .js,$(languages)))
cssfiles = $(addprefix css/sh_,$(addsuffix .css,$(themes)))

program = shjs
version = $(shell cat VERSION.txt)
zip = $(program)-$(version).zip
srczip = $(program)-$(version)-src.zip

distfiles = sh_main.js sh_main.min.js sh_style.css sh_style.min.css css/ lang/ doc/ VERSION.txt README.txt gpl.txt index.html favicon.ico
srcdistfiles = *.js *.pl *.sh *.css *.html favicon.ico \
               Makefile VERSION.txt README.txt README-SRC.txt gpl.txt \
               doc/ \
               JavaScript/ Regex/ SourceHighlight/ \
               css/ highlight-themes/ \
               lang/ source-highlight-lang/ \
               jsdifflib/ scriptaculous-js-1.8.1/ source-highlight-tests/ tests/ t/

.PHONY: all lang css min dist srcdist

all: lang css min test-data.html test-data-async.html

lang/sh_%.js: source-highlight-lang/%.lang
	./sh2js.pl $< > $@

lang: $(langfiles)

css/sh_%.css: highlight-themes/%.style
	./h2css.pl $< > $@
	unix2dos $@

css: $(cssfiles)

sh_main.min.js: sh_main.js
	echo '/* Copyright (C) 2007, 2008 gnombat@users.sourceforge.net */' > $@
	echo '/* License: http://shjs.sourceforge.net/doc/gplv3.html */' >> $@
	echo >> $@
	yuicompressor $< >> $@

%.min.js: %.js
	yuicompressor $< > $@

%.min.css: %.css
	yuicompressor $< > $@

min: sh_main.min.js sh_style.min.css $(patsubst %,lang/sh_%.min.js,$(languages)) $(patsubst %,css/sh_%.min.css,$(themes))

test-data.html:
	./generate-test-data.pl

test-data-async.html:
	./generate-test-data.pl --async

jslint:
	jslint sh_main.js

test:
	prove t/

clean:
	$(RM) RD_TRACE *~ ACTUAL EXPECTED *-ACTUAL *-EXPECTED *-EXPECTED.orig core core.* *.zip

maintainer-clean: clean
	$(RM) css/*.css lang/*.js *.min.js test-data.html test-data-async.html

%.zip:
	$(RM) -r $* $@
	mkdir $*
	cp --parents -a $^ $*
	find . -exec touch -r VERSION.txt {} \;
	zip -X -r $@ $* -x \*/.svn/\*
	$(RM) -r $*

dist: $(zip)

srcdist: $(srczip)

$(zip): $(distfiles)

$(srczip): $(srcdistfiles)

jscoverage:
	mkdir -p tmp
	cp -f -a sh_main.js sh_style.css test* scriptaculous-js-1.8.1 lang tmp
	perl -pi -e 's/\.min\.js/\.js/g;' tmp/test*.html
	jscoverage --no-instrument=scriptaculous-js-1.8.1 tmp instrumented
