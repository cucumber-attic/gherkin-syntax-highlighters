hljs.LANGUAGES.gherkin_pt = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Mas\u0020|E\u0020|Entao\u0020|Ent\u00e3o\u0020|Quando\u0020|Dado\u0020|\\* |Exemplos|Esquema\u0020do\u0020Cenario|Esquema\u0020do\u0020Cen\u00e1rio|Cenario|Cen\u00e1rio|Contexto|Funcionalidade)',
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
