hljs.LANGUAGES.gherkin_pl = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Ale\u0020|I\u0020|Oraz\u0020|Wtedy\u0020|Je\u015bli\u0020|Je\u017celi\u0020|Maj\u0105c\u0020|Zak\u0142adaj\u0105c\u0020|\\* |Przyk\u0142ady|Szablon\u0020scenariusza|Scenariusz|Za\u0142o\u017cenia|W\u0142a\u015bciwo\u015b\u0107)',
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
