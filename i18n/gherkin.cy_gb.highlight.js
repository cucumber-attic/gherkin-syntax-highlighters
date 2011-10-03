hljs.LANGUAGES.gherkin_cy_gb = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ond\u0020|A\u0020|Yna\u0020|Pryd\u0020|Anrhegedig\u0020a\u0020|\\* |Enghreifftiau|Scenario\u0020Amlinellol|Scenario|Cefndir|Arwedd)',
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
