define('ace/mode/gherkin-fr', function(require, exports, module) {

var oop = require("../lib/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var MatchingBraceOutdent = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent;
var Range = require("ace/range").Range;
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
var GherkinHighlightRules = function()
{
    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "^\\s*#.*$"
            }, 
            {
                token : "comment.doc.tag",
                regex : "@[^@\\\r\\\n\\\t ]+" 
            },
            {
                token : "keyword.with_children",
                regex : "^\\s*(?:Exemples|Plan du Scénario|Plan du scénario|Scénario|Contexte|Fonctionnalité):",
            },
            {
                token : "keyword",
                regex : "^\\s*(?:Mais |Et |Alors |Lorsqu'|Lorsque |Quand |Étant données |Étant donnés |Étant donnée |Étant donné |Etant données |Etant donnés |Etant donnée |Etant donné |Soit |\\* )"
            },
            {
                token : "string",           // multi line """ string start
                regex : '^\\s*"{3}.*$',
                next : "qqstring"
            },
        ],
        "qqstring" : [ {
                token : "string", // multi line """ string end
                regex : '(?:[^\\\\]|\\\\.)*?"{3}',
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ]
    };
};

oop.inherits(GherkinHighlightRules, TextHighlightRules);

var Mode = function()
{
    this.$tokenizer = new Tokenizer(new GherkinHighlightRules().getRules());
    this.$outdent = new MatchingBraceOutdent();
};
oop.inherits(Mode, TextMode);

(function()
{
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        var tokenizedLine = this.$tokenizer.getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        if (tokens.length && tokens[0].type == "keyword.with_children") {
            indent += tab;
        }
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    
}).call(Mode.prototype);

exports.Mode = Mode;

});
