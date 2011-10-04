hljs.LANGUAGES.gherkin_ja = function() {
  return {
    defaultMode: {
      contains: [
        {
          className: 'keyword',
          begin: '^\\s*(ただし|但し|しかし|かつ|ならば|もし|前提|\\* |サンプル|例|シナリオテンプレ|テンプレ|シナリオテンプレート|シナリオアウトライン|シナリオ|背景|機能|フィーチャ)',
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
