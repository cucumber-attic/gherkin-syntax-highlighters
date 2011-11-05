<?
/*
CircaLib.php3 : provide function to perform search on Circa with PHP
Copyright 2000 A.Barbet alian@alianwebserver.com.  All rights reserved.

Revision 1.1  2000/11/23 22:51:17  Administrateur
addSite.php3

Revision 1.2  2000/10/27 16:01:12  Administrateur
- Navigation par categorie
- Passer le prefixe en variable globale
- Passer la database en variable globale

Revision 1.1  2000/10/22 22:43:47  Administrateur
Premiere version fonctionnelle. Supporte:
- Requetes booleenes
- Affichage par pages de 10 liens

*/

/*

Fonction permettant d'effectuer une recherche par mot dans Circa

Paramètres :

 $template : Masque HTML pour le resultat de chaque lien. La liste des variables définies au
 moment du eval sont : $indiceG,$titre,$description,$url,$facteur,$last_update,$langue

  Exemple de masque :

  '"<p>$indiceG - <a href=\"$url\">$titre</a> $description<br>
   <font class=\"small\"><b>Url:</b> $url <b>Facteur:</b> $facteur
   <b>Last update:</b> $last_update </font></p>\n"'

 $mot    : Séquence des mots recherchés tel que tapé par l'utilisateur
 first   : Indice du premier site affiché dans le résultat
 $id     : Id du site dans lequel effectué la recherche
 $langue : Restriction par langue (facultatif)
 $Url    : Restriction par url : les url trouvées commenceront par $Url (facultatif)
 $create : Restriction par date inscription. Format YYYY-MM-JJ HH:MM:SS (facultatif)
 $update : Restriction par date de mise à jour des pages. Format YYYY-MM-JJ HH:MM:SS (facultatif)
 $catego : Restriction par categorie (facultatif)

Retourne ($resultat,$links,$indice)

 $resultat : Buffer HTML contenant la liste des sites trouves formaté en fonction
             de $template et des mots present dans $mots
 $links    : Liens vers les pages suivantes / precedentes
 $indice   : Nombre de sites trouves

*/

include("foo.php");
include_once("bar.php");

function search($template,$word,$first,$idc,$langue,$Url,$create,$update,$categorie)
         {
         $mots = split( " ", strtolower($word));
         $i=0;
         # Recherche des requetes booleenes
         while( list($key,$valeur) = each ($mots))
                {
                if    ($valeur == '+') {$ind_and[]=$i;} # Reperage de la position des mots 'and'
                else if ($valeur == '-') {$ind_not[]=$i;} # Reperage de la position des mots 'not'
                else {$mots_tmp[]=$valeur;}
                $i++;
                }
         # Recherche SQL
         $tab = search_word(join("','",$mots_tmp),$idc,'','','','','');
         # On supprime tout ceux qui ne repondent pas aux criteres and si present
         if (is_array($ind_and))
             {while( list($key,$ind) = each($ind_and)) {while( list($url,$tab_url) = each ($tab))
                       {if (!appartient($mots[$ind + 1],$tab_url[5])) {unset($tab[$url]);}}}reset($tab);}
         # On supprime tout ceux qui ne repondent pas aux criteres not si present
         if (is_array($ind_not))
             {while( list($key,$ind) = each($ind_not)) {while( list($url,$tab_url) = each ($tab))
                       {if (appartient($mots[$ind + 1],$tab_url[5])) {unset($tab[$url]);}}}reset($tab);}
         $indice=0;$nbResultPerPage=10;
         $lasto = $first + $nbResultPerPage;
         # On met en forme le resultat
         if (is_array($tab))
             {
             while( list($url,$tab_url) = each ($tab))
                {
                $indiceG=$indice + 1;
                list($titre,$description,$facteur,$langue,$last_update,$mot)=$tab_url;

                if (($indice>=$first)&&($indice<$lasto)) {eval($template);}
                # Constitution des liens suivants / precedents
                if (!($indice%$nbResultPerPage))
                        {
                        $nbPage++;
                        if ($indice==$first) {$links.="$nbPage- ";}
                        else {$links.='<a href="'.get_link($indice,$word,$idc).'">'.$nbPage.'</a>- '."\n";}
                        }
                $indice++;
                }
             }
         if ($indice) {$indice="$indice sites trouves";}
         else {$indice="<p>Aucun document trouvé.</p>";}
         return array($resultat,$links,$indice);
         }

