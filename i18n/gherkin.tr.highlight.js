hljs.LANGUAGES.gherkin_tr = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ama\u0020|Fakat\u0020|Ve\u0020|O\u0020zaman\u0020|E\u011fer\u0020ki\u0020|Diyelim\u0020ki\u0020|\\* |\u00d6rnekler|Senaryo\u0020tasla\u011f\u0131|Senaryo|Ge\u00e7mi\u015f|\u00d6zellik)',
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
