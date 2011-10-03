hljs.LANGUAGES.gherkin_lu = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(m\u00e4\u0020|awer\u0020|a\u0020|an\u0020|dann\u0020|wann\u0020|ugeholl\u0020|\\* |Beispiller|Plang\u0020vum\u0020Szenario|Szenario|Hannergrond|Funktionalit\u00e9it)',
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
