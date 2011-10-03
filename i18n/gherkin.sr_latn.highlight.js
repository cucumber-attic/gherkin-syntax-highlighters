hljs.LANGUAGES.gherkin_sr_latn = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ali |I |Onda |Kad |Kada |Zatati |Zadate |Zadato |\\* |Scenariji|Primeri|Koncept|Skica|Struktura scenarija|Primer|Scenario|Pozadina|Osnova|Kontekst|Osobina|Mogucnost|Mogućnost|Funkcionalnost)',
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
