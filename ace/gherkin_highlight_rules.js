define('ace/mode/gherkin_highlight_rules', function(require, exports, module) {

var oop = require("pilot/oop");
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
                regex : "^\\s*(?:Feature|Scenario|Scenario Outline|Examples):",
            },
            {
                token : "keyword",
                regex : "^\\s*(?:Given |When |Then |And |But )"
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

exports.GherkinHighlightRules = GherkinHighlightRules;

});