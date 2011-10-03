hljs.LANGUAGES.gherkin_eo = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Sed\u0020|Kaj\u0020|Do\u0020|Se\u0020|Donita\u0135o\u0020|\\* |Ekzemploj|Konturo\u0020de\u0020la\u0020scenaro|Scenaro|Fono|Trajto)',
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
