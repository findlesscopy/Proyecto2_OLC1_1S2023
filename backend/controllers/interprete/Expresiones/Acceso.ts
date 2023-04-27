import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";

export class Acceso extends Expresion{
    constructor(private id:string, line:number, column:number){
        super(line, column);
    }
    
    public execute(env:Entorno): Return{
        const value = env.getVar(this.id);

        if(value){
            return {value: value.valor, type: value.tipo};
        }else{
            return {value: null, type: Type.NULL};
        }
    }
    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
}