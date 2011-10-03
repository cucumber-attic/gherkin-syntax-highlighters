hljs.LANGUAGES.gherkin_sr_cyrl = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u0410\u043b\u0438\u0020|\u0418\u0020|\u041e\u043d\u0434\u0430\u0020|\u041a\u0430\u0434\u0020|\u041a\u0430\u0434\u0430\u0020|\u0417\u0430\u0434\u0430\u0442\u0438\u0020|\u0417\u0430\u0434\u0430\u0442\u0435\u0020|\u0417\u0430\u0434\u0430\u0442\u043e\u0020|\\* |\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0458\u0438|\u041f\u0440\u0438\u043c\u0435\u0440\u0438|\u041a\u043e\u043d\u0446\u0435\u043f\u0442|\u0421\u043a\u0438\u0446\u0430|\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\u0020\u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0458\u0430|\u041f\u0440\u0438\u043c\u0435\u0440|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u043e|\u041f\u043e\u0437\u0430\u0434\u0438\u043d\u0430|\u041e\u0441\u043d\u043e\u0432\u0430|\u041a\u043e\u043d\u0442\u0435\u043a\u0441\u0442|\u041e\u0441\u043e\u0431\u0438\u043d\u0430|\u041c\u043e\u0433\u0443\u045b\u043d\u043e\u0441\u0442|\u0424\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u043d\u043e\u0441\u0442)',
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
