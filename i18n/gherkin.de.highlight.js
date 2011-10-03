hljs.LANGUAGES.gherkin_de = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Aber\u0020|Und\u0020|Dann\u0020|Wenn\u0020|Gegeben\u0020sei\u0020|Angenommen\u0020|\\* |Beispiele|Szenariogrundriss|Szenario|Grundlage|Funktionalit\u00e4t)',
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
