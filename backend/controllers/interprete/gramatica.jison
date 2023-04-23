/* Definición Léxica */
%lex

%options case-insensitive
%x string

%%


///Simbolos del lenguaje
"="                 return 'IGUAL'; 
";"                 return 'PUNTOYCOMA';
"{"                 return 'LLAVEIZQ';
"}"                 return 'LLAVEDER';
"("                 return 'PARENTESISIZQ';
")"                 return 'PARENTESISDER';
"["                 return 'CORCHETEIZQ'; 
"]"                 return 'CORCHETEDER'; 
"."                 return 'PUNTO'; 

//Operaciones aritmeticaas
"+"                 return 'MAS'; 
"-"                 return 'MENOS'; 
"*"                 return 'POR'; 
"/"                 return 'DIVIDIDO'; 
"^"                 return 'POTENCIA'; 
"%"                 return 'MODULO'; 

//Operadores Relacionales
"=="                return 'IGUAlACION'; 
"!="                return 'DIFERENCIACION';
"<"                 return 'MENOR'; 
">"                 return 'MAYOR'; 
"<="                return 'MENORIGUAL'; 
">="                return 'MAYORIGUAL'; 

//Operador ternario
"?"                 return 'TERNARIO'; 
":"                 return 'DOSPUNTOS'; 

//Operadores logicos
"&&"                return 'AND'; 
"||"                return 'OR'; 
"!"                 return 'NOT'; 

//Incremento y decremento
"++"                return 'INCREMENTO'; 
"--"                return 'DECREMENTO'; 

"true"              return 'TRUE'; 
"false"             return 'FALSE';
//Palabras reservadas
//Tipos de datos
"int"               return 'INT'; 
"string"            return 'STRING'; 
"char"              return 'CHAR'; 
"double"            return 'DOUBLE'; 
"boolean"           return 'BOOLEAN';
//Listas y arreglos
"list"              return 'LIST'; 
"new"               return 'NEW'; 
"add"               return 'ADD'; 
//Sentencias de control
"if"                return 'IF'; 
"else"              return 'ELSE'; 
"else if"           return 'ELSEIF'; 
"switch"            return 'SWITCH'; 
"case"              return 'CASE'; 
"default"           return 'DEFAULT'; 
//Sentencias ciclicas
"while"             return 'WHILE'; 
"for"               return 'FOR'; 
"do"                return 'DO'; 
//Sentencias de Transferencia
"break"             return 'BREAK'; 
"continue"          return 'CONTINUE'; 
"return"            return 'RETURN'; 
//Funciones y Métodos
"void"              return 'VOID'; 
//Funciones
"print"             return 'PRINT'; 
"tolower"           return 'TOLOWER'; 
"toupper"           return 'TOUPPER'; 

/* Espacios en blanco */
[ \r\t]+            {}                      // espacio en blanco
\n                  {}                      // salto
(\/\/).*                             {}     // comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}     // comentario multilinea

[a-zA-Z][a-zA-Z0-9_]*   return 'ID';
[0-9]+("."[0-9]+)\b     return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
\'((\\\')|[^\n\'])*\'	{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'CADENA';}

//\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); 	return 'CADENA'; }


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex

%{
  // importar tipos
  const {Type} = require('./Abstractas/Return');
  const {Primitivo} = require('./Expresiones/Primitivo');
  const {Print} = require('./Instrucciones/Print');
%}


// PRECEDENCIA DE OPERADORES
%left 'MAS' 'MENOS'
%left 'POR' 'DIVISION' 'MODULO'
%right 'UMENOS '

%start INICIO

%% /* Definición de la gramática */

INICIO
	: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES
	: INSTRUCCIONES INSTRUCCION     { $1.push($2); $$ = $1; }
	| INSTRUCCION                   { $$ = [$1]; }
;

INSTRUCCION
	: DEFPRINT          { $$ = $1; }
  | DECLARAR          { $$ = $1; }
  | REDECLARAR        { $$ = $1; }
	| error PUNTOYCOMA
  {   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;
EXPRESION
  : PRIMITIVO       { $$ = $1; }
  | CREMENTOS       { $$ = $1; }
;


// GRAMATICA IMPRIMIR 
DEFPRINT
    : PRINT PARENTESISIZQ EXPRESION PARENTESISDER PUNTOYCOMA  { $$ = new Print(@1.first_line, @1.first_column,$3); }
;
//Gramatica declarar
DECLARAR
  : TIPO ID PUNTOYCOMA 
  | TIPO ID IGUAL EXPRESION PUNTOYCOMA
;
//Gramatica redeclarar
REDECLARAR
  : ID IGUAL EXPRESION PUNTOYCOMA
;

//Gramatica Casteos
CASTEOS
  : PARENTESISIZQ TIPO PARENTESISDER EXPRESION
;

TIPO
  : INT { $$ = Type.INT; }
  | STRING { $$ = Type.STRING; }
  | CHAR { $$ = Type.CHAR; }
  | DOUBLE { $$ = Type.DOUBLE; }
  | BOOLEAN { $$ = Type.BOOLEAN; }
;

//Gramática de Incremento y decremento
CREMENTOS
  : ID INCREMENTO PUNTOYCOMA
  | ID DECREMENTO PUNTOYCOMA
;

//Gramática de Estructuras de datos
//Vectores
VECTORES
  : TIPO CORCHETEIZQ CORCHETEDER ID IGUAL NEW TIPO CORCHETEIZQ EXPRESION CORCHETEDER PUNTOYCOMA
  | TIPO CORCHETEIZQ CORCHETEDER ID IGUAL LLAVEIZQ EXPRESION LLAVEDER PUNTOYCOMA
;

PRIMITIVO
  : ENTERO          { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.INT); }
  | DECIMAL         { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.DOUBLE); }
  | CADENA          { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.STRING);}
  | CARACTER        { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.CHAR); }
  | TRUE            { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.BOOLEAN); }
  | FALSE           { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.BOOLEAN); }
;