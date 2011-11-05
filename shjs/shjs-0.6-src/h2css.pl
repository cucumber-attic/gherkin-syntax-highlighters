#!/usr/bin/perl

# SHJS - Syntax Highlighting in JavaScript
# Copyright (C) 2007, 2008 gnombat@users.sourceforge.net
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

use strict;
use warnings;

use Data::Dumper;

my $HEX = '[0-9A-Fa-f]';

my $style;
if (@ARGV) {
  open $style, $ARGV[0] or die;
}
else {
  $style = \*STDIN;
}

my %style;

while (<$style>) {
  chomp;
  s/#.*//;
  if ($_ eq '') {
    next;
  }
  if (m/^\$([A-Z_-]+(?:\([a-z]+\))?)=(${HEX}{2})\s+(${HEX}{2})\s+($HEX{2})(?:\s+(bold|italic))?\s*$/o) {
    $style{$1} = {
      bold => (defined $5 and $5 eq 'bold'),
      italic => (defined $5 and $5 eq 'italic'),
      color => "$2$3$4"
    };
  }
  elsif (m/^\$FONTSIZE=\d+$/) {
    # ignore
  }
  else {
    die $ARGV[0];
  }
}

close $style;

my %h2sh = (
  'KW_GROUP(kwa)' => 'keyword',
  'KW_GROUP(kwb)' => 'type',
  'KW_GROUP(kwc)' => 'variable',
  'KW_GROUP(kwd)' => 'function',
  NUMBER => 'number',
  ESCAPECHAR => 'specialchar',
  STRING => 'string',
  COMMENT => 'comment',
  DIRECTIVE => 'preproc',
  SYMBOL => 'symbol',
);

my $sh = {};
my %sh;

while (my ($key, $value) = each %style) {
  if ($key eq 'DEFAULTCOLOUR') {
    $sh = {%$sh, %$value};
  }
  elsif ($key eq 'BGCOLOUR') {
    $sh = {%$sh, bgcolor => $value->{color}};
  }
  elsif ($key eq 'STRING_DIRECTIVE' or $key eq 'SL-COMMENT' or $key eq 'LINE') {
    # ignore
  }
  else {
    die $key unless exists $h2sh{$key};
    my $class = $h2sh{$key};
    $sh{$class} = $value;
  }
}

if (exists $sh{symbol}) {
  $sh{cbracket} = $sh{symbol};
}

my $color = $sh->{color};
my $bold = $sh->{bold}? 'bold': 'normal';
my $italic = $sh->{italic}? 'italic': 'normal';
my $background_color = $sh->{bgcolor} || '#ffffff';
print <<"ZZZ";
pre.sh_sourceCode {
  background-color: #$background_color;
  color: #$color;
  font-weight: $bold;
  font-style: $italic;
}

ZZZ

my %nearest = (
  regexp => 'string',
  url => 'string',
  date => 'keyword',
  time => 'keyword',
  file => 'keyword',
  ip => 'string',
  name => 'string',
  oldfile => 'specialchar',
  newfile => 'string',
  difflines => 'keyword',
  selector => 'variable',
  property => 'keyword',
  value => 'string',
);

for my $class (qw(keyword type string regexp specialchar comment number preproc symbol function cbracket
                  url
                  date time file ip name
                  variable
                  oldfile newfile difflines
                  selector property value)) {
  my $obj; 
  if (exists $sh{$class}) {
    $obj = $sh{$class};
  }
  elsif (exists $nearest{$class}) {
    $obj = $sh{$nearest{$class}};
  }
  else {
    next;
  }
  my $color = $obj->{color};
  my $bold = $obj->{bold}? 'bold': 'normal';
  my $italic = $obj->{italic}? 'italic': 'normal';
  print <<"ZZZ";
pre.sh_sourceCode .sh_$class {
  color: #$color;
  font-weight: $bold;
  font-style: $italic;
}

ZZZ
}
