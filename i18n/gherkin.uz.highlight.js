hljs.LANGUAGES.gherkin_uz = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u0410\u043c\u043c\u043e\u0020|\u0411\u0438\u0440\u043e\u043a\u0020|\u041b\u0435\u043a\u0438\u043d\u0020|\u0412\u0430\u0020|\u0423\u043d\u0434\u0430\u0020|\u0410\u0433\u0430\u0440\u0020|\\* |\u041c\u0438\u0441\u043e\u043b\u043b\u0430\u0440|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439\u0020\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\u0441\u0438|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439|\u0422\u0430\u0440\u0438\u0445|\u0424\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b)',
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
