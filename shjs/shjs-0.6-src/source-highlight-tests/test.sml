fun map (f : 'a -> 'b, xs : 'a list) : 'b list =
  case xs of
    nil => nil
  | (y::ys) => (f (y))::(map (f, ys));

fun zip (xs : 'a list, ys : 'b list) : ('a * 'b) list =
  case (xs, ys) of
    (nil, _) => nil
  | (_, nil) => nil
  | (b::bs, c::cs) => (b, c)::(zip (bs, cs));

fun filter (f : 'a -> bool, xs : 'a list) : 'a list =
  case xs of
    nil => nil
  | (y::ys) =>
      if f (y) then
        y::(filter (f, ys))
      else
        filter (f, ys);

fun foldl (f : 'a * 'b -> 'a, n : 'a, xs : 'b list) : 'a =
  case xs of
    nil => n
  | (y::ys) => foldl (f, f (n, y), ys);

fun upto (x : int, y : int) : int list =
  if x <= y then
    x::(upto (x + 1, y))
  else
    nil;

fun sum (xs : int list) : int = 
  case xs of
    nil => 0
  | (x'::xs') => x' + sum (xs');
  
fun fold (opr: int*int->int, base: int, xs: int list) : int = 
  case xs of
    nil => base
  | (x'::xs') => opr(x', fold(opr, base, xs'));

fun add(x,y) = x+y;

fun foldsum (xs: int list) = fold (add,0, xs);

fun foldr (opr: 'b*'a->'a, base: 'a, xs: 'b list) : 'a = 
  case xs of
    nil => base
  | (x'::xs') => opr(x', foldr(opr, base, xs'));