/*

Construction de la requete SQL. Son exploitation est faite par search

 $tab    : Reference du hash où mettre le resultat
 $word   : Mot recherché
 $id     : Id du site dans lequel effectué la recherche
 $langue : Restriction par langue (facultatif)
 $Url    : Restriction par url
 $create : Restriction par date inscription
 $update : Restriction par date de mise à jour des pages
 $catego : Restriction par categorie

Retourne le tableau avec le resultat de la recherche
Le hash est constitué comme tel:

      $tab{$url}[0] : titre
      $tab{$url}[1] : description
      $tab{$url}[2] : facteur
      $tab{$url}[3] : langue
      $tab{$url}[4] : date de dernière modification
   @{$$tab{$url}[5]}: liste des mots trouves pour cet url

*/
function search_word($word,$idc,$langue,$Url,$create,$update,$categorie)
         {
         global $prefix;
         global $database;
         if ($langue) {$langue=" and langue='$langue' ";} else {$langue= ' ';}
         if (($Url)&&($Url != 'http://')) {$Url=" and url like '$Url%' ";}          else {$Url=' ';}
         if ($create) {$create="and unix_timestamp('$create')< unix_timestamp(last_check) ";}  else {$create=' ';}
         if ($update) {$update="and unix_timestamp('$update')< unix_timestamp(last_update) ";} else {$update=' ';}
         if ($categorie) {}
         else {$categorie=' ';}
         $requete = "
                select facteur,url,titre,description,langue,last_update,mot
                from   ".$prefix.$idc."links l,".$prefix.$idc."relation r
                where  r.id_site=l.id
                and    r.mot in ('$word')
                $langue $Url $create $update $categorie
                order  by facteur desc";
         $result = mysql_db_query($database,$requete);
         if (!$result) {print "$requete";return ;}
         $RowCount = MySQL_NUMROWS($result);
         while ($i<$RowCount)
                {
                list ($facteur,$url,$titre,$description,$langue,$last_update,$mot)= mysql_fetch_row($result);
                $tab[$url][0] = $titre;
                $tab[$url][1]=$description;
                $tab[$url][2]+=$facteur;
                $tab[$url][3]=$langue;
                $tab[$url][4]=$last_update;
                $tab[$url][5][]=$mot;
                $i++;
                }
         return $tab;
         }

/*

Fonction retournant la liste des categories de la categorie $id dans le site $idr

 $id       : Id de la categorie de depart. Si undef, 0 est utilisé (Considéré comme le "Home")
 $idr           : Id du responsable
 $template : Masque HTML pour le resultat de chaque lien. Si undef, le masque par defaut
             (defini en haut de ce module) sera utlise

Retourne ($resultat,$nom_categorie) :

 $resultat : Buffer contenant la liste des sites formatées en ft de $template
 $nom_categorie : Nom court de la categorie

*/

function categories_in_categorie($id,$idr,$template)
         {
         global $database;
         global $prefix;
         if (!$idr) {$idr=1;}
         if (!$id) {$id=0;}
         $requete = "select id,nom,parent from ".$prefix.$idr."categorie";
         $result = mysql_db_query($database,$requete);
         $RowCount = MySQL_NUMROWS($result);
         $i=0;
         while ($i<$RowCount)
                {
                list ($idc,$nom,$parent)= mysql_fetch_row($result);
                $tab[$idc][0]=$nom;
                $tab[$idc][1]=$parent;
                $i++;
                }
        while( list($key,$val) = each ($tab))
                {
                $nom=$tab[$key][0];
                $parent=$tab[$key][1];
                $nom_complet="<a href=\"".getenv('SCRIPT_NAME')."?browse=1&id=$idr\">Accueil</a>".getParent($key,$idr,$tab);
                $links = get_link_categorie($key,$idr);
                if ($parent==$id) {eval($template);}
                }
        if ($i==0) {$resultat="<p>Plus de catégorie</p>";}
        if ($id!=0) {$titre = "<a href=\"".getenv('SCRIPT_NAME')."?browse=1&id=$idr\">Accueil</a> ".getParent($id,$idr,$tab);}
        else {$titre=" ";}
        return array($resultat,$titre);
        }

