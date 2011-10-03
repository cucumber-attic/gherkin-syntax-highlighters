/*
Language: Gherkin
*/

hljs.LANGUAGES.gherkin = function() {
  var DOC_STRING = {
    className: 'string',
    begin: '"""', end: '"""',
    relevance: 10
  };

  return {
    defaultMode: {
      keywords: {
        'keyword': {
          'Feature': 1, 'Scenario': 1, 'Scenario Outline': 1, 'Examples': 1, 'Given': 1, 'When': 1, 'Then': 1, 'And': 1, 'But': 1
        }
      },
      illegal: '(</|->|\\?)',
      contains: [
        hljs.HASH_COMMENT_MODE,
        DOC_STRING, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: 'decorator',
          begin: '@', end: '$'
        }
      ]
    }
  };
}();
