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

use_ok('Regex::Boost');

is(Regex::Boost::boost2js('test'), 'test');
is(Regex::Boost::boost2js('x*'), 'x*');
is(Regex::Boost::boost2js('x\*'), 'x\*');
is(Regex::Boost::boost2js('/\*'), '/\*');
ok((not defined Regex::Boost::boost2js('(?<=x)y')), "JavaScript doesn't support lookbehind");
