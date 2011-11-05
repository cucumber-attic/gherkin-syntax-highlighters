%{
/*
 * Copyright (C) 1999, 2000, 2001 Lorenzo Bettini <http://www.lorenzobettini.it>
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

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <iostream>

#include "my_sstream.h"

#include "tags.h"
#include "colors.h"
#include "keys.h"
#include "messages.h"
#include "parsetags.h"
#include "fileutil.h"

using std::cerr;

static int yyparse() ;
static void yyerror( char *s ) ;

int line = 1 ;

static void add_tag(Tags *tags, Tag *t);

extern int opsc_lex() ;
extern FILE *opsc_in ;

%}

%union {
  int tok ; /* command */
  char * string ; /* string : id, ... */
  int flag ;
  Tag *tag ;
  Tags *tags ;
} ;

%token <flag> BOLD ITALICS UNDERLINE
%token <string> KEY COLOR

%type <tag> option
%type <tags> options
%type <flag> values value

%%

globaltags : options { setTags( $1 ) ; }
;

options : options option { add_tag( $1, $2 ) ; }
        | option { $$ = new Tags() ; $$->AddTag( $1 ) ;  }
        ;

option : KEY COLOR
             {
                 printMessage( $1 ) ;
                 printMessage( $2 ) ;
             }
         values ';'
             {
	       $$ = new Tag( $1, $2 ) ;
               $$->SetFlags($4) ;
	     }
       ;

values : values ',' value { $$ = $1 | $3 ; }
       | value
       ;

value : { $$ = 0 ; printMessage( " (no options) " ) ; }
      | BOLD { printMessage( " - bold" ) ; $$ = ISBOLD ; }
      | ITALICS { printMessage( " - italics" ) ; $$ = ISITALIC ; }
      | UNDERLINE { printMessage( " - underline" ) ; $$ = ISUNDERLINE ; }
      ;

%%

char *current_file = 0;

void
parseTags(const string &path, const string &name)
{
  // opens the file for yylex
  opsc_in = open_data_file_stream(path, name);

  printMessage_noln( "Parsing ", cerr ) ;
  printMessage_noln (name, cerr);
  printMessage( " file ...", cerr ) ;
  yyparse() ;
  printMessage( "Parsing done!", cerr ) ;
}

void
yyerror( char *s )
{
  ostringstream str ;
  str << current_file << ":" << line << ": " << s << ", in option declaration";
  printError( str.str().c_str(), cerr ) ;
  exit(EXIT_FAILURE);
}

void
add_tag(Tags *tags, Tag *t)
{
  if (! tags->AddTag(t))
  {
    yyerror("already defined");
  }
}