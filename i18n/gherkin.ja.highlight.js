hljs.LANGUAGES.gherkin_ja = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u305f\u3060\u3057|\u4f46\u3057|\u3057\u304b\u3057|\u304b\u3064|\u306a\u3089\u3070|\u3082\u3057|\u524d\u63d0|\\* |\u30b5\u30f3\u30d7\u30eb|\u4f8b|\u30b7\u30ca\u30ea\u30aa\u30c6\u30f3\u30d7\u30ec|\u30c6\u30f3\u30d7\u30ec|\u30b7\u30ca\u30ea\u30aa\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8|\u30b7\u30ca\u30ea\u30aa\u30a2\u30a6\u30c8\u30e9\u30a4\u30f3|\u30b7\u30ca\u30ea\u30aa|\u80cc\u666f|\u6a5f\u80fd|\u30d5\u30a3\u30fc\u30c1\u30e3)',
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
