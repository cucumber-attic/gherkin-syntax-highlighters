hljs.LANGUAGES.gherkin_sk = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ale |A |Tak |Keď |Pokiaľ |\\* |Príklady|Náčrt Scenáru|Scenár|Pozadie|Požiadavka)',
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
