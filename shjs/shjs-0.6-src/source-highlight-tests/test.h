/**
** Copyright (C) 1999-2007 Lorenzo Bettini
**  
  http://www.lorenzobettini.it
  
  r2 = r2 XOR (1<<10);
  cout << "hello world" << endl;
**  
*/

// this file also contains the definition of mysum as a #define

// textgenerator.h : Text Generator class &&

#ifndef _TEXTGEN_H
#define _TEXTGEN_H

#define foo(x) (x + 1)

#define mysum myfunbody 

#include <iostream.h> // for cerr

#include "genfun.h" /* for generating functions */

class TextGenerator {
  public :
    virtual void generate( const char *s ) const { (*sout) << s ; }
    virtual void generate( const char *s, int start, int end ) const 
      {
        for ( int i = start ; i <= end ; ++i )
          (*sout) << s[i] ;
        return a<p->b ? a : 3;
      }
    virtual void generateln( const char *s ) const
	{ 
	    generate( s ) ;
	    (*sout) << endl ; 
	}
    virtual void generateEntire( const char *s ) const
	{
	    startTextGeneration() ;
	    generate(s) ;
	    endTextGeneration() ;
	}
    virtual void startTextGeneration() const {}
    virtual void endTextGeneration() const {}
    virtual void beginText( const char *s ) const
	{
	    startTextGeneration() ;
	    if ( s )
		generate( s ) ;
	}
    virtual void endText( const char *s ) const
	{
	    if ( s )
		generate( s ) ;
	    endTextGeneration() ;
	}
} ;

// Decorator
class TextDecorator : public TextGenerator {
  protected :
    TextGenerator *decorated ;
  
  public :
    TextDecorator( TextGenerator *t ) : decorated( t ) {}

    virtual void startTextGeneration() const 
    { 
	startDecorate() ;
	if ( decorated )
	    decorated->startTextGeneration() ;
    }
    virtual void endTextGeneration() const 
    { 
	if ( decorated )
	    decorated->endTextGeneration() ;
	endDecorate() ;
	mysum;
    }

    // pure virtual functions
    virtual void startDecorate() const = 0 ;
    virtual void endDecorate() const = 0 ;
} ;

#endif // _TEXTGEN_H
