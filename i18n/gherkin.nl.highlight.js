hljs.LANGUAGES.gherkin_nl = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Maar\u0020|En\u0020|Dan\u0020|Als\u0020|Stel\u0020|Gegeven\u0020|\\* |Voorbeelden|Abstract\u0020Scenario|Scenario|Achtergrond|Functionaliteit)',
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
