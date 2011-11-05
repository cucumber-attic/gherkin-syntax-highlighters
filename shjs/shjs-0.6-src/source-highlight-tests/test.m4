dnl @synopsis AC_CTAGS_FLAGS
dnl
dnl check whether it's the correct version of ctags

AC_DEFUN([AC_CTAGS_FLAGS],
[AC_CACHE_CHECK(whether ${CTAGS} accept --excmd, ac_ctags_flags,
[echo 'void f(){}' > conftest.c
if test -z "`${CTAGS} --excmd=n -f conftags conftest.c 2>&1`"; then
  ac_ctags_flags=yes
else
  ac_ctags_flags=no
fi
rm -f conftest*
rm -f conftags*
])])

AC_DEFUN([adl_NORMALIZE_PATH],
[case ":[$]$1:" in
# change empty paths to '.'
  ::) $1='.' ;;
# strip trailing slashes
  :*[[\\/]]:) $1=`echo "[$]$1" | sed 's,[[\\/]]*[$],,'` ;;
  :*:) ;;
esac
# squeze repeated slashes
case ifelse($2,,"[$]$1",$2) in
# if the path contains any backslashes, turn slashes into backslashes
 *\\*) $1=`echo "[$]$1" | sed 's,\(.\)[[\\/]][[\\/]]*,\1\\\\,g'` ;;
# if the path contains slashes, also turn backslashes into slashes
 *) $1=`echo "[$]$1" | sed 's,\(.\)[[\\/]][[\\/]]*,\1/,g'` ;;
esac])
