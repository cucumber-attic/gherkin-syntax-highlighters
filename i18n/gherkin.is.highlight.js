hljs.LANGUAGES.gherkin_is = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(En\u0020|Og\u0020|\u00de\u00e1\u0020|\u00deegar\u0020|Ef\u0020|\\* |Atbur\u00f0ar\u00e1sir|D\u00e6mi|L\u00fdsing\u0020D\u00e6ma|L\u00fdsing\u0020Atbur\u00f0ar\u00e1sar|Atbur\u00f0ar\u00e1s|Bakgrunnur|Eiginleiki)',
          relevance: 0
        },
        {
          className: 'string',
          begin: '\\|',
          relevance: 0
        },
        hljs.HASH_COMMENT_MODE,
        {
          className: 'string',
          begin: '"""', end: '"""',
          relevance: 10
        },
        hljs.APOS_STRING_MODE, 
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: 'annotation', begin: '@[^@\r\n\t ]+'
        }
      ]
    }
  };
}();
