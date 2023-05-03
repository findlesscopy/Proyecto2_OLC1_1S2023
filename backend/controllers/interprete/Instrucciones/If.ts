import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";

export class If extends Instruccion{
    public encontrado: boolean = false
    public valor_return : Return = {value: null, type: Type.VOID};

    constructor(private condicion:Expresion, public instrucciones:Statement, private insctruccionElse: Statement | null , line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        const condicion = this.condicion.execute(env);

        if(condicion.type != Type.BOOLEAN){
            console.log("Error Semantico: La condicion no es booleana", this.line, this.column);
            return
        }

        if(condicion.value){
            this.instrucciones.execute(env);
        }else{
            if(this.insctruccionElse != null){
                this.insctruccionElse.execute(env);
            }
        }

    }

    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
}