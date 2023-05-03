import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";
import { printList } from "../Reportes/Printlist";

export class Return_Exp extends Instruccion{
    constructor(public valor:Expresion | null, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        console.log("Return_Exp");
        try{
            if(this.valor == null){
                return {value: null, type: Type.RETURN};
            }
            const value = this.valor.execute(env);
            
            printList.push(value.value);
            console.log(value.value);
            return {value: value, type: Type.RETURN};
            
        }catch(error){
            console.log(error);
        }
    }

    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
}
