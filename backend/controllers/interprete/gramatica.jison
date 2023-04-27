/* Definición Léxica */
%lex

%options case-insensitive
%x string 
%x COMMENT

%%
(\/\/).*                             {}     // comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}     // comentario multilinea
///Simbolos del lenguaje
";"                 return 'PUNTOYCOMA';
"{"                 return 'LLAVEIZQ';
"}"                 return 'LLAVEDER';
"("                 return 'PARENTESISIZQ';
")"                 return 'PARENTESISDER';
"["                 return 'CORCHETEIZQ'; 
"]"                 return 'CORCHETEDER'; 
"."                 return 'PUNTO'; 
","                 return 'COMA';

//Operaciones aritmeticaas
"+"                 return 'MAS'; 
"-"                 return 'MENOS'; 
"*"                 return 'POR'; 
"/"                 return 'DIVIDIDO'; 
"^"                 return 'POTENCIA'; 
"%"                 return 'MODULO'; 

//Operadores Relacionales
"=="                return 'IGUALACION'; 
"!="                return 'DIFERENCIACION';
"<"                 return 'MENOR'; 
">"                 return 'MAYOR'; 
"<="                return 'MENORIGUAL'; 
">="                return 'MAYORIGUAL'; 
"="                 return 'IGUAL'; 
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


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%{
  // importar tipos
  const {Type} = require('./Abstractas/Return');
  const {Primitivo} = require('./Expresiones/Primitivo');
  const {Print} = require('./Instrucciones/Print');
  const {Declarar} = require('./Instrucciones/Declarar');
  const {Acceso} = require('./Expresiones/Acceso');
  const {Aritmetica} = require('./Expresiones/Aritmetica');
  const {TipoOperacion} = require('./Utils/TipoOperacion');
  const {Relacionales} = require('./Expresiones/Relacionales');
  const {TipoRelacional} = require('./Utils/TipoRelacional');
  const {Logicos} = require('./Expresiones/Logicos');
  const {TipoLogicos} = require('./Utils/TipoLogicos');
  const {Ternario} = require('./Expresiones/Ternario');
  const {Statement} = require('./Instrucciones/Statement');
  const {Funcion} = require('./Instrucciones/Funcion');
  const {Parametros} = require('./Expresiones/Parametros');
  const {LlamadaFuncion} = require('./Expresiones/LlamadaFuncion');

%}


