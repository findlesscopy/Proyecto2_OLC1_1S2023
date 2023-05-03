import { Entorno } from "../Abstractas/Entorno";
import { Instruccion } from "../Abstractas/Instruccion";
import { LlamadaFuncion } from "../Expresiones/LlamadaFuncion";

export class Main extends Instruccion{
    constructor(public value:LlamadaFuncion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        this.value?.execute(env);
    }

    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
}