hljs.LANGUAGES.gherkin_hr = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ali\u0020|I\u0020|Onda\u0020|Kad\u0020|Kada\u0020|Zadano\u0020|Zadani\u0020|Zadan\u0020|\\* |Scenariji|Primjeri|Koncept|Skica|Scenarij|Pozadina|Mogucnost|Mogu\u0107nost|Osobina)',
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
