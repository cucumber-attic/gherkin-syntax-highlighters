define('ace/mode/gherkin-es', function(require, exports, module) {

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
                regex : "^\\s*(?:Ejemplos|Esquema del escenario|Escenario|Antecedentes|Característica):"
            },
            {
                token : "keyword",
                regex : "^\\s*(?:Pero |Y |Entonces |Cuando |Dadas |Dados |Dada |Dado |\\* )"
            },
            {
                token : "string",           // multi line """ string start
                regex : '^\\s*"{3}.*$',
                next : "qqstring"
            }
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

define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) {

var Range = require("../range").Range;

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
});