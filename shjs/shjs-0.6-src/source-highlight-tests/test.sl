#!/usr/bin/env slsh

require ("curl");

private variable My_Language = "English";

private variable Supported_Translations = 
  ["zh_en", "zt_en", "en_zh", "en_zt", "en_nl", "en_fr", "en_de", "en_el",
   "en_it", "en_ja", "en_ko", "en_pt", "en_ru", "en_es", "nl_en", "nl_fr",
   "fr_en", "fr_de", "fr_el", "fr_it", "fr_pt", "fr_nl", "fr_es", "de_en",
   "de_fr", "el_en", "el_fr", "it_en", "it_fr", "ja_en", "ko_en", "pt_en",
   "pt_fr", "ru_en", "es_en", "es_fr"];

private variable Languages = Assoc_Type[String_Type];
private define add_language (lang, desc)
{
   Languages[strlow(lang)] = strlow (desc);
}
add_language ("zh", "Chinese-simple");
add_language ("zt", "Chinese-traditional");
add_language ("en", "English");
add_language ("nl", "Dutch");
add_language ("fr", "French");
add_language ("de", "German");
add_language ("el", "Greek");
add_language ("it", "Italian");
add_language ("ja", "Japanese");
add_language ("ko", "Korean");
add_language ("pt", "Portugese");
add_language ("ru", "Russian");
add_language ("es", "Spanish");

private define lookup_language (lang)
{
   lang = strlow (lang);
   if (assoc_key_exists (Languages, lang))
     return lang;
   variable vals = assoc_get_values (Languages);
   variable i = where (vals == lang);
   if (length (i) == 0)
     throw NotImplementedError, "Language $lang is unknown or unsupported"$;

   return assoc_get_keys (Languages)[i[0]];
}

private define lookup_translation (from, to)
{
   variable trans = sprintf ("%s_%s", lookup_language (from), lookup_language(to));
   
   if (any (Supported_Translations == trans))
     return trans;
   
   throw NotImplementedError, "Translating from $from to $to is not supported"$;
}

   
private define make_encode_table ()
{
   variable table = array_map (String_Type, &sprintf, ("%%%02X", [0:255]));
   variable ok = [['A':'Z'], ['a':'z'], ['0':'9'], '.', '-', '*', '_', '/', '~'];
   table[ok] = array_map (String_Type, &char, ok);
   table[' '] = "+";
   return table;
}
private variable Encode_Table = make_encode_table ();

private define encode (text)
{
   variable len = strlen (text);
   variable new_text = String_Type[len];
   variable i;
   _for i (0, len - 1, 1)
     new_text[i] =  Encode_Table[text[i]];
   return strjoin (new_text, "");
}

private define parse_output (str)
{
   (str,) = strreplace (str, "\n", "\x01", strbytelen (str));
   % Look for TEXT in
   % <td bgcolor=white class=s><div style=padding:10px;>TEXT</div>
   variable start_re = "<td bgcolor=white class=s><div style=padding:10px;>";
   variable end_re = "</div>";
   variable re = strcat (start_re, "\([^<]+\)"R, end_re);
   
   variable n = string_match (str, re, 1);
   if (n == 0)
     return "";
   variable pos, match_len;
   (pos, match_len) = string_match_nth (1);
   str = substrbytes (str, pos + 1, match_len);
   (str,) = strreplace (str, "\x01", "\n", strbytelen (str));
   return str;
}

private define write_callback (vp, data)
{
   @vp = strcat (@vp, data);
   return 0;
}

define babelfish (from, to, text)
{
   variable c = curl_new ("http://babelfish.altavista.com/babelfish/tr?il=en");
   variable postdata = 
     strcat ("doit=done&urltext=", text, 
	     "&lp=", lookup_translation (from, to),
	     "&Submit=Translate", "&enc=utf8");

   curl_setopt (c, CURLOPT_POSTFIELDS, postdata);
   curl_setopt (c, CURLOPT_FOLLOWLOCATION);
   curl_setopt (c, CURLOPT_HTTPHEADER, 
		["User-Agent: S-Lang cURL Module",
		 "Content-Type: application/x-www-form-urlencoded",
		 "Accept-Charset: ISO-8859-1,utf-8"
		 ]);
   text = "";
   curl_setopt (c, CURLOPT_WRITEFUNCTION, &write_callback, &text);
   curl_perform (c);
   text = parse_output (text);
   return text;
}

private define usage ()
{
   () = fprintf (stderr, "Usage: %s [--to lang-out] lang-in [phrase|-]\n", __argv[0]);
   exit (1);
}

define slsh_main ()
{
   variable lang_out = My_Language, lang_in = NULL;
   variable i = 1;
   while (i < __argc)
     {
	variable arg = __argv[i];
	i++;
	if (arg == "--to")
	  {
	     if (i == __argc)
	       usage ();
	     lang_out = __argv[i];
	     i++;
	     continue;
	  }
	lang_in = arg;
	break;
     }
   if (lang_in == NULL)
     usage ();

   variable text = "-";
   if (i == __argc)
     {
	if (isatty (stdin))
	  usage ();
     }
   else text = strjoin (__argv[[i:]], " ");
   
   if (text == "-")
     {
	text = "";
	variable line;
	while (-1 != fgets (&line, stdin))
	  text = strcat (text, encode (line));
     }
   message (babelfish (lang_in, lang_out, text));
}

