hljs.LANGUAGES.gherkin_zh_tw = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u4f46\u662f|\u4e26\u4e14|\u800c\u4e14|\u90a3\u9ebc|\u7576|\u5047\u8a2d|\\* |\u4f8b\u5b50|\u5287\u672c\u5927\u7db1|\u5834\u666f\u5927\u7db1|\u5287\u672c|\u5834\u666f|\u80cc\u666f|\u529f\u80fd)',
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
