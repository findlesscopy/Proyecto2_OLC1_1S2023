import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";

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
        return {rama: "node", nodo: ""};
    }
}