#
# spec file for package GNU Source Highlight (Version 1.x)
# 
# Author: Christian W. Zuckschwerdt <zany@triq.net>, Jan 2003
#

Summary:   syntax highlighting for source documents
Name:      source-highlight
Version:   2.10
Release:   2.10
License:   GPL
Group:     Utilities/Console
Source:    ftp://ftp.gnu.org/gnu/source-highlight/%{name}-%{version}.tar.gz
URL:       http://www.gnu.org/software/src-highlite/
BuildRoot: %{_tmppath}/%{name}-%{version}-root

%description  
This program, given a source file, produces a document
with syntax highlighting.  Both source languages and output formats
can be specified with a simple syntax and added dynamically.  At the
moment this package can handle many programming languages, such as,
e.g., Java, C/C++, Prolog, Perl, Php3, Python, Flex, ChangeLog, etc.
as source languages, and some output formats such, as, e.g., HTML,
XHTML, LaTeX, etc.

%prep
%setup -q

%build
./configure $MYARCH_FLAGS \
	--prefix=%{_prefix} \
	--mandir=%{_mandir} \
	--datadir=%{_datadir}

make

%install
rm -rf $RPM_BUILD_ROOT

make DESTDIR=$RPM_BUILD_ROOT install

%clean
rm -rf $RPM_BUILD_ROOT

%files
%defattr(644, root, root, 755)
%doc README COPYING ChangeLog TODO.txt AUTHORS THANKS
%doc doc/*.html doc/*.css
%attr(755,root,root) %{_prefix}/bin/*
%{_datadir}/%{name}/*
%{_mandir}/man?/*

