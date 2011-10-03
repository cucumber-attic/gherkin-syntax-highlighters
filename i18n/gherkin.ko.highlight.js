hljs.LANGUAGES.gherkin_ko = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\ub2e8|\ud558\uc9c0\ub9cc|\uadf8\ub9ac\uace0|\uadf8\ub7ec\uba74|\ub9cc\uc57d|\ub9cc\uc77c|\uba3c\uc800|\uc870\uac74|\\* |\uc608|\uc2dc\ub098\ub9ac\uc624\u0020\uac1c\uc694|\uc2dc\ub098\ub9ac\uc624|\ubc30\uacbd|\uae30\ub2a5)',
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
