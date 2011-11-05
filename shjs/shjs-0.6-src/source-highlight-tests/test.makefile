# a comment
## another comment
###### another comment

ID: $(HEADERS) $(SOURCES) $(LISP) $(TAGS_FILES)
        list='$(SOURCES) $(HEADERS) $(LISP) $(TAGS_FILES)'; \
        unique=`for i in $$list; do \
            if test -f "$$i"; then echo $$i; else echo $(srcdir)/$$i; fi; \
          done | \
          $(AWK) '    { files[$$0] = 1; } \
               END { for (i in files) print i; }'`; \
        mkid -fID $$unique

a##b

foo.o foo.z: foo.c

LDADD = @LEXLIB@ $(top_builddir)/gl/libgnu.la

$(source_highlightdata_DATA)

LANGFILES = \
bison.lang      cpp.lang       javascript.lang  perl.lang    ruby.lang \
c_comment.lang  flex.lang      log.lang         php.lang     sml.lang \
caml.lang       function.lang  lua.lang         prolog.lang  symbols.lang \
changelog.lang  java.lang      number.lang      python.lang  url.lang \
pascal.lang fortran.lang html.lang latex.lang logtalk.lang \
diff.lang c_string.lang langdef.lang outlang.lang style.lang \
extreme_comment.lang extreme_comment2.lang extreme_comment3.lang \
postscript.lang csharp.lang xml.lang sh.lang script_comment.lang \
tcl.lang sql.lang bib.lang makefile.lang \
default.lang nohilite.lang

OUTLANGFILES = \
css_common.outlang \
esc.outlang \
html_common.outlang \
html_notfixed.outlang \
htmlcss.outlang \
htmldoc.outlang \
html.outlang \
latexdoc.outlang \
latex.outlang \
latexcolordoc.outlang \
latexcolor.outlang \
xhtml_common.outlang \
xhtmlcss.outlang \
xhtmldoc.outlang \
xhtml.outlang \
texinfo.outlang \
javadoc.outlang \
docbook.outlang

STYLEFILES = texinfo.style esc.style

source_highlightdata_DATA = \
$(LANGFILES) $(OUTLANGFILES) \
$(STYLEFILES) \
default.style style2.style style3.style \
lang.map outlang.map

# files that are built before distribution gets built
#MAINTAINERCLEANFILES = $(BUILT_SOURCES)

check:
	for langfile in $(LANGFILES); do \
	  $(SRCHILITE) --data-dir=$(srcdir) --check-lang $(srcdir)/$$langfile ; \
	done && \
	for outlangfile in $(OUTLANGFILES); do \
	  $(SRCHILITE) --data-dir=$(srcdir) --check-outlang $(srcdir)/$$outlangfile ; \
	done

tags:
	ctags --c-types='defgmstuv' --recurse=yes $(srcdir)/*

.PHONY: tags

noinst_HEADERS = regexpengine.h regexpstate.h asserttest.h regexpenginedebug.h
