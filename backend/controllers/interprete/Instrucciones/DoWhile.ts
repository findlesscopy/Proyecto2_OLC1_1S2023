import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";
import generateID from "../Utils/generadorID";
export class DoWhile extends Instruccion{
    public return_Encontrado: boolean = false;
    public valor_Return: Return = { value: null, type: Type.VOID };
    public breakEncontrado: boolean = false;

    constructor(private condicion:Expresion, public instrucciones:Statement, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        
        let contador = 0;
        do{
            if(contador > 100){
                console.log("Error: Ciclo infinito");
                break;
            }
            this.instrucciones.execute(env);
            contador++;
        }while(this.condicion.execute(env).value);
    
    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoDoWhile${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        const codigoAST:{rama:string, nodo:string} = this.condicion.drawAst();
        let ramaDoWhile = `${nodoPrincipal}[label="DoWhile"];\n`

        ramaDoWhile += codigoAST.rama + "\n"

        ramaDoWhile += `${nodoPrincipal} -> ${codigoAST.nodo};\n`

        const codigoAST2:{rama:string, nodo:string} = this.instrucciones.drawAst();

        ramaDoWhile += codigoAST2.rama + "\n"

        ramaDoWhile += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`

        return {rama:ramaDoWhile, nodo:nodoPrincipal};
    }
}