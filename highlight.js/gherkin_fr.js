hljs.LANGUAGES.gherkin_fr = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Mais |Et |Alors |Lorsqu'|Lorsque |Quand |Etant donné |Soit |\\* |Exemples|Plan du Scénario|Plan du scénario|Scénario|Contexte|Fonctionnalité)',
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
