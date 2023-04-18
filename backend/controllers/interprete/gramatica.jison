/* Definicion lexica */
%lex

%options case-insensitive
%x string

%%

//Simbolos del lenguaje
"=" { return IGUAL; }
";" { return PUNTOYCOMA; }
"{" { return LLAVEIZQ; }
"}" { return LLAVEDER; }
"(" { return PARENTESISIZQ; }
")" { return PARENTESISDER; }
"[" { return CORCHETEIZQ; }
"]" { return CORCHETEDER; }
"." { return PUNTO; }

//Operaciones aritmeticaas
"+" { return MAS; }
"-" { return MENOS; }
"*" { return POR; }
"/" { return DIVIDIDO; }
"^" { return POTENCIA; }
"%" { return MODULO; }

//Operadores Relacionales
"==" { return IGUAlACION; }
"!=" { return DIFERENCIACION;}
"<" { return MENOR; }
">" { return MAYOR; }
"<=" { return MENORIGUAL; }
">=" { return MAYORIGUAL; }

//Operador ternario
"?" { return TERNARIO; }
":" { return DOSPUNTOS; }

//Operadores logicos
"&&" { return AND; }
"||" { return OR; }
"!" { return NOT; }

//Incremento y decremento
"++" { return INCREMENTO; }
"--" { return DECREMENTO; }


//Palabras reservadas
//Tipos de datos
"int" { return INT; }
"string" { return STRING; }
"char" { return CHAR; }
"boolean" { return BOOLEAN; }
"double" { return DOUBLE; }
//Listas y arreglos
"list" { return LIST; }
"new" { return NEW; }
"add" { return ADD; }
//Sentencias de control
"if" { return IF; }
"else" { return ELSE; }
"else if" { return ELSEIF; }
"switch" { return SWITCH; }
"case" { return CASE; }
"default" { return DEFAULT; }
//Sentencias ciclicas
"while" { return WHILE; }
"for" { return FOR; }
"do" { return DO; }
//Sentencias de Transferencia
"break" { return BREAK; }
"continue" { return CONTINUE; }
"return" { return RETURN; }
//Funciones y Métodos
"void" { return VOID; }
//Funciones
"print" { return PRINT; }
"tolower" { return TOLOWER; }
"toupper" { return TOUPPER; }






