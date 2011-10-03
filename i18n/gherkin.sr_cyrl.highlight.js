hljs.LANGUAGES.gherkin_sr_cyrl = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(Али |И |Онда |Кад |Када |Задати |Задате |Задато |\\* |Сценарији|Примери|Концепт|Скица|Структура сценарија|Пример|Сценарио|Позадина|Основа|Контекст|Особина|Могућност|Функционалност)',
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
