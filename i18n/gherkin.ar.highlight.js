hljs.LANGUAGES.gherkin_ar = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(\u0644\u0643\u0646\u0020|\u0648\u0020|\u062b\u0645\u0020|\u0627\u0630\u0627\u064b\u0020|\u0639\u0646\u062f\u0645\u0627\u0020|\u0645\u062a\u0649\u0020|\u0628\u0641\u0631\u0636\u0020|\\* |\u0627\u0645\u062b\u0644\u0629|\u0633\u064a\u0646\u0627\u0631\u064a\u0648\u0020\u0645\u062e\u0637\u0637|\u0633\u064a\u0646\u0627\u0631\u064a\u0648|\u0627\u0644\u062e\u0644\u0641\u064a\u0629|\u062e\u0627\u0635\u064a\u0629)',
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
