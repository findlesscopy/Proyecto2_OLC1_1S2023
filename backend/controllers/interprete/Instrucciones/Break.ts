import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";
import generateID from "../Utils/generadorID";

export class Break extends Instruccion{
    constructor(line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) { 
        return {value: null, type: Type.BREAK};
    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoBreak${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaBreak = `${nodoPrincipal}[label="Break"];\n`;

        return { rama: ramaBreak, nodo: nodoPrincipal };

    }
}