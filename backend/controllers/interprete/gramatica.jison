/* Definición Léxica */
%lex

%options case-insensitive
%x string 
%x COMMENT

%%
(\/\/).*                             {}     // comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}     // comentario multilinea


"true"              return 'TRUE'; 
"false"             return 'FALSE';
//Palabras reservadas
"main"              return 'MAIN';
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
"return"            return 'RETURN_EXP'; 
//Funciones y Métodos
"void"              return 'VOID'; 
//Funciones
"print"             return 'PRINT'; 
"tolower"           return 'TOLOWER'; 
"toupper"           return 'TOUPPER'; 
"length"            return 'LENGTH';
"truncate"          return 'TRUNCATE';
"round"             return 'ROUND';
"typeof"            return 'TYPEOF';
"tostring"          return 'TOSTRING';
"tochararray"       return 'TOCHARARRAY';

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


//Incremento y decremento
"++"                return 'INCREMENTO_SIMBOLO'; 
"--"                return 'DECREMENTO_SIMBOLO'; 

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
"<="                return 'MENORIGUAL'; 
">="                return 'MAYORIGUAL'; 
"<"                 return 'MENOR'; 
">"                 return 'MAYOR'; 
"="                 return 'IGUAL'; 
//Operador ternario
"?"                 return 'TERNARIO'; 
":"                 return 'DOSPUNTOS'; 

//Operadores logicos
"&&"                return 'AND'; 
"||"                return 'OR'; 
"!"                 return 'NOT'; 



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
  const {Casteo} = require('./Expresiones/Casteos');
  const {Incremento} = require('./Expresiones/Incremento');
  const {Decremento} = require('./Expresiones/Decremento');
  const {IncrementoIns} = require('./Instrucciones/Incremento');
  const {DecrementoIns} = require('./Instrucciones/Decremento');
  const {Return_Exp} = require('./Expresiones/Return');
  const {For} = require('./Instrucciones/For');
  const {If} = require('./Instrucciones/If');
  const {Main} = require('./Instrucciones/Main');
  const {While} = require('./Instrucciones/While');
  const {ReDeclarar} = require('./Instrucciones/ReDeclarar');
  const {DoWhile} = require('./Instrucciones/DoWhile');
  const {Switch} = require('./Instrucciones/Switch');
  const {Case} = require('./Instrucciones/Case');
  const {Default} = require('./Instrucciones/Default');
  const {Break} = require('./Instrucciones/Break');
  const {Continue} = require('./Instrucciones/Continue');
  const {toLower} = require('./Expresiones/toLower');
  const {toUpper} = require('./Expresiones/toUpper');
  const {Length} = require('./Expresiones/Length');
  const {Truncate} = require('./Expresiones/Truncate');
  const {Round} = require('./Expresiones/Round');
  const {Typeof} = require('./Expresiones/Typeof');
  const {toString} = require('./Expresiones/toString');
  const {Vector} = require('./Expresiones/Vector');
  const {LlamadaVector} = require('./Expresiones/LlamadaVector');
  const {Listas} = require('./Expresiones/Listas');
  const {AddListas} = require('./Expresiones/AddLista');
  const {LlamadaLista} = require('./Expresiones/LlamadaLista');
 
%}


