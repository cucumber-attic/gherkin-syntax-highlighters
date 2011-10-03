hljs.LANGUAGES.gherkin_uk = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u0410\u043b\u0435\u0020|\u0422\u0430\u0020|\u0410\u0020\u0442\u0430\u043a\u043e\u0436\u0020|\u0406\u0020|\u0422\u043e\u0434\u0456\u0020|\u0422\u043e\u0020|\u041a\u043e\u043b\u0438\u0020|\u042f\u043a\u0449\u043e\u0020|\u0414\u0430\u043d\u043e\u0020|\u041d\u0435\u0445\u0430\u0439\u0020|\u041f\u0440\u0438\u043f\u0443\u0441\u0442\u0438\u043c\u043e,\u0020\u0449\u043e\u0020|\u041f\u0440\u0438\u043f\u0443\u0441\u0442\u0438\u043c\u043e\u0020|\\* |\u041f\u0440\u0438\u043a\u043b\u0430\u0434\u0438|\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\u0020\u0441\u0446\u0435\u043d\u0430\u0440\u0456\u044e|\u0421\u0446\u0435\u043d\u0430\u0440\u0456\u0439|\u041f\u0435\u0440\u0435\u0434\u0443\u043c\u043e\u0432\u0430|\u0424\u0443\u043d\u043a\u0446\u0456\u043e\u043d\u0430\u043b)',
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
