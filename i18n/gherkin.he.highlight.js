hljs.LANGUAGES.gherkin_he = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u05d0\u05d1\u05dc\u0020|\u05d5\u05d2\u05dd\u0020|\u05d0\u05d6\u05d9\u0020|\u05d0\u05d6\u0020|\u05db\u05d0\u05e9\u05e8\u0020|\u05d1\u05d4\u05d9\u05e0\u05ea\u05df\u0020|\\* |\u05d3\u05d5\u05d2\u05de\u05d0\u05d5\u05ea|\u05ea\u05d1\u05e0\u05d9\u05ea\u0020\u05ea\u05e8\u05d7\u05d9\u05e9|\u05ea\u05e8\u05d7\u05d9\u05e9|\u05e8\u05e7\u05e2|\u05ea\u05db\u05d5\u05e0\u05d4)',
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
