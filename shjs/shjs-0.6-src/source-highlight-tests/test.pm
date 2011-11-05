# Here an extract of package MIME::Lite::HTML

package MIME::Lite::HTML;

# module MIME::Lite::HTML : Provide routine to transform a HTML page in 
# a MIME::Lite mail
# Copyright 2001 A.Barbet alian@alianwebserver.com.  All rights reserved.

# Revision 1.1  2002/02/07 15:58:35  bettini
# added scanner for perl
#
# Revision 1.12  2002/01/07 20:18:53  alian
# - Add replace links for frame & iframe
# - Correct incorrect parsing in include_css for <LINK REL="SHORTCUT ICON">
# tag. Tks to doggy@miniasp.com for idea and patch
#
# Revision 1.11  2001/12/13 22:42:33  alian
# - Correct a bug with relative anchor
#
# Revision 1.10  2001/11/07 10:52:43  alian
# - Add feature for get restricted url. Add LoginDetails parameter for that
# (tks to Leon.Halford@ing-barings.com for idea)
# - Change error in POD doc rfc2257 => rfc2557 (tks to
# justin.zaglio@morganstanley.com)
# - Correct warning when $url_html is undef

use LWP::UserAgent;
use HTML::LinkExtor;
use URI::URL;
use MIME::Lite;
use strict;
use vars qw($VERSION @ISA @EXPORT @EXPORT_OK);

require Exporter;

@ISA = qw(Exporter);
@EXPORT = qw();

my $LOGINDETAILS;

#------------------------------------------------------------------------------
# redefine get_basic_credentials
#------------------------------------------------------------------------------
{
    package RequestAgent;
    use vars qw(@ISA);
    @ISA = qw(LWP::UserAgent);

    sub new
    { 
	my $self = LWP::UserAgent::new(@_);
	$self;
    }

    sub get_basic_credentials
	{	
	  my($self, $realm, $uri) = @_;
	  # Use parameter of MIME-Lite-HTML, key LoginDetails
	  if (defined $LOGINDETAILS) { return split(':', $LOGINDETAILS, 2); } 
	  # Ask user on STDIN
	  elsif (-t) 
	    {
		my $netloc = $uri->host_port;
		print "Enter username for $realm at $netloc: ";
		my $user = <STDIN>;
		chomp($user);
		# 403 if no user given
		return (undef, undef) unless length $user;
		print "Password: ";
		system("stty -echo");
		my $password = <STDIN>;
		system("stty echo");
		print "\n";  # because we disabled echo
		chomp($password);
		return ($user, $password);
	    }
	  # Damm we got 403 with CGI (use param LoginDetails)  ...
	  else { return (undef, undef) }
	}
  }

