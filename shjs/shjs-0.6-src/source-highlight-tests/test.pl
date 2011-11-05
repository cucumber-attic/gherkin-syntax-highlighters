%      +------------------------------+
%      |   test for Prolog source     |
%      |______________________________|

isinteger(X, L) :- type(X, int, L).

% booleans
type(true, bool, _).
type(false, bool, _).

type( and(X,Y), bool, L) :- isboolean(X,L), isboolean(Y,L).
type( or(X,Y), bool, L) :- isboolean(X,L), isboolean(Y,L).
type( not(X), bool, L) :- isboolean(X,L).

type( succ(X), int, L ) :- isinteger(X,L).
type( pred(X), int, L ) :- isinteger(X,L).
type( iszero(X), bool, L ) :- isinteger(X,L).
type( X < Y, bool, L ) :- isinteger(X,L), isinteger(Y,L).

% is_member(X,L) check whether X is in the list
% by using unification with occur check

is_member(_, []) :- fail.
is_member(X, [Y | _]) :- unify(X,Y).
is_member(X, [_ | List]) :- is_member(X, List).
