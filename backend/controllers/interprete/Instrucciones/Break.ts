import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";

export class Break extends Instruccion{
    constructor(line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) { 
        return {value: null, type: Type.BREAK};
    }

    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
}