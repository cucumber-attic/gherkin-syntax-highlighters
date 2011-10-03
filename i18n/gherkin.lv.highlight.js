hljs.LANGUAGES.gherkin_lv = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Bet\u0020|Un\u0020|Tad\u0020|Ja\u0020|Kad\u0020|\\* |Paraugs|Piem\u0113ri|Scen\u0101rijs\u0020p\u0113c\u0020parauga|Scen\u0101rijs|Situ\u0101cija|Konteksts|F\u012b\u010da|Funkcionalit\u0101te)',
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
