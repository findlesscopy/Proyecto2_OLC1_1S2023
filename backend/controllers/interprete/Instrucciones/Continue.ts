import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";

export class Continue extends Instruccion{
    constructor(line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        console.log("Continue");
    }

    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
    

}