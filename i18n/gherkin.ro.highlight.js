hljs.LANGUAGES.gherkin_ro = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Dar\u0020|\u015ei\u0020|\u0218i\u0020|Si\u0020|Atunci\u0020|C\u00e2nd\u0020|Cand\u0020|Da\u0163i\u0020fiind\u0020|Da\u021bi\u0020fiind\u0020|Dati\u0020fiind\u0020|Dat\u0020fiind\u0020|Date\u0020fiind\u0020|\\* |Exemple|Structur\u0103\u0020scenariu|Structura\u0020scenariu|Scenariu|Context|Func\u0163ionalitate|Func\u021bionalitate|Functionalitate)',
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
