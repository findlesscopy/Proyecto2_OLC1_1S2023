import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Abstractas/Entorno";
import { Expresion } from '../Abstractas/Expresion';
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
import { ListaTabla, TablaSimbolos } from "../Reportes/TablaSimbolos";
export class Funcion extends Instruccion{

    public return_Encontrado: boolean = false;
    public valor_Return: Return = { value: null, type: Type.VOID };

    constructor(private tipo:Type, private id:string, public parametros:Array<Expresion>, public statement:Instruccion, line:number, column:number)
    {
        super(line, column);
    }

    public execute(env: Entorno) {
        // guardar la funcion en entorno
        env.guardarFuncion(this.id,this);
        ListaTabla.push(new TablaSimbolos(this.id, "Funcion/Método", env.nombreEntorno, this.line, this.column));
    }
    
    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoFuncion${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaFuncion = `${nodoPrincipal}[label="Funcion"];\n`;

        ramaFuncion += `${nodoIDPrincipal}[label="${this.id}"];\n`;

        ramaFuncion += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`;

        if (this.parametros != null) {
            for(let i = 0; i < this.parametros.length; i++){
                const codigoAST2: { rama: string; nodo: string } =  this.parametros[i].drawAst();
                ramaFuncion += codigoAST2.rama + "\n";
                ramaFuncion += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`;
            }

        }

        if (this.statement != null) {
            const codigoAST2: { rama: string; nodo: string } =
                this.statement.drawAst();

            ramaFuncion += codigoAST2.rama + "\n";

            ramaFuncion += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`;
        }

        return { rama: ramaFuncion, nodo: nodoPrincipal };
            
    }
}