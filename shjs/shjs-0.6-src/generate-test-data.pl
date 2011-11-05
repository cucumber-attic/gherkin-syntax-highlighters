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

my $async = 0;

my %lang_map;
open MAP, 'source-highlight-lang/lang.map' or die;
while (<MAP>) {
  if (m/(\w+)\s*=\s*(\w+)\.lang/) {
    $lang_map{$1} = $2;
  }
}
close MAP;

sub get_language($) {
  my $file_name = shift;
  $file_name =~ m/^.+\.(.+)$/ or die;
  my $lang = $lang_map{$1};
  if (not (defined $lang and -f "lang/sh_$lang.js")) {
    die "Could not get language for file $file_name";
  }
  return $lang;
}

################################################################################
# generate the large file

if (grep {$_ eq '--async'} @ARGV) {
  $async = 1;
}

my $file;
my $function;
if ($async) {
  $file = 'test-data-async.html';
  $function = 'test_data_async';
}
else {
  $file = 'test-data.html';
  $function = 'test_data';
}

open LARGE, '>', $file or die;
select LARGE;

print <<'ZZZ';
<html>
<head>
<title></title>
<link rel=stylesheet type="text/css" href="jsdifflib/diffview.css">
<script type="text/javascript" src="jsdifflib/difflib.js"></script>
<script type="text/javascript" src="jsdifflib/diffview.js"></script>

<link rel=stylesheet type="text/css" href="test-data.css">
<link rel=stylesheet type="text/css" href="sh_style.min.css">
<script type="text/javascript" src="test-data.js"></script>
<script type="text/javascript" src="sh_main.min.js"></script>
ZZZ

if (not $async) {
  foreach (glob("lang/*.min.js")) {
    print <<"ZZZ";
<script type="text/javascript" src="$_"></script>
ZZZ
  }
}

print <<"ZZZ";
</head>
<body onload="$function();">
<pre id="debug"></pre>
<table>
ZZZ

foreach my $file_name (glob 'tests/* source-highlight-tests/*') {
  my $lang = get_language($file_name);
  local $/;

  my $expected = `./source-highlight.sh $file_name`;
  $expected =~ s/<\/?tt>//g;
  $expected =~ s/<pre>/<pre class="sh_sourceCode">/g;
  $expected =~ s/<span class="normal">(.*?)<\/span>/$1/g;
  $expected =~ s/<span class="(.+?)">/<span class="sh_$1">/g;
#  $expected =~ s/(.)<\/pre>$/$1\n<\/pre>/;

  open FILE, $file_name or die;
  my $actual = <FILE>;
  close FILE;
  $actual =~ s/&/&amp;/g;
  $actual =~ s/</&lt;/g;
  $actual =~ s/>/&gt;/g;

  print <<"ZZZ";
<tr>
<td>$expected</td>
<td><pre class="sh_$lang">$actual</pre></td>
</tr>
ZZZ
}

print <<'ZZZ';
</table>
</body>
</html>
ZZZ

close LARGE;
