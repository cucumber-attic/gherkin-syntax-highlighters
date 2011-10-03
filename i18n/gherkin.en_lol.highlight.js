hljs.LANGUAGES.gherkin_en_lol = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(BUT\u0020|AN\u0020|DEN\u0020|WEN\u0020|I\u0020CAN\u0020HAZ\u0020|\\* |EXAMPLZ|MISHUN\u0020SRSLY|MISHUN|B4|OH\u0020HAI)',
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
