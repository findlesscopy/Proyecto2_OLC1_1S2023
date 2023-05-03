import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";
import generateID from "../Utils/generadorID";
export class While extends Instruccion{
    public return_Encontrado: boolean = false;
    public valor_Return: Return = { value: null, type: Type.VOID };
    public breakEncontrado: boolean = false;

    constructor(private condicion:Expresion, public instrucciones:Statement, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        const condicion = this.condicion.execute(env);

        if(condicion.type != Type.BOOLEAN){
            console.log("Error Semantico: La condicion no es booleana", this.line, this.column);
            return
        }
        let contador = 0;
        while(condicion.value){
            if(contador > 100){
                console.log("Error: Ciclo infinito");
                break;
            }
            this.instrucciones.execute(env);
            condicion.value = this.condicion.execute(env).value;
            contador++;
        }

    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoWhile${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        const codigoAST:{rama:string, nodo:string} = this.condicion.drawAst();
        let ramaWhile = `${nodoPrincipal}[label="While"];\n`

        ramaWhile += codigoAST.rama + "\n"

        ramaWhile += `${nodoPrincipal} -> ${codigoAST.nodo};\n`

        const codigoAST2:{rama:string, nodo:string} = this.instrucciones.drawAst();

        ramaWhile += codigoAST2.rama + "\n"

        ramaWhile += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`

        return {rama:ramaWhile, nodo:nodoPrincipal};
    }
}