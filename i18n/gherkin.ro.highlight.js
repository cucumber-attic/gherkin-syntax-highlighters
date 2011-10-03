hljs.LANGUAGES.gherkin_ro = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Dar |Şi |Și |Si |Atunci |Când |Cand |Daţi fiind |Dați fiind |Dati fiind |Dat fiind |Date fiind |\\* |Exemple|Structură scenariu|Structura scenariu|Scenariu|Context|Funcţionalitate|Funcționalitate|Functionalitate)',
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
