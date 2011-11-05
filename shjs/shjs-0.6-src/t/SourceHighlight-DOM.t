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
use Test::More 'no_plan';

use_ok('SourceHighlight::DOM');

my $source_highlight_file = <<'ZZZ';
foo = 'bar'
comment delim "/*" "*/"
environment comment delim "/**" "*/" multiline nested begin
  type = '@[[:alpha:]]+'
end
ZZZ
my $tree = SourceHighlight::DOM::parse($source_highlight_file);
isa_ok($tree, 'ARRAY');
is(@$tree, 3);
isa_ok($tree->[0], 'HASH');
is($tree->[0]{type}, 'SimpleDefinition');
is($tree->[0]{class}, 'foo');
is_deeply($tree->[0]{regex}, [['bar']]);
ok(not $tree->[0]{redef});
ok(not $tree->[0]{subst});
ok(not $tree->[0]{nonsensitive});
