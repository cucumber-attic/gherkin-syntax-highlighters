hljs.LANGUAGES.gherkin_vi = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Nh\u01b0ng\u0020|V\u00e0\u0020|Th\u00ec\u0020|Khi\u0020|Cho\u0020|Bi\u1ebft\u0020|\\* |D\u1eef\u0020li\u1ec7u|Khung\u0020k\u1ecbch\u0020b\u1ea3n|Khung\u0020t\u00ecnh\u0020hu\u1ed1ng|K\u1ecbch\u0020b\u1ea3n|T\u00ecnh\u0020hu\u1ed1ng|B\u1ed1i\u0020c\u1ea3nh|T\u00ednh\u0020n\u0103ng)',
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
