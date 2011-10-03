hljs.LANGUAGES.gherkin_sr_latn = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ali\u0020|I\u0020|Onda\u0020|Kad\u0020|Kada\u0020|Zatati\u0020|Zadate\u0020|Zadato\u0020|\\* |Scenariji|Primeri|Koncept|Skica|Struktura\u0020scenarija|Primer|Scenario|Pozadina|Osnova|Kontekst|Osobina|Mogucnost|Mogu\u0107nost|Funkcionalnost)',
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
