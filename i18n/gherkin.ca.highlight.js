hljs.LANGUAGES.gherkin_ca = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Per\u00f2\u0020|I\u0020|Cal\u0020|Aleshores\u0020|Quan\u0020|Atesa\u0020|At\u00e8s\u0020|Donada\u0020|Donat\u0020|\\* |Exemples|Esquema\u0020de\u0020l'escenari|Escenari|Antecedents|Rerefons|Funcionalitat|Caracter\u00edstica)',
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
