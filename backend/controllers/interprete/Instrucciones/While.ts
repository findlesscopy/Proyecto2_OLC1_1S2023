import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";

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
        return {rama: "node", nodo: ""};
    }
}