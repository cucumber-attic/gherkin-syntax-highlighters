#! /usr/bin/python

import posix
from string import splitfields

def userinfo(filename):
  """
  This function returns the list of users
  and a table containing users and their passwords
  """
  users, table = [], {}
  file = open(filename, 'r')
  for line in file.readlines():
    [name, password] = splitfields(line, ':')[:2]
    users.append(name)
    table[name] = password
  return users, table

def main():
  for filename in ('/etc/passwd', 'etc/passwd.bak'):
    try:
      users, table = userinfo(filename)
      print table.keys()[3:7], table['postgres']
      posix.system('ls -al ' + filename)
    except:
      print 'File "' + filename + '" not found!'

main()

q.execute('''
    select * from
        foo,bar,baz
    where
        foo.blah=bar.blah
        and baz.spam="eggs"
    ''')
