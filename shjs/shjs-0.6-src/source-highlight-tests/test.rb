#!/usr/bin/env ruby
#
# comment

require "English"

#{expression}

#{
  expression
} 

cnf.marked.any? ? cnf.marked.to_a.join!(',') : "nothing"

BEGIN {
  puts "Hello! in \"BEGIN\"" # comment
  puts 'World! in \'BEGIN\'' # comment
}
END {
  puts 'bye! in "END"'
}

p $"
p $'
p $/

puts __LINE__
puts __FILE__

a = [1, 2, 3, 4, "foo", "bar"]
a = %w(1, 2, 3, 4, "foo", "bar")
h = {"foo" => 1, "bar" => 3}
$global = 1

print("with parenthesis\n")
print "without parenthesis\n"
print 12345678, "\n"
print 1.2345678, "\n"
print a[0], a[1], "\n"
print h['foo'], h[1], "\n"
print $global, "\n"
print `date`
print <<EOM
ppp
EOM
print <<"EOM"
ppp
EOM

def foo
  puts "foo"
end

module M
end

class Klass
  include M
  @@foo = "bar"
  def initialize
    @foo = "bar"
  end
  def foo
    puts @@foo
    return [nil, false, self, true]
  end
end

foo
foo()

k = Klass.new
k.foo
k.foo()

p [(1 and 2), (1 or 2), (not nil)]

str = "abc"
p /d/ =~ str
p %r|a| =~ str
p %r!a! =~ str
/"d/ =~ str # problem " in Regexp
/'d/ =~ str # problem ' in Regexp

if %r{foo(\{?\}?[A-Z]\{?\}?bar#{myvar})} =~ 'foo{A}bar'
  puts 'foo'
end

