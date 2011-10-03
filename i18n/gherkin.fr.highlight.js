hljs.LANGUAGES.gherkin_fr = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Mais\u0020|Et\u0020|Alors\u0020|Lorsqu'|Lorsque\u0020|Quand\u0020|Etant\u0020donn\u00e9\u0020|Soit\u0020|\\* |Exemples|Plan\u0020du\u0020Sc\u00e9nario|Plan\u0020du\u0020sc\u00e9nario|Sc\u00e9nario|Contexte|Fonctionnalit\u00e9)',
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
