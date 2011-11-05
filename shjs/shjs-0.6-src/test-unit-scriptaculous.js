new Test.Unit.Runner({
  setup: function() {
    /*
    The assertMatch method makes a copy of the expectedRegex, but this is
    buggy in Konqueror (flags are not copied).
    */
    if (/Konqueror/.test(navigator.userAgent)) {
      this.assertMatch = function(expectedRegex, actualString) {
        this.assert(expectedRegex.test(actualString));
      };
    }
  },

  test_highlightString: function() {
    with (this) {
      var code = "/* comment */\nclass Foo {\n};"
      var tags = sh_highlightString(code, sh_languages["cpp"]);
      assertIdentical(14, tags.length);

      assertIdentical(0, tags[0].pos);
      assertIdentical('sh_comment', tags[0].node.className);
      assertIdentical(13, tags[1].pos);

      assertIdentical(14, tags[2].pos);
      assertIdentical('sh_keyword', tags[2].node.className);
      assertIdentical(19, tags[3].pos);

      assertIdentical(19, tags[4].pos);
      assertIdentical('sh_normal', tags[4].node.className);
      assertIdentical(20, tags[5].pos);

      assertIdentical(20, tags[6].pos);
      assertIdentical('sh_classname', tags[6].node.className);
      assertIdentical(23, tags[7].pos);

      assertIdentical(24, tags[8].pos);
      assertIdentical('sh_cbracket', tags[8].node.className);
      assertIdentical(25, tags[9].pos);

      assertIdentical(26, tags[10].pos);
      assertIdentical('sh_cbracket', tags[10].node.className);
      assertIdentical(27, tags[11].pos);

      assertIdentical(27, tags[12].pos);
      assertIdentical('sh_symbol', tags[12].node.className);
      assertIdentical(28, tags[13].pos);
    }
  },

  test_getClasses: function() {
    with (this) {
      var classes;
      var element;
      var elements = document.getElementsByTagName("pre");

      element = elements.item(0);
      classes = sh_getClasses(element);
      assertEqual(1, classes.length);
      assertEqual(classes[0], "sh_cpp");

      element = elements.item(1);
      classes = sh_getClasses(element);
      assertEqual(2, classes.length);
      assertEqual("sh_cpp", classes[0]);
      assertEqual("sh_sourceCode", classes[1]);

      element = elements.item(2);
      classes = sh_getClasses(element);
      assertEqual(classes.length, 2);
      assertEqual(classes[0], "sh_sourceCode");
      assertEqual(classes[1], "sh_cpp");

      element = elements.item(3);
      classes = sh_getClasses(element);
      assertEqual(classes.length, 0);
    }
  },

  test_addClass: function() {
    with (this) {
      var elements = document.getElementsByTagName("pre");
      var element = elements.item(4);
      sh_addClass(element, "foo");
      var classes = element.className;
//      assertEqual("adding foo to classes", "sh_sourceCode sh_cpp foo", classes);
      assertEqual("sh_sourceCode sh_cpp foo", classes);
    }
  },

  test_addExistingClass: function() {
    with (this) {
      var elements = document.getElementsByTagName("pre");
      var element = elements.item(0);
      var classes = element.className;
      assertEqual("sh_cpp", classes);
      sh_addClass(element, "sh_cpp");
      classes = element.className;
      assertEqual("sh_cpp", classes);
    }
  },

  test_extractTags: function() {
    with (this) {
      var text;
      var element;
      var elements = document.getElementsByTagName("pre");
      var regex = /^int main\(void\);$/m;

      text = sh_extractTags(elements.item(0), []);
      assert(regex.test(text));

      text = sh_extractTags(elements.item(1), []);
      assert(regex.test(text));

      text = sh_extractTags(elements.item(2), []);
      assert(regex.test(text));

      text = sh_extractTags(elements.item(3), []);
      assertEqual(text, "");

      element = document.getElementById("test_extractTags");
      text = sh_extractTags(element, []);
      regex = /line 1(\r|\n|\r\n)line 2(\r|\n|\r\n)line 3/;
      assertMatch(regex, text);
    }
  },

  test_highlightElement: function() {
    with (this) {
      var div = document.getElementById("commentdiv");
      sh_highlightElement(div, sh_languages["cpp"]);
      assertEqual("sh_sourceCode", div.className);
      var content = div.innerHTML;
      var regex = /^(\r|\n|\r\n| )?<span class="?sh_comment"?>\/\* comment \*\/<\/span>(\r|\n|\r\n| )?$/i;
      assertMatch(regex, content);
    }
  },

  test_exitall: function() {
    with (this) {
      var div = document.getElementById("perl");
      sh_highlightElement(div, sh_languages["perl"]);
      assertEqual("sh_sourceCode", div.className);
      var content = div.innerHTML;
      var regex = /<span class="?sh_keyword"?>m<\/span><span class="?sh_regexp"?>\/bar\/<\/span><span class="?sh_symbol"?>;<\/span>/i;
      assert(regex.test(content));
    }
  },

  test_empty: function() {
    with (this) {
      var div = document.getElementById("empty");
      sh_highlightElement(div, sh_languages["cpp"]);
      assertEqual("sh_sourceCode", div.className);
      var content = div.innerHTML;
      assertEqual(content, "");
    }
  },

  test_subelement: function() {
    with (this) {
      var div = document.getElementById("nested");
      sh_highlightElement(div, sh_languages["cpp"]);
      assertEqual("sh_sourceCode", div.className);
      var content = div.innerHTML;
      var regex = /<span class="?sh_type"?>int<\/span> i<span class="?sh_symbol"?>;<\/span>/i;
      assert(regex.test(content));
    }
  },

  test_markup: function() {
    with (this) {
      var div = document.getElementById("markup");
      sh_highlightElement(div, sh_languages["cpp"]);
      assertEqual("sh_sourceCode", div.className);
      var content = div.innerHTML;
      var regex = /<a href="http:\/\/www.example.com\/int"><span class="?sh_type"?>int<\/span><\/a> i<span class="?sh_symbol"?>;<\/span>/i;
      assert(regex.test(content));
    }
  },

  test_overlap: function() {
    with (this) {
      var div = document.getElementById("overlap");
      sh_highlightElement(div, sh_languages["cpp"]);
      assertEqual("sh_sourceCode", div.className);
      var content = div.innerHTML;
      var regex = /<span class="?sh_type"?>in<\/span><b><i><span class="?sh_type"?>t<\/span> f<\/i><\/b>oo<span class="?sh_symbol"?>;<\/span>/i;
      assertMatch(regex, content);
    }
  },

  test_url: function() {
    with (this) {
      assert(sh_isEmailAddress('foo@bar'));
      assert(! sh_isEmailAddress('mailto:foo@bar'));
      assert(! sh_isEmailAddress('http://shjs.sourceforge.net/'));
      var div = document.getElementById("urls");
      sh_highlightElement(div, sh_languages["cpp"]);
      assertEqual("sh_sourceCode", div.className);
      var content = div.innerHTML;
      var regex = /<a.* href="?mailto:gnombat@users.sourceforge.net".*?>&lt;gnombat@users.sourceforge.net(&gt;|>)<\/a>/i;
      assertMatch(regex, content);
    }
  },

  test_getXMLRequest: function() {
    with (this) {
      var requestStatus;
      var isRequestLoaded = false;
      var request = sh_getXMLHttpRequest();
      request.open('GET', 'test.html', true);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          requestStatus = request.status;
          isRequestLoaded = true;
        }
      };
      request.send(null);
      wait(500, function () {
        assert(! requestStatus || requestStatus === 200);
        assert(isRequestLoaded);
      });
    }
  },

  test_automatic: function() {
    with (this) {
      var automatic = document.getElementById('automatic');
      sh_load('java', automatic, 'lang/', '.js');
      wait(500, function () {
        var content = automatic.innerHTML;
        var regex = /<span class="?sh_keyword"?>public<\/span> <span class="?sh_keyword"?>class<\/span><span class="?sh_normal"?> <\/span><span class="?sh_classname"?>X<\/span> <span class="?sh_cbracket"?>{}<\/span>/i;
        assertMatch(regex, content);
      });
    }
  },

  test_br: function() {
    with (this) {
      var pre = document.getElementById('brs');
      var text = sh_extractTags(pre, []);
      var lineTerminator = '\\n';
      if (/MSIE/.test(navigator.userAgent)) {
        lineTerminator = '\\r';
      }
      var regex = new RegExp('line 1' + lineTerminator + 'line 2' + lineTerminator + 'line 3');
      assertMatch(regex, text);
    }
  }
});
