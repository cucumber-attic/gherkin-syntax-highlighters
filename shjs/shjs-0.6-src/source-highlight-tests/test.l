%{
/*
 * Copyright (C) 1999, 2000, 2001  Lorenzo Bettini
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 *
 */

static int lineno = 1 ; /* number of scanned lines */
char linebuf[1024] ; /* current code line in the source */
int tokenpos = 0 ; // current token position in the current line

#include "tags.h"
#include "tokens.h"
#include "colors.h"

#include "genfun.h"

%}
%option prefix="java_scanner_"
%option noyywrap

ws [ ]+
tabs [\t]+

nl \n
cr \r
IDE [a-zA-Z_]([a-zA-Z0-9_])*
wspace [ \t\n\r]

STRING \"[^\"\n]*\"

not_alpha [^a-zA-Z0-9]

%s COMMENT_STATE
%s SINGLELINE_COMMENT
%s STRING_STATE
%s CHAR_STATE

keyword (abstract|assert|break|case|catch|class|const|continue|default|do|else|extends|final|finally|for|goto|if|implements|instanceof|interface|native|new|null|package|private|protected|public|return|static|super|switch|synchronized|throw|throws|this|transient|try|volatile|while)
basetype (int|byte|boolean|char|long|float|double|short|void)
symbol [\~\!\%\^\*\(\)\-\+\=\[\]\|\\\:\;\,\.\/\?\&\<\>]
funccall {IDE}/{wspace}*\(

%%



\r {}

<INITIAL>"/*" { BEGIN COMMENT_STATE ;
 startComment( yytext ) ;      
}
<INITIAL>"/*".*"*/" { generateComment( yytext ) ;  }


<COMMENT_STATE>\n { 
   endComment (""); 
   ++lineno;
   generateNewLine() ;
   if (true) {
      startComment ("");
   } else {
     for (int i = 0; i < 10; ++i) {
       ; // do nothing, just to test the { }
     }
   }
   /* if we encounter another // during a comment we simply
      treat it as a ordinary string */
 }
<COMMENT_STATE>"*/" { endComment(yytext) ;
                      BEGIN INITIAL ; /* end of the comment */ }

<INITIAL>"//" { BEGIN SINGLELINE_COMMENT ; startComment( yytext ) ; }
<SINGLELINE_COMMENT>\n { 
   BEGIN INITIAL ;
   yyless (0); // put the \n back
   endComment( yytext ) ; 
   /* if we encounter another // during a comment we simply
      treat it as a ordinary string */
 }

<INITIAL>\" { BEGIN STRING_STATE ; startString( yytext );  }
<STRING_STATE>\\\\ {  generate_preproc( yytext ) ; }
<STRING_STATE>"\\\"" {  generate_preproc( yytext ) ; }
<STRING_STATE>\n { 
   endString (""); 
   ++lineno;
   generateNewLine() ;
   startString ("");
}
<STRING_STATE>\" { BEGIN INITIAL ; endString( yytext ) ; }

<INITIAL>\' { BEGIN CHAR_STATE ; startString( yytext );  }
<CHAR_STATE>\\\\ {  generate_preproc( yytext ) ; }
<CHAR_STATE>"\\\'" {  generate_preproc( yytext ) ; }
<CHAR_STATE>\' { BEGIN INITIAL ; endString( yytext ) ; }

<INITIAL>{keyword}  { generateKeyWord( yytext ) ; }
<INITIAL>{basetype} { generateBaseType( yytext ) ; }
<INITIAL>{symbol} { generateSymbol( yytext ); }
<INITIAL>[\{\}] { generateCBracket ( yytext ); }

<INITIAL>0[xX][0-9a-fA-F]* { generateNumber( yytext ) ; }
<INITIAL>[0-9][0-9]*(\.[0-9]*[eE]?[-+]?[0-9]*)? { generateNumber( yytext ) ; }

<INITIAL>{keyword}/{wspace}*\( { generateKeyWord( yytext ) ; }
<INITIAL>{basetype}/{wspace}*\( { generateBaseType( yytext ) ; }
<INITIAL>{funccall} { generateFunction ( yytext ); }

<INITIAL>import { generatePreProc( yytext) ; }

<INITIAL>[a-zA-Z_]([a-zA-Z0-9_])* { generate_normal( yytext ) ; }

\t {
        generateTab() ;
}

. { generate_preproc( yytext ) ; /* anything else */ }

\n { 
       ++lineno;
       generateNewLine() ;
}

%%

void yyerror( char *s ) ;

void yyerror( char *s )
{  
  fprintf( stderr, "%d: %s: %s\n%s\n", lineno, s, yytext, linebuf ) ;
  fprintf( stderr, "%*s\n", tokenpos, "^" ) ;
}

/* vim:set ft=flex expandtab cindent tabstop=4 softtabstop=4 shiftwidth=4 textwidth=0: */