#------------------------------------------------------------------------------
# new
#------------------------------------------------------------------------------
sub new
  {
    my $class = shift;
    my $self = {};
    bless $self, $class;
    my %param = @_;
    # Agent name
    $self->{_AGENT} = new RequestAgent;
    $self->{_AGENT}->agent("MIME-Lite-HTML $VERSION");
    $self->{_AGENT}->from('mime-lite-html@alianwebserver.com' );
    # Set debug level
    if ($param{'Debug'})
      {
	$self->{_DEBUG} = 1;
	delete $param{'Debug'};
      }
    # Set Login information
    if ($param{'LoginDetails'})
      {
	  $LOGINDETAILS = $param{'LoginDetails'};
	  delete $param{'LoginDetails'};
      }
    # Set type of include to do
    if ($param{'IncludeType'})
      {
	die "IncludeType must be in 'extern', 'cid' or 'location'\n" if
	  ( ($param{'IncludeType'} ne 'extern') and
	    ($param{'IncludeType'} ne 'cid') and
	    ($param{'IncludeType'} ne 'location'));	
	$self->{_include} = $param{'IncludeType'};
	delete $param{'IncludeType'};
      }
    # Defaut type: use a Content-Location field
    else {$self->{_include}='location';}

## Added by Michalis@linuxmail.org to manipulate non-us mails
   if ($param{'TextCharset'}) {
     $self->{_textcharset}=$param{'TextCharset'};
     delete $param{'TextCharset'};
   }
   else { $self->{_textcharset}='iso-8859-1'; }
   if ($param{'HTMLCharset'}) {
     $self->{_htmlcharset}=$param{'HTMLCharset'};
     delete $param{'HTMLCharset'};
    }
   else { $self->{_htmlcharset}='iso-8859-1'; }

   if ($param{'TextEncoding'}) {
     $self->{_textencoding}=$param{'TextEncoding'};
     delete $param{'TextEncoding'};
    }
   else { $self->{_textencoding}='7bit'; }

   if ($param{'HTMLEncoding'}) {
     $self->{_htmlencoding}=$param{'HTMLEncoding'};
     delete $param{'HTMLEncoding'};
    }
   else { $self->{_htmlencoding}='quoted-printable'; }
## End. Default values remain as they were initially set.
## No need to change existing scripts if you send US-ASCII. 
## If you DON't send us-ascii, you wouldn't be able to use 
## MIME::Lite::HTML anyway :-)

    # Set proxy to use to get file
    if ($param{'Proxy'})
      {
	$self->{_AGENT}->proxy('http',$param{'Proxy'}) ;
	print "Set proxy for http : ", $param{'Proxy'},"\n" 
	  if ($self->{_DEBUG});
	delete $param{'Proxy'};
      }
    # Set hash to use with template
    if ($param{'HashTemplate'})
      {
	$param{'HashTemplate'} = ref($param{'HashTemplate'}) eq "HASH" 
	  ? $param{'HashTemplate'} : %{$param{'HashTemplate'}};
	$self->{_HASH_TEMPLATE}= $param{'HashTemplate'};
	delete $param{'HashTemplate'};
      }
    $self->{_param} = \%param;
    # Ok I hope I known what I do ;-)
    MIME::Lite->quiet(1);
    return $self;
  }

#------------------------------------------------------------------------------
# POD Documentation
#------------------------------------------------------------------------------

=head1 NAME

MIME::Lite::HTML - Provide routine to transform a HTML page in a MIME-Lite mail

=head1 SYNOPSIS

  #!/usr/bin/perl -w 
  # A cgi program that do "Mail this page to a friend";
  # Call this script like this :
  # script.cgi?email=myfriend@isp.com&url=http://www.go.com
  use strict;
  use CGI qw/:standard/;
  use CGI::Carp qw/fatalsToBrowser/;
  use MIME::Lite::HTML;
  
  my $mailHTML = new MIME::Lite::HTML
     From     => 'MIME-Lite@alianwebserver.com',
     To       => param('email'),
     Subject => 'Your url: '.param('url');
  
  my $MIMEmail = $mailHTML->parse(param('url'));
  $MIMEmail->send; # or for win user : $mail->send_by_smtp('smtp.fai.com');
  print header,"Mail envoye (", param('url'), " to ", param('email'),")<br>\n";

=head1 DESCRIPTION

This module is a Perl mail client interface for sending message that 
support HTML format and build them for you..
This module provide routine to transform a HTML page in MIME::Lite mail.
So you need this module to use MIME-Lite-HTML possibilities

=head2 What's happen ?

The job done is:

=over

=item *

Get the file (LWP) if needed

=item *

Parse page to find include images (gif, jpg, flash)

=item *

Attach them to mail with adequat header if asked (default)

=item *

Include external CSS,Javascript file

=item *

Replace relative url with absolute one

=item *

Build the final MIME-Lite object with each part found

=back

=cut

## the next one is just to see if =cut is recognized
sub foo
  {
    my $class = shift;
    my $self = {};
    bless $self, $class;
    $content =~ s/^.*content:.*?\"//i;
  }


$theline =~ s/(<=|=>|=|\-|\+|\*|\/|\*\*|;|:|\\|\'|\"|,|\.|\(|\)|\[|\]|\{|\}|<|>)/\<span class\=\"op\"\>$1\<\/span>/g;

$theline =~ s/(<=|=>|=|\-|\+|\*|\/|\*\*|;|:|\\|\'|\"|,|\.|\(|\)|\[|\]|\{|\}|<|>)/g;

if($#ARGV==2){}

$someString =~ m/anything/gix ;
$someString =~  /anything/    ;
if($someString =~  /anything/g   ){}
if(                /anything/    ){}

if($somestring =~  s/something/something else/gi ){}
$somestring =~   /something/something else/   ;
$somestring =~ qr/something/something else/   ;
