hljs.LANGUAGES.gherkin_hu = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(De\u0020|\u00c9s\u0020|Akkor\u0020|Amikor\u0020|Ha\u0020|Majd\u0020|Adott\u0020|Amennyiben\u0020|\\* |P\u00e9ld\u00e1k|Forgat\u00f3k\u00f6nyv\u0020v\u00e1zlat|Forgat\u00f3k\u00f6nyv|H\u00e1tt\u00e9r|Jellemz\u0151)',
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
