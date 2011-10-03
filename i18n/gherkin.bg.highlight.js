hljs.LANGUAGES.gherkin_bg = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u041d\u043e\u0020|\u0418\u0020|\u0422\u043e\u0020|\u041a\u043e\u0433\u0430\u0442\u043e\u0020|\u0414\u0430\u0434\u0435\u043d\u043e\u0020|\\* |\u041f\u0440\u0438\u043c\u0435\u0440\u0438|\u0420\u0430\u043c\u043a\u0430\u0020\u043d\u0430\u0020\u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0439|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439|\u041f\u0440\u0435\u0434\u0438\u0441\u0442\u043e\u0440\u0438\u044f|\u0424\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u043d\u043e\u0441\u0442)',
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
