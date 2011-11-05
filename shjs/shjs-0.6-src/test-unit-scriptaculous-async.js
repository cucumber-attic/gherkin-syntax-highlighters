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

  test_async: function() {
    with (this) {
      sh_highlightDocument('lang/', '.min.js');
      wait(1000, function () {
        var pre;

        pre = document.getElementById('pre1');
        var regex = /<span class="?sh_keyword"?>class<\/span><span class="?sh_normal"?> <\/span><span class="?sh_classname"?>X<\/span> <span class="?sh_cbracket"?>{}<\/span><span class="?sh_symbol"?>;<\/span>/i;
        assertMatch(regex, pre.innerHTML);

        pre = document.getElementById('pre2');
        var regex = /<span class="?sh_keyword"?>public<\/span> <span class="?sh_keyword"?>class<\/span><span class="?sh_normal"?> <\/span><span class="?sh_classname"?>X<\/span> <span class="?sh_cbracket"?>{}<\/span>/i;
        assertMatch(regex, pre.innerHTML);

        pre = document.getElementById('pre3');
        var regex = /<span class="?sh_keyword"?>public<\/span> <span class="?sh_keyword"?>interface<\/span><span class="?sh_normal"?> <\/span><span class="?sh_classname"?>Y<\/span> <span class="?sh_cbracket"?>{}<\/span>/i;
        assertMatch(regex, pre.innerHTML);
      });
    }
  }
});
