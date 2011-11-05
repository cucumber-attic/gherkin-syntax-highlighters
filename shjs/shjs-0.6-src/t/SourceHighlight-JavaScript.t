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

use Data::Dumper;
use File::Temp 'tempfile';

use_ok('SourceHighlight::JavaScript');

my $source_highlight_file = <<'ZZZ';
foo = 'bar'
environment comment delim "/**" "*/" multiline nested begin
  type = '@[[:alpha:]]+'
end
ZZZ

my $language = '_TEMP_';
my $language_file = "$language.lang";
open FOO, '>', $language_file or die "Can't open temporary file: $!";
print FOO $source_highlight_file;
close FOO;

close STDOUT;
my $stdout;
open STDOUT, '>', \$stdout or die "Can't open STDOUT: $!";
SourceHighlight::JavaScript::sh2js($language_file);
my $expected = <<"ZZZ";
if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['$language'] = [
  [
    [
      /\\b(?:bar)\\b/g,
      'sh_foo',
      -1
    ],
    [
      /\\/\\*\\*/g,
      'sh_comment',
      1
    ]
  ],
  [
    [
      /\\*\\//g,
      'sh_comment',
      -2
    ],
    [
      /\\/\\*\\*/g,
      'sh_comment',
      1
    ],
    [
      /@[A-Za-z]+/g,
      'sh_type',
      -1
    ]
  ]
];
ZZZ

eq_or_diff_text($stdout, $expected);

is(unlink($language_file), 1);
ok(not -e $language_file);