// PRECEDENCIA DE OPERADORES
%left 'TERNARIO' 'DOSPUNTOS' 
%left 'OR'
%left 'AND' 
%right 'NOT'
%left 'MENOR' 'MAYOR' 'MENORIGUAL' 'MAYORIGUAL' 'IGUALACION' 'DIFERENCIACION' 
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO' 'MODULO'
%left 'POTENCIA'
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
  | FUNCION           { $$ = $1; }
  | LLAMADAFUNCION    { $$ = $1; }
	| error PUNTOYCOMA
  {   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;

// GRAMATICA IMPRIMIR 
DEFPRINT
    : PRINT PARENTESISIZQ EXPRESION PARENTESISDER PUNTOYCOMA  { $$ = new Print(@1.first_line, @1.first_column,$3); }
;

//Gramatica declarar
DECLARAR
  : TIPO ID PUNTOYCOMA { $$ = new Declarar($2, $1, null, @1.first_line, @1.first_column );}
  | TIPO ID IGUAL EXPRESION PUNTOYCOMA { $$ = new Declarar($2, $1, $4, @1.first_line, @1.first_column );}
;

//GRAMÁTICA FUNCION
FUNCION
  : TIPO ID PARENTESISIZQ PARENTESISDER STATEMENT { $$ = new Funcion($1, $2, [],$5,@1.first_line, @1.first_column)}
  | TIPO ID PARENTESISIZQ PARAMETROS PARENTESISDER STATEMENT  { $$ = new Funcion($1, $2, $4,$6,@1.first_line, @1.first_column)}
;
//GRAMATICA STATEMENT
STATEMENT
  : LLAVEIZQ INSTRUCCIONES LLAVEDER { $$ = new Statement($2,@1.first_line, @1.first_column) }
;

PARAMETROS
  : PARAMETROS COMA PARAMETRO { $1.push($3); $$ = $1;}
  | PARAMETRO                 { $$ = [$1];}
;

PARAMETRO
  : TIPO ID { $$ = new Parametros($1, $2, @1.first_line, @1.first_column); }
;

EXPRESION
  : PRIMITIVO       { $$ = $1; }
  | ACCEDERVAR      { $$ = $1; }
  | ARITMETICA      { $$ = $1; }
  | RELACIONALES    { $$ = $1; }
  | LOGICOS         { $$ = $1; }
  | PARENTESISIZQ EXPRESION PARENTESISDER { $$ = $2; }
;

//Llamada a función
LLAMADAFUNCION 
  : ID PARENTESISIZQ PARENTESISDER PUNTOYCOMA { $$ = new LlamadaFuncion($1,[],@1.first_line, @1.first_column)}
  | ID PARENTESISIZQ ARGUMENTOS PARENTESISDER PUNTOYCOMA { $$ = new LlamadaFuncion($1,$3,@1.first_line, @1.first_column)}
;

ARGUMENTOS
  : ARGUMENTOS COMA EXPRESION { $1.push($3); $$ = $1;}
  | EXPRESION                 { $$ = [$1];}
;

//GRAMÁTICA TERNARIOS

//GRAMATICA ARITMETICA
ARITMETICA
  : EXPRESION MAS EXPRESION { $$ = new Aritmetica($1, $3, TipoOperacion.SUMA, @1.first_line, @1.first_column); }
  | EXPRESION MENOS EXPRESION { $$ = new Aritmetica($1, $3, TipoOperacion.RESTA, @1.first_line, @1.first_column); }
  | EXPRESION POR EXPRESION { $$ = new Aritmetica($1, $3, TipoOperacion.MULTIPLICACION, @1.first_line, @1.first_column); }
  | EXPRESION DIVIDIDO EXPRESION { $$ = new Aritmetica($1, $3, TipoOperacion.DIVISION, @1.first_line, @1.first_column); }
  | EXPRESION MODULO EXPRESION { $$ = new Aritmetica($1, $3, TipoOperacion.MODULO, @1.first_line, @1.first_column); }
  | EXPRESION POTENCIA EXPRESION { $$ = new Aritmetica($1, $3, TipoOperacion.POTENCIA, @1.first_line, @1.first_column); }
  | MENOS EXPRESION %prec UMENOS { $$ = new Aritmetica($2, $2, TipoOperacion.MENOSUNARIO, @1.first_line, @1.first_column); }
;

//GRAMÁTICA LOGICOS
LOGICOS 
  : EXPRESION AND EXPRESION { $$ = new Logicos($1, $3, TipoLogicos.AND, @1.first_line, @1.first_column); }
  | EXPRESION OR EXPRESION { $$ = new Logicos($1, $3, TipoLogicos.OR, @1.first_line, @1.first_column); }
  | NOT EXPRESION { $$ = new Logicos($2, $2, TipoLogicos.NOT, @1.first_line, @1.first_column); }
;

//GRAMÁTICA RELACIONALES
RELACIONALES
  : EXPRESION IGUALACION EXPRESION { $$ = new Relacionales($1, $3, TipoRelacional.IGUALACION, @1.first_line, @1.first_column); }
  | EXPRESION DIFERENCIACION EXPRESION { $$ = new Relacionales($1, $3, TipoRelacional.DIFERENTE, @1.first_line, @1.first_column); }
  | EXPRESION MENOR EXPRESION { $$ = new Relacionales($1, $3, TipoRelacional.MENOR, @1.first_line, @1.first_column); }
  | EXPRESION MENORIGUAL EXPRESION { $$ = new Relacionales($1, $3, TipoRelacional.MENORIGUAL, @1.first_line, @1.first_column); }
  | EXPRESION MAYOR EXPRESION { $$ = new Relacionales($1, $3, TipoRelacional.MAYOR, @1.first_line, @1.first_column); }
  | EXPRESION MAYORIGUAL EXPRESION { $$ = new Relacionales($1, $3, TipoRelacional.MAYORIGUAL, @1.first_line, @1.first_column); }
;  

//GRAMÁTICA ACCESO DE VARIABLES
ACCEDERVAR
  : ID  { $$ = new Acceso($1, @1.first_line, @1.first_column); }
;

PRIMITIVO
  : ENTERO          { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.INT); }
  | DECIMAL         { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.DOUBLE); }
  | CADENA          { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.STRING);}
  | CARACTER        { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.CHAR); }
  | TRUE            { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.BOOLEAN); }
  | FALSE           { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.BOOLEAN); }
;

TIPO
  : INT { $$ = Type.INT; }
  | STRING { $$ = Type.STRING; }
  | CHAR { $$ = Type.CHAR; }
  | DOUBLE { $$ = Type.DOUBLE; }
  | BOOLEAN { $$ = Type.BOOLEAN; }
;
