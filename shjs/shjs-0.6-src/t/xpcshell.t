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

use Test::More 'no_plan';
use Test::Differences;

my %lang;
open LANGMAP, 'source-highlight-lang/lang.map' or die;
while (<LANGMAP>) {
  if (m/(\S+)\s*=\s*(\S+\.lang)/) {
    $lang{$1} = $2;
  }
  else {
    die;
  }
}
close LANGMAP;

my @interpreters = (
  'rhino',
  'xpcshell',
);

foreach my $interpreter (@interpreters) {
  foreach my $program (glob "tests/* source-highlight-tests/test*") {
    my $extension = (split /\./, $program)[1];
    my $lang = $lang{$extension};
    die unless defined $lang;
    $lang =~ s/\..+$//;

    my $expected = `./source-highlight.sh $program`;
    $expected =~ s/\A<!--.*-->\n//s;
    $expected =~ s/<span class="normal">(.*?)<\/span>/$1/g;
    $expected =~ s/\r\n/\n/g;
    open EXPECTED, '>', "$lang-EXPECTED" or die;
    print EXPECTED $expected;
    close EXPECTED;
    ok($expected =~ m/^<pre><tt>/);

    my $command = "$interpreter ./command-line.js --lang $lang $program";
    my $actual = `$command`;
    $actual =~ s/<span class="sh_(.+?)">/<span class="$1">/g;
    $actual =~ s/<span class="normal">(.*?)<\/span>/$1/g;
    $actual =~ s/<span class="attribute">/<span class="type">/g;
    $actual =~ s/<span class="paren">/<span class="cbracket">/g;
    $actual =~ s/<span class="section">/<span class="function">/g;
    $actual =~ s/\r\n/\n/g;
    open ACTUAL, '>', "$lang-ACTUAL" or die;
    print ACTUAL $actual;
    close ACTUAL;
    ok($actual =~ m/^<pre><tt>/);

    my $ok = 1;
    if ($program ne 'source-highlight-tests/test.l' and
        $program ne 'source-highlight-tests/test.ml' and
        $program ne 'source-highlight-tests/test.rb' and
        $program ne 'source-highlight-tests/test.sh' and
        not ($program eq 'source-highlight-tests/test.php3' and $interpreter eq 'rhino')) {
      $ok = $actual eq $expected;
    }
    if ($ok) {
      unlink("$lang-EXPECTED", "$lang-ACTUAL");
    }
    ok($ok, $command);
  }
}
