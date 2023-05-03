import { Expresion } from "../Abstractas/Expresion";
import { Type, Return } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";

export class Listas extends Expresion{

    constructor(private tipo:Type, private id:string,  line:number, column:number){
        super(line,column);
    } 

    public execute(env: Entorno): Return {
        env.guardar(this.id, [], Type.LIST, this.line, this.column);
        return {value: null, type: Type.LIST};
    }

    public drawAst(): { rama: string; nodo: string } {
        return { rama: "node", nodo: "" };
    }
        

}