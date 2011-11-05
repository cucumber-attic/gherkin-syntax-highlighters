#! /bin/sh

# this shell script is for test purpose only
# so it should not be executed

case $revision in
        0|[1-9]|[1-9][0-9]|[
1-9][0-9][0-9]|[1-9][0-9][
0-9][0-9]|[1-9][0-9][0-9
][0-9][0-9]) ;;


for source in $1; do
        source-highlight --failsafe -f esc -i $source;
done

# these are variables
$abc, $(abc) and ${abc} ${abc)

# and also these are variables
($myvar) {$myvar} {$myvar)

eval std_shrext=\"$shrext_cmds\"

disable_libs=no

    if test -n "$shlibpath_var"; then
      # get the directories listed in $shlibpath_var
      eval shlib_search_path=\`\$echo \"X\${$shlibpath_var}\" \| \$Xsed -e \'s/:/ /g\'\`
    else
      shlib_search_path=
    fi

for as_dir in /bin$PATH_SEPARATOR/usr/bin$PATH_SEPARATOR$PATH
do
  IFS=$as_save_IFS
  test -z "$as_dir" && as_dir=.
  for as_base in sh bash ksh sh5; do
         case $as_dir in
         /*)
           if ("$as_dir/$as_base" -c '
  as_lineno_1=$LINENO
  as_lineno_2=$LINENO
  as_lineno_3=`(expr $as_lineno_1 + 1) 2>/dev/null`
  test "x$as_lineno_1" != "x$as_lineno_2" &&
  test "x$as_lineno_3"  = "x$as_lineno_2" ') 2>/dev/null; then
             $as_unset BASH_ENV || test "${BASH_ENV+set}" != set || { BASH_ENV=; export BASH_ENV; }
             $as_unset ENV || test "${ENV+set}" != set || { ENV=; export ENV; }
             CONFIG_SHELL=$as_dir/$as_base
             export CONFIG_SHELL
             exec "$CONFIG_SHELL" "$0" ${1+"$@"}
           fi;;
         esac
       done
done
;;
  esac