// PRECEDENCIA DE OPERADORES
%left 'OR'
%left 'AND' 
%right 'NOT'
%left 'MENOR' 'MENORIGUAL' 'MAYOR'  'MAYORIGUAL' 'IGUALACION' 'DIFERENCIACION' 
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO' 'MODULO'
%left 'POTENCIA'
%right 'INCREMENTO_SIMBOLO' 'DECREMENTO_SIMBOLO'
%right 'UMENOS '
%left 'PARENTESISIZQ'


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
  | DECLARAR     PUNTOYCOMA     { $$ = $1; }
  | FUNCION           { $$ = $1; }
  | LLAMADAFUNCION    { $$ = $1; }
  | INCREMENTO     PUNTOYCOMA   { $$ = $1; }
  | DECREMENTO     PUNTOYCOMA   { $$ = $1; }
  | CICLO_FOR         { $$ = $1; }
  | CONTROL_IF        { $$ = $1; }
  | MAIN_INST         { $$ = $1; }
  | CICLO_WHILE       { $$ = $1; }
  | METODOS           { $$ = $1; }
  | RETORNOS         { $$ = $1; }
  | CICLO_DOWHILE     { $$ = $1; }
  | CONTROL_SWITCH    { $$ = $1; }
  | VECTORES        { $$ = $1; }
  | LLAMADAVECTOR  { $$ = $1; }
  | LISTAS       { $$ = $1; }
  | ADDLISTAS   { $$ = $1; }
	| error PUNTOYCOMA
  {   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;

LLAMADALISTA
  : ID CORCHETEIZQ CORCHETEIZQ EXPRESION CORCHETEDER CORCHETEDER { $$ = new LlamadaLista($1, $4, @1.first_line, @1.first_column); }
;

ADDLISTAS
  : ID PUNTO ADD PARENTESISIZQ EXPRESION PARENTESISDER PUNTOYCOMA { $$ = new AddListas($1, $5, @1.first_line, @1.first_column); }
;

LISTAS  
  : LIST MENOR TIPO MAYOR ID IGUAL NEW LIST MENOR TIPO MAYOR PUNTOYCOMA { $$ = new Listas($3, $5, @1.first_line, @1.first_column); }
;
CONTROL_SWITCH
  : SWITCH PARENTESISIZQ EXPRESION PARENTESISDER LLAVEIZQ CASELIST DEFAULT_EXP LLAVEDER { $$ = new Switch($3, $6, $7, @1.first_line, @1.first_column); }
;

CASELIST
  : CASELIST CASE EXPRESION STATEMENT_SWITCH { $1.push(new Case($3, $4, false, @1.first_line, @1.first_column)); $$ = $1;  }
  | CASE EXPRESION STATEMENT_SWITCH { $$ = [new Case($2, $3, false, @1.first_line, @1.first_column)]; }
;

DEFAULT_EXP
  : DEFAULT STATEMENT_SWITCH  { $$ = new Default($2, false, @1.first_line, @1.first_column); }
;

CICLO_DOWHILE
  : DO STATEMENT WHILE PARENTESISIZQ EXPRESION PARENTESISDER PUNTOYCOMA { $$ = new DoWhile($5, $2, @1.first_line, @1.first_column); }
;

RETORNOS
  : RETURN_EXP EXPRESION PUNTOYCOMA { $$ = new Return_Exp($2, @1.first_line, @1.first_column); }
  | RETURN_EXP PUNTOYCOMA { $$ = new Return_Exp(null, @1.first_line, @1.first_column); }
  | BREAK PUNTOYCOMA { $$ = new Break(@1.first_line, @1.first_column); }
  | CONTINUE PUNTOYCOMA { $$ = new Continue(@1.first_line, @1.first_column); }
;

CICLO_WHILE
  : WHILE PARENTESISIZQ EXPRESION PARENTESISDER STATEMENT { $$ = new While($3,$5, @1.first_line, @1.first_column); }
;

MAIN_INST
  : MAIN LLAMADAFUNCION  { $$ = new Main($2, @1.first_line, @1.first_column); }
;

CICLO_FOR
  : FOR PARENTESISIZQ DECLARAR_FOR PUNTOYCOMA RELACIONALES PUNTOYCOMA INCREMENTO PARENTESISDER STATEMENT { $$ = new For($3,$5,$7,$9,@1.first_line, @1.first_column); }
  | FOR PARENTESISIZQ DECLARAR_FOR PUNTOYCOMA RELACIONALES PUNTOYCOMA DECREMENTO PARENTESISDER STATEMENT { $$ = new For($3,$5,$7,$9,@1.first_line, @1.first_column); }
; 

CONTROL_IF
  : IF PARENTESISIZQ EXPRESION PARENTESISDER STATEMENT CONTROL_ELSE { $$ = new If($3,$5, $6, @1.first_line, @1.first_column); }
;

CONTROL_ELSE 
  : ELSE STATEMENT { $$ = $2; }
  | ELSE CONTROL_IF { $$ = $2; }
  | { $$ = null; }
;

//GRAMATICA INCREMENTO
INCREMENTO 
  : ID INCREMENTO_SIMBOLO  { $$ = new IncrementoIns($1, @1.first_line, @1.first_column); }
;
//GRAMATICA DECREMENTO
DECREMENTO 
  : ID DECREMENTO_SIMBOLO  { $$ = new DecrementoIns($1, @1.first_line, @1.first_column); }
;
// GRAMATICA IMPRIMIR 
DEFPRINT
    : PRINT PARENTESISIZQ EXPRESION PARENTESISDER PUNTOYCOMA  { $$ = new Print(@1.first_line, @1.first_column,$3); }
;

//Gramatica declarar
DECLARAR
  : TIPO ID { $$ = new Declarar($2, $1, null, @1.first_line, @1.first_column );} 
  | TIPO ID IGUAL EXPRESION  { $$ = new Declarar($2, $1, $4, @1.first_line, @1.first_column );}
  | ID IGUAL EXPRESION { $$ = new ReDeclarar($1, $3, @1.first_line, @1.first_column );}
;

DECLARAR_FOR
  : TIPO ID IGUAL EXPRESION  { $$ = new Declarar($2, $1, $4, @1.first_line, @1.first_column );}
  | ID IGUAL EXPRESION { $$ = new Declarar(null, $1, $3, @1.first_line, @1.first_column );}
;

METODOS
  : VOID ID PARENTESISIZQ PARENTESISDER STATEMENT { $$ = new Funcion(Type.VOID, $2, [],$5,@1.first_line, @1.first_column)}
  | VOID ID PARENTESISIZQ PARAMETROS PARENTESISDER STATEMENT { $$ = new Funcion(Type.VOID, $2, $4, $6, @1.first_line, @1.first_column); }
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

STATEMENT_SWITCH
  : DOSPUNTOS INSTRUCCIONES { $$ = new Statement($2,@1.first_line, @1.first_column) }
;

PARAMETROS
  : PARAMETROS COMA PARAMETRO { $1.push($3); $$ = $1;}
  | PARAMETRO                 { $$ = [$1];}
;

PARAMETRO
  : TIPO ID { $$ = new Parametros($1, $2, @1.first_line, @1.first_column); }
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

EXPRESION
  : PRIMITIVO       { $$ = $1; }
  | ACCEDERVAR      { $$ = $1; }
  | ARITMETICA      { $$ = $1; }
  | RELACIONALES    { $$ = $1; }
  | LOGICOS         { $$ = $1; }
  | CASTEOS         { $$ = $1; }
  | LLAMADAFUNCION    { $$ = $1; }
  | FUNCIONES_NATIVAS { $$ = $1; }
  | LLAMADAVECTOR_EXPRESION  { $$ = $1; }
  | LLAMADALISTA  { $$ = $1; }
  | EXPRESION INCREMENTO_SIMBOLO { $$ = new Incremento($1, @1.first_line, @1.first_column); }
  | EXPRESION DECREMENTO_SIMBOLO { $$ = new Decremento($1, @1.first_line, @1.first_column); }
  | PARENTESISIZQ EXPRESION PARENTESISDER { $$ = $2; }
;

LLAMADAVECTOR
  : ID CORCHETEIZQ EXPRESION CORCHETEDER PUNTOYCOMA { $$ = new LlamadaVector($1, $3, @1.first_line, @1.first_column); }
;

LLAMADAVECTOR_EXPRESION
  : ID CORCHETEIZQ EXPRESION CORCHETEDER  { $$ = new LlamadaVector($1, $3, @1.first_line, @1.first_column); }
;

VECTORES 
  : TIPO CORCHETEIZQ CORCHETEDER ID IGUAL NEW TIPO CORCHETEIZQ EXPRESION CORCHETEDER PUNTOYCOMA { $$ = new Vector($1,$4,$9,null,@1.first_line, @1.first_column); }
  | TIPO CORCHETEIZQ CORCHETEDER ID IGUAL LLAVEIZQ VALORES LLAVEDER PUNTOYCOMA { $$ = new Vector($1,$4,$7.length,$7,@1.first_line, @1.first_column);}
;

VALORES
  : VALORES COMA EXPRESION { $1.push($3); $$ = $1;}
  | EXPRESION              { $$ = [$1];}
;

FUNCIONES_NATIVAS
  : TOLOWER PARENTESISIZQ EXPRESION PARENTESISDER { $$ = new toLower($3, @1.first_line, @1.first_column); }
  | TOUPPER PARENTESISIZQ EXPRESION PARENTESISDER { $$ = new toUpper($3, @1.first_line, @1.first_column); }
  | LENGTH PARENTESISIZQ EXPRESION PARENTESISDER { $$ = new Length($3, @1.first_line, @1.first_column); }
  | TRUNCATE PARENTESISIZQ EXPRESION PARENTESISDER { $$ = new Truncate($3, @1.first_line, @1.first_column); }
  | ROUND PARENTESISIZQ EXPRESION PARENTESISDER { $$ = new Round($3, @1.first_line, @1.first_column); }
  | TYPEOF PARENTESISIZQ EXPRESION PARENTESISDER { $$ = new Typeof($3, @1.first_line, @1.first_column); }
  | TOSTRING PARENTESISIZQ EXPRESION PARENTESISDER { $$ = new toString($3, @1.first_line, @1.first_column); }
;

//GRAMÁTICA CASTEOS
CASTEOS 
  : PARENTESISIZQ TIPO PARENTESISDER EXPRESION { $$ = new Casteo($2, $4, @1.first_line, @1.first_column); }
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
