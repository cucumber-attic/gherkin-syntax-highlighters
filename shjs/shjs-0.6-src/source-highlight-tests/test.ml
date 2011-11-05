open Graphics
open Types
(* #load "graphics.cma" *)
(* #load "fixed.cmo" *)

let _ = open_graph " 1024x768"
let _ = set_color black

let plot_car =
  let size_y = size_y () in
  fun ({x=x; y=y},_,_) ->
    Graphics.plot (Fixed.to_coord x) (size_y - Fixed.to_coord y)

let plot freq cars =
  ignore
  (List.fold_left (fun counter car -> if counter <= 0
		   then (plot_car car; freq)
		   else pred counter) freq cars)

let list_iteri f l =
  ignore (List.fold_left (fun i elt -> f i elt; i+1) 0 l)

let array_for_all f a =
  let length = Array.length a in
  let rec loop i =
    if i = length then true else f a.(i) && loop (i+1) in
    loop 0

let rec dedoublonne = function
  |a::b::q -> if a = b then dedoublonne (b::q) else a :: dedoublonne (b::q)
  |[a] -> [a]
  |[] -> []

let merge_songs db = function
  | [] | [_] -> ()
  | id :: id's ->
    let mysql_ids = List.map ml642int id's in
    ()
