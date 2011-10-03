hljs.LANGUAGES.gherkin_sv = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Men\u0020|Och\u0020|S\u00e5\u0020|N\u00e4r\u0020|Givet\u0020|\\* |Exempel|Scenariomall|Abstrakt\u0020Scenario|Scenario|Bakgrund|Egenskap)',
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
