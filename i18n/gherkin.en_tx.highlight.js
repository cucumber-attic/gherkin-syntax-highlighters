hljs.LANGUAGES.gherkin_en_tx = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(But\u0020y'all\u0020|And\u0020y'all\u0020|Then\u0020y'all\u0020|When\u0020y'all\u0020|Given\u0020y'all\u0020|\\* |Examples|All\u0020y'all|Scenario|Background|Feature)',
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
