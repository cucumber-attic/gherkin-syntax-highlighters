hljs.LANGUAGES.gherkin_sk = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ale\u0020|A\u0020|Tak\u0020|Ke\u010f\u0020|Pokia\u013e\u0020|\\* |Pr\u00edklady|N\u00e1\u010drt\u0020Scen\u00e1ru|Scen\u00e1r|Pozadie|Po\u017eiadavka)',
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
