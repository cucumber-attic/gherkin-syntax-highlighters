hljs.LANGUAGES.gherkin_en_scouse = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Buh\u0020|An\u0020|Den\u0020youse\u0020gotta\u0020|Dun\u0020|Youse\u0020know\u0020like\u0020when\u0020|Wun\u0020|Youse\u0020know\u0020when\u0020youse\u0020got\u0020|Givun\u0020|\\* |Examples|Wharrimean\u0020is|The\u0020thing\u0020of\u0020it\u0020is|Dis\u0020is\u0020what\u0020went\u0020down|Feature)',
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