/*

Fonction retournant la liste des pages de la categorie $id dans le site $idr

 $id       : Id de la categorie de depart. Si undef, 0 est utilisé (Considéré comme le "Home")
 $idr           : Id du responsable
 $template : Masque HTML pour le resultat de chaque lien. Si undef, le masque par defaut
             (defini en haut de ce module) sera utlise

Retourne le buffer contenant la liste des sites formatées en ft de $template

*/

function sites_in_categorie($id,$idr,$template)
         {
         global $database;
         global $prefix;
         $indiceG=1;$facteur=100;
         if (!$idr) {$idr=1;}
         if (!$id) {$id=0;}
         $i=0;
         $requete = "select url,titre,description,langue,last_update from ".$prefix.$idr."links where categorie=$id and browse_categorie='1' and parse='1'";
         $result = mysql_db_query($database,$requete);
         $RowCount = MySQL_NUMROWS($result);
         while ($i<$RowCount)
                {
                list ($url,$titre,$description,$langue,$last_update)= mysql_fetch_row($result);
                eval($template);
                $indiceG++;$i++;
                }
        if ($i==0) {$resultat="<p>Pas de pages dans cette catégorie</p>";}
        return $resultat;
        }

/*

Rend la chaine correspondante à la catégorie $id avec ses rubriques parentes

*/

function getParent($id,$idr,$tab)
        {
        if (($tab[$id][1]!=0)&&($tab[$id][0])) {$parent = getParent($tab[$id][1],$idr,$tab);}
        if (!$tab[$id][0]) {$tab[$id][0]='Home';}
        $parent.="&gt;<a href=\"".get_link_categorie($id,$idr).'">'.$tab[$id][0]."</a>";
        return $parent;
        }
function getWLParent($id,$idr,$tab)
        {
        if (($tab[$id][1]!=0)&&($tab[$id][0])) {$parent = getWLParent($tab[$id][1],$idr,$tab);}
        if (!$tab[$id][0]) {$tab[$id][0]='Home';}
        $parent.="&gt;".$tab[$id][0];
        return $parent;
        }
/*

Retourne 1 si $var appartient à $liste, 0 sinon.

*/
function appartient($var,$liste)
         {
         while( list($key,$val) = each ($liste)) {if ($val==$var) {return 1;}}
         return 0;
         }
/**
 * Retourne l'URL correspondant à la page no $no_page dans la recherche en cours
 */
function get_link($no_page,$word,$id)
         {
         $buf = getenv('SCRIPT_NAME')."?word=".urlencode($word)."&id=".$id."&first=".$no_page;
         if ($nbResultPerPage) {$buf.="&nbResultPerPage=".$nbResultPerPage;}
         return $buf;
         }
/**
 * Retourne l'URL correspondant à la categorie no $no_categorie
 */
function get_link_categorie($no_categorie,$id) {return getenv('SCRIPT_NAME')."?categorie=$no_categorie&id=$id";}

/**
 * Retourne le nom du site dans la table responsable correspondant à l'id $id
 */

function get_name_site($id,$prefix)
        {
        #$result = mysql_db_query("circa","select titre from ".$this->{PREFIX_TABLE}."responsable where id=$id");
        #$sth->execute() || print "Erreur: $DBI::errstr\n";
        #my ($titre)=$sth->fetchrow_array;
        #$sth->finish;
        return $titre;
        }

function get_liste_categorie($idr)
         {
         global $database;
         global $prefix;
         $requete = "select id,nom,parent from ".$prefix.$idr."categorie";
         $result = mysql_db_query($database,$requete);
         $RowCount = MySQL_NUMROWS($result);
         $i=0;
         while ($i<$RowCount)
                {
                list ($idc,$nom,$parent)= mysql_fetch_row($result);
                $tab[$idc][0]=$nom;
                $tab[$idc][1]=$parent;
                $i++;
                }
        while( list($key,$val) = each ($tab))
                {
                $nom=$tab[$key][0];
                $parent=$tab[$key][1];
                $buf.="<option value=\"$key\">".getWLParent($key,$idr,$tab)."</option>";
                }
        return $buf;
        }

function addSite($url,$categorie)
         {
         global $database;
         global $prefix;
         global $idr;
         $requete="insert into ".$prefix.$idr."links (url,titre,description,langue,valide,categorie,browse_categorie)
                   values ('$url',' ',' ','fr',0,$categorie,'1')";
         $result = mysql_db_query($database,$requete);
         }
?>
