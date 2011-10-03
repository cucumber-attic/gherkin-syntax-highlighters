hljs.LANGUAGES.gherkin_cs = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ale\u0020|A\u0020tak\u00e9\u0020|A\u0020|Pak\u0020|Kdy\u017e\u0020|Pokud\u0020|\\* |P\u0159\u00edklady|Osnova\u0020sc\u00e9n\u00e1\u0159e|N\u00e1\u010drt\u0020Sc\u00e9n\u00e1\u0159e|Sc\u00e9n\u00e1\u0159|Kontext|Pozad\u00ed|Po\u017eadavek)',
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
