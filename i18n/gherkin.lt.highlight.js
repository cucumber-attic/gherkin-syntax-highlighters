hljs.LANGUAGES.gherkin_lt = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Bet\u0020|Ir\u0020|Tada\u0020|Kai\u0020|Duota\u0020|\\* |Variantai|Scenarijai|Pavyzd\u017eiai|Scenarijaus\u0020\u0161ablonas|Scenarijus|Kontekstas|Savyb\u0117)',
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
