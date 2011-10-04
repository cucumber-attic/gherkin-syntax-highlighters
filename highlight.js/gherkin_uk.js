hljs.LANGUAGES.gherkin_uk = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Але |Та |А також |І |Тоді |То |Коли |Якщо |Дано |Нехай |Припустимо, що |Припустимо |\\* |Приклади|Структура сценарію|Сценарій|Передумова|Функціонал)',
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
