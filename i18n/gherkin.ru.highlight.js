hljs.LANGUAGES.gherkin_ru = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u0410\u0020|\u041d\u043e\u0020|\u041a\u0020\u0442\u043e\u043c\u0443\u0020\u0436\u0435\u0020|\u0418\u0020|\u0422\u043e\u0433\u0434\u0430\u0020|\u0422\u043e\u0020|\u041a\u043e\u0433\u0434\u0430\u0020|\u0415\u0441\u043b\u0438\u0020|\u041f\u0443\u0441\u0442\u044c\u0020|\u0414\u0430\u043d\u043e\u0020|\u0414\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u0020|\\* |\u041f\u0440\u0438\u043c\u0435\u0440\u044b|\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\u0020\u0441\u0446\u0435\u043d\u0430\u0440\u0438\u044f|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439|\u041a\u043e\u043d\u0442\u0435\u043a\u0441\u0442|\u041f\u0440\u0435\u0434\u044b\u0441\u0442\u043e\u0440\u0438\u044f|\u0421\u0432\u043e\u0439\u0441\u0442\u0432\u043e|\u0424\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b|\u0424\u0443\u043d\u043a\u0446\u0438\u044f)',
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
