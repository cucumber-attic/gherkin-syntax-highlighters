hljs.LANGUAGES.gherkin_en_pirate = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Avast!\u0020|Aye\u0020|Let\u0020go\u0020and\u0020haul\u0020|Blimey!\u0020|Gangway!\u0020|\\* |Dead\u0020men\u0020tell\u0020no\u0020tales|Shiver\u0020me\u0020timbers|Heave\u0020to|Yo-ho-ho|Ahoy\u0020matey!)',
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
